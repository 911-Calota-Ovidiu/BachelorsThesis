<template>
    <div class="editor" @click="renderShape" style="position: fixed; width: 100vw; height: 100vh; top: 0; left: 0; z-index: -1;" @mousedown="setLastStart" @mouseup="setLastEnd">
      <svg ref="editorContainer" xmlns="http://www.w3.org/2000/svg" style="position: static;" width="2000px" height="1000px" viewBox="0 0 1000 1000">
        <Transition v-for="(node, index) in nodeStorage" v-bind:key="index">
          <g v-html="node.renderNode()"
           style="user-select: none;"
            @click="openEditorMenu(node.label)"
            @contextmenu="openEditorMenu(node.label)"
            @mouseover="updateHoverStatus(node,true)"
            @mouseout="updateHoverStatus(node,false)"
            ></g>
        </Transition>
      </svg>  
    </div>
</template>
<script lang="ts">

import {defineComponent } from 'vue';
import { NodeObject, getNodeFromName } from "./placeable/NodeModels";
import { getConnectionFromName } from './placeable/NodeModels';
import { EventBus } from '../api/eventbus';
import { nodeStorage } from '@/api/node_api';
export default defineComponent({
  name: 'DiagramEditor',
  components: {
    
  },
  mounted(){
    EventBus.$on("loaded_or_cancelled",()=>{
      this.nodeStorage = nodeStorage;
    })
  },
  data(){
    return{
      nodeStorage: new Array,
      placingConnection: false,
      lastStart : {
        x: 0,
        y: 0
      },
      lastEnd : {
        x: 0,
        y: 0
      }
    }
  },
  methods:{
    renderShape(event: any) {
      const nodeName = window.localStorage.getItem("SELECTED_NODE");
      if(nodeName){
        let id = nodeStorage.length;
        let node = getNodeFromName(nodeName,event.clientX,event.clientY, id + 202) ? getNodeFromName(nodeName,event.clientX - 522,event.clientY -22, id + 202) : getConnectionFromName(id + 202, nodeName,this.lastStart.x,this.lastStart.y,this.lastEnd.x,this.lastEnd.y);
        if (nodeName === "ResourceNode" || nodeName === "ResourceNode") {
          this.placingConnection = true;
        }
        nodeStorage.push(node);
        EventBus.$emit('update_local_diagram',nodeStorage)

        console.log(node)
        this.nodeStorage = nodeStorage;
        window.localStorage.removeItem("SELECTED_NODE");
      }
    },
    openEditorMenu(nodeLabel: string) {
      console.log("clicked on", nodeLabel)
    },
    setLastStart(event: any) {
      this.lastStart.x = event.clientX - 510;
      this.lastStart.y = event.clientY;
      console.log(this.lastStart)
    },
    setLastEnd(event: any) {
      this.lastEnd.x = event.clientX - 510;
      this.lastEnd.y = event.clientY;
      console.log(this.lastEnd)
    },
    updateHoverStatus(node: NodeObject, status: boolean) {
      node.hoveringOver = status;
    }
  },
})
</script>
<style>
  .container{
    min-height: 100%;
  }
</style>