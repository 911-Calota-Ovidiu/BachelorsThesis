<template>
  <div id="component-list" class="component-list" style="text-align: left;
">
    <svg height="50px" width="400px">
      <Transition v-for="(node, index) in nodes" v-bind:key="index">
        <g v-html="node.renderNode()" @click='selectNode(node.label)' style="user-select: none;"></g>
      </Transition>
    </svg>
  </div>
  </template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { NodeObject, Source, Drain, Pool, Gate, Trader, Converter, EndCondition, TextComponent, Register, ResourceNode, StateNode } from "./placeable/NodeModels";
const handleKeyDown = (event: any) => {
      const key = event.key;
      switch (key){
        case "1": window.localStorage.setItem("SELECTED_NODE","Source"); break;
        case "2": window.localStorage.setItem("SELECTED_NODE","Drain"); break;
        case "3": window.localStorage.setItem("SELECTED_NODE","Pool"); break;
        case "4": window.localStorage.setItem("SELECTED_NODE","Gate"); break;
        case "5": window.localStorage.setItem("SELECTED_NODE","Trader"); break;
        case "6": window.localStorage.setItem("SELECTED_NODE","Converter"); break;
        case "7": window.localStorage.setItem("SELECTED_NODE","End Condition"); break;
        case "8": window.localStorage.setItem("SELECTED_NODE","Text"); break;
        case "9": window.localStorage.setItem("SELECTED_NODE","Register"); break;
        default: break;
      }
    };
export default defineComponent({
  name: 'ComponentList',
  setup() {
    const svgContainer = ref<SVGSVGElement | null>(null);
    const nodes = ref<NodeObject[]>([]);

    onMounted(() => {
      nodes.value.push(new Source(10, 20, "Source", "black", 1, 2));
      nodes.value.push(new Drain(45, 20, "Drain", "black", 1, 1));
      nodes.value.push(new Pool(80, 20, "Pool", "black", 1, 1));
      nodes.value.push(new Gate(115, 20, "Gate", "black", 1, 1));
      nodes.value.push(new Trader(150, 20, "Trader", "black", 1, 1));
      nodes.value.push(new Converter(185, 20, "Converter", "black", 1, 1));
      nodes.value.push(new EndCondition(220, 20, "End Condition", "black", 1, 1));
      nodes.value.push(new TextComponent(255, 20, "Text", "black", 1, 1));
      nodes.value.push(new Register(290, 20, "Register", "black", 1, 1));
      nodes.value.push(new ResourceNode(325, 20, "ResourceNode", "black", 1, 1));
      nodes.value.push(new StateNode(360, 20, "StateNode", "black", 1, 1));
    });
    window.addEventListener('keydown', handleKeyDown);
    return {
      svgContainer,
      nodes,
    };
  },
  destroyed() {
    window.removeEventListener('keydown',handleKeyDown);
  },
  methods:{
    selectNode(label: string){
      window.localStorage.setItem("SELECTED_NODE",label);
    }
  }
});
</script>

<style>
table {
width: 50%; 
border-collapse: collapse; 
}

td {
height: 10px; 
border: 2px solid black; 
}
</style>