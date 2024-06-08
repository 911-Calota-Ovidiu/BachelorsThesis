<template>
  <div class="node-editor">
      <div class="editor-bar">
          <p class="center-text" v-if="!editing" style="user-select: none;">Please select a node or connection to edit.</p>
          <div class="variable-editor" v-if="editing">
            <p style="text-align: center; margin-left: 10px;">{{selection?.type}}</p>
              <div class="editor-item">
                  <p style="text-align: left; margin-left: 10px;" v-if="selection?.type === 'Text' ">Text
                      <input type="text" v-model="nodeLabel" style="margin:10px; width: 200px;">
                  </p>
                  <p style="text-align: left; margin-left: 10px;" v-if="selection?.type !== 'Text' ">Label
                      <input type="text" v-model="nodeLabel" style="margin:10px; width: 200px;">
                  </p>
              </div>
              <div class="editor-item">
                  <p style="text-align: left; margin-left: 10px;">Color & Size
                      <input type="color" v-model="nodeColor" style="margin-left: 30px;">
                      <input type="number" style="width: 30px; margin-left: 30px; top:20px" v-model="nodeSize">
                  </p>
              </div>
              <div class="editor-item">
                <p style="text-align: center; margin-left: 10px;">Trigger
                </p>
                <input type="button" value="Passive" :disabled="activationMode === 1" style="margin:3px; margin-bottom: 10px;" @click="setActivation(1)">
                <input type="button" value="Interactive" :disabled="activationMode === 2" style="margin:3px" @click="setActivation(2)">
                <input type="button" value="Automatic" :disabled="activationMode === 3" style="margin:3px" @click="setActivation(3)">
                <input type="button" value="Enabling" :disabled="activationMode === 4" style="margin:3px" @click="setActivation(4)">
              </div>
              <div>
                <input type="button" value="Save" style="margin:20px;" @click="saveNodeData">
                <input type="button" value="Delete" style="margin:20px;" @click="deleteNode">
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ConnectionObject, NodeObject } from './placeable/NodeModels';
import { EventBus } from '@/api/eventbus';
import { nodeStorage } from '@/api/node_api';

export default defineComponent({
  name: 'NodeEditor',
  components: {
  },
  data() {
      return {
          editing: false,
          nodeLabel: "label",
          nodeColor: "#123456",
          activationMode: 1,
          nodeSize: 2,
          selection: null as ConnectionObject | NodeObject | null,
      }
  },
  mounted() {
    EventBus.$on("node_editor_selection", (node: ConnectionObject | NodeObject )=>{
      this.selection = node;
      this.editing = true;
      this.nodeLabel = node.label;
      this.nodeColor = node.color;
      this.activationMode = node.activationMode;
      this.nodeSize = node.size;
    });
    EventBus.$on("node_editor_selection_end",()=>{
      this.editing = false;
    });
  },
  methods: {
      setActivation(value: number){
        this.activationMode = value;
      },
      saveNodeData(){
        this.selection!.label=this.nodeLabel;
        this.selection!.color=this.nodeColor;
        this.selection!.activationMode=this.activationMode;
        this.selection!.size=this.nodeSize;
        EventBus.$emit("loaded_or_cancelled");
      },
      deleteNode(){
        if(this.selection){
          nodeStorage.splice(nodeStorage.indexOf(this.selection as NodeObject | ConnectionObject),1);
          EventBus.$emit("deleted");
        }
      }
  }
})
</script>

<style>
.node-editor {
position: fixed;
left: 80%;
width: 20%;
height: 100vh;
z-index: 999;
background-color: #f8f9fa;
border: 1px solid black;
}
.editor-item {
border: 1px solid black;
user-select: none;
margin: 10px;
border-radius: 10px;
margin-top: 40px;
}
.editor-bar {
display: flex;
justify-content: center;
align-items: top;
height: 100%;
}
.center-text {
text-align: center;
}
.component-list {
position: absolute;
top: 0; 
left: 0; 
width: 100%; 
height: 100%; 
z-index: -1;
}
.load-save-button {
position: inherit;
}
td {
height: 54px;
position: relative;
z-index: 1;
border: 0px solid black;
}
table {
width: 100%; 
border-collapse: collapse; 
}
</style>
