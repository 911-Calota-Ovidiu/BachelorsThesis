<template>
  <div class="editor" @click="renderShape" style="position: fixed; width: 100vw; height: 100vh; top: 0; left: 0; z-index: 1;">
    <svg ref="editorContainer" xmlns="http://www.w3.org/2000/svg" style="position: static;" width="2000px" height="1000px" viewBox="0 0 1000 1000" @click="selectionEnd">
      <g ref="zoomContainer">
        <Transition v-for="(node, index) in nodeStorage" :key="index">
          <g v-html="node.renderNode()"
            style="user-select: none;"
            @click.stop="clickOnNode(node)"
            @contextmenu="clickOnNode(node)"
            @mouseover="updateHoverStatus(node,true)"
            @mouseout="updateHoverStatus(node,false)"
          ></g>
        </Transition>
      </g>
    </svg>  
    <button class="zoom-button" @click="resetZoom">Center</button>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import * as d3 from 'd3';
import { ConnectionObject, NodeObject, getNodeFromName } from './placeable/NodeModels';
import { getConnectionFromName } from './placeable/NodeModels';
import { EventBus } from '../api/eventbus';
import { nodeStorage } from '@/api/node_api';

export default defineComponent({
  name: 'DiagramEditor',
  components: {},
  setup() {
    const editorContainer = ref<SVGSVGElement | null>(null);
    const zoomContainer = ref<SVGGElement | null>(null);
    return {
      editorContainer,
      zoomContainer,
    };
  },
  data() {
    return {
      nodeStorage: new Array(),
      placingConnection: false,
      startNode: null as NodeObject | null,
      endNode: null as NodeObject | null,
      selectedConnection: '',
      zoom: null as d3.ZoomBehavior<SVGSVGElement, unknown> | null,
      currentZoomTransform: d3.zoomIdentity,
    };
  },
  mounted() {
    EventBus.$on('loaded_or_cancelled', () => {
      this.nodeStorage = nodeStorage;
    });
    EventBus.$on('connection_placing', (connection: ConnectionObject) => {
      nodeStorage.push(connection);
      this.nodeStorage = nodeStorage;
      this.nodeStorage.sort((a, b) => {
          const connectionTypes = ['ResourceConnection', 'StateConnection'];
          const aIsConnection = connectionTypes.includes(a.constructor.name);
          const bIsConnection = connectionTypes.includes(b.constructor.name);
          if (aIsConnection && !bIsConnection) return -1;
          if (!aIsConnection && bIsConnection) return 1;
          return 0;
        });
    });
    EventBus.$on('selected_node',() => {
      let node = window.localStorage.getItem("SELECTED_NODE");
      if(node === "ResourceNode" ||node === "StateNode"){
        this.placingConnection = true;
        this.selectedConnection = node;
      } else {
        this.placingConnection = false;
      }
      this.disableZoom();
    });
    this.setupZoom();
  },
  methods: {
    setupZoom() {
      const svg = d3.select<SVGSVGElement, unknown>(this.editorContainer!);
      const zoomContainer = d3.select<SVGGElement, unknown>(this.zoomContainer!);

      this.zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 4])
        .on('zoom', () => {
          const event = d3.event as d3.D3ZoomEvent<SVGSVGElement, unknown>;
          if (event.transform) {
            this.currentZoomTransform = event.transform;
            zoomContainer.attr('transform', event.transform.toString());
          }
        });

      svg.call(this.zoom);
    },
    disableZoom() {
      const svg = d3.select(this.editorContainer!);
      svg.on(".zoom", null);
    },
    enableZoom() {
      this.setupZoom()
    },
    renderShape(event: MouseEvent) {
      const nodeName = window.localStorage.getItem('SELECTED_NODE');
      if (nodeName) {
        const id = nodeStorage.length;
        let node;

        const svgRect = this.editorContainer!.getBoundingClientRect();

        const cursorX = event.clientX - svgRect.left;
        const cursorY = event.clientY - svgRect.top;

        const [x, y] = this.currentZoomTransform.invert([cursorX, cursorY]);

        if (nodeName === 'ResourceNode' || nodeName === 'StateNode') {
          this.placingConnection = true;
          this.selectedConnection = nodeName;
        } else {
          this.placingConnection = false;
          node = getNodeFromName(nodeName, x - 522 / this.currentZoomTransform.k, y - 22 , id + 202);
        }
        if (node) {
          nodeStorage.push(node);
        }
        this.nodeStorage = nodeStorage;
        window.localStorage.removeItem('SELECTED_NODE');
        this.enableZoom()
      }
    },
    openEditorMenu(node: NodeObject | ConnectionObject) {
      EventBus.$emit('node_editor_selection', node);
      nodeStorage.forEach((node) => {
        node.editorShowing = false;
      });
      node.editorShowing = true;
    },
    selectionEnd() {
      this.nodeStorage.forEach((node) => {
        node.editorShowing = false;
        node.hoveringOver = false;
      });
      EventBus.$emit('node_editor_selection_end');

      // Re-enable zoom when node selection is cleared
      this.enableZoom();
    },
    updateHoverStatus(node: NodeObject, status: boolean) {
      node.hoveringOver = status;
    },
    clickOnNode(node: NodeObject | ConnectionObject) {
      if (!this.placingConnection) {
        this.openEditorMenu(node);
      } else {
        if (!this.startNode) {
          if (node.type !== 'ResourceConnection' && node.type !== 'StateConnection') {
            this.setStart(node as NodeObject);
          }
        } else {
          if (node.type !== 'ResourceConnection' && node.type !== 'StateConnection') {
            if (this.startNode === node) {
              return;
            }
            this.setEnd(node as NodeObject);
            this.placeConnection(this.selectedConnection);
            this.setStart(null);
            this.setEnd(null);
            this.placingConnection = false;
          }
        }
      }
    },
    setStart(node: NodeObject | null) {
      this.startNode = node;
    },
    setEnd(node: NodeObject | null) {
      this.endNode = node;
    },
    placeConnection(connectionName: string) {
      if (this.placingConnection) {
        if (this.startNode && this.endNode) {
          const id = nodeStorage.length;
          const node = getConnectionFromName(
            id + 202,
            connectionName,
            this.startNode.x + 23,
            this.startNode.y + 23,
            this.endNode.x + 23,
            this.endNode.y + 23,
            this.startNode.nodeId,
            this.endNode.nodeId
          );
          EventBus.$emit('connection_placing', node);
        }
      }
    },
    zoomIn() {
      const svg = d3.select(this.editorContainer!);
      svg.transition().duration(750).call(this.zoom!.scaleBy, 1.2);
    },
    zoomOut() {
      const svg = d3.select(this.editorContainer!);
      svg.transition().duration(750).call(this.zoom!.scaleBy, 0.8);
    },
    resetZoom() {
      const svg = d3.select(this.editorContainer!);
      svg.transition().duration(0).call(this.zoom!.transform, d3.zoomIdentity);
      this.currentZoomTransform = d3.zoomIdentity;
    },
  },
});
</script>



<style>
.container {
  min-height: 100%;
}

.zoom-button {
  position: fixed;
  top: 7%;
  right: 20.5%;
  margin: 5px;
  z-index: 2;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.zoom-button:hover {
  background-color: #f0f0f0;
}
</style>
