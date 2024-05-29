<template>
  <div id="component-list" class="component-list" style="text-align: left;
">
    <svg height="50px" width="500px">
      <Transition v-for="(node, index) in nodes" v-bind:key="index">
        <g v-html="node.renderNode()" @click='selectNode(node.label)' style="user-select: none;"></g>
      </Transition>
    </svg>
  </div>
  </template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { NodeObject, Source, Drain, Pool, Gate, Trader, Converter, EndCondition, TextComponent, Register, ResourceNode, StateNode, Delay } from "./placeable/NodeModels";
import { EventBus } from '@/api/eventbus';
export default defineComponent({
  name: 'ComponentList',
  setup() {
    const svgContainer = ref<SVGSVGElement | null>(null);
    const nodes = ref<NodeObject[]>([]);

    onMounted(() => {
      nodes.value.push(new Source(1, 10, 20, "Source", "black", 1, 2, -1, -1));
      nodes.value.push(new Drain(2, 45, 20, "Drain", "black", 1, 1, -1, -1));
      nodes.value.push(new Pool(3, 80, 20, "Pool", "black", 1, 1, -1, -1));
      nodes.value.push(new Gate(4, 115, 20, "Gate", "black", 1, 1, -1, -1));
      nodes.value.push(new Trader(5, 150, 20, "Trader", "black", 1, 1, -1, -1));
      nodes.value.push(new Converter(6, 185, 20, "Converter", "black", 1, 1, -1, -1));
      nodes.value.push(new EndCondition(7, 220, 20, "EndCondition", "black", 1, 1, -1, -1));
      nodes.value.push(new Delay(8, 255, 20, "Delay", "black", 1, 1, -1, -1));
      nodes.value.push(new TextComponent(9, 290, 20, "Text", "black", 1, 1, -1, -1));
      nodes.value.push(new Register(10, 325, 20, "Register", "black", 1, 1, -1, -1));
      nodes.value.push(new ResourceNode(11, 360, 20, "ResourceNode", "black", 1, 1, -1, -1));
      nodes.value.push(new StateNode(12,395, 20, "StateNode", "black", 1, 1, -1, -1));
    });
    return {
      svgContainer,
      nodes,
    };
  },

  methods:{
    selectNode(label: string){
      window.localStorage.setItem("SELECTED_NODE",label);
      EventBus.$emit("selected_node");
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