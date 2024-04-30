<template>
    <div class="header-bar">
        <table>
            <tr>
                <td>
                    <ComponentList class="component-list"/>
                </td>
                <td style = "text-align: right; user-select: none;">
                    <input type="button" value="Save" @click="save_svg">
                    <button>Load</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import ComponentList from './Component_list.vue';
import { defineComponent} from 'vue';
import { saveSvg } from '@/api/api_store';
import { EventBus } from '@/api/eventbus';
export default defineComponent({
    name: 'HeaderBar',
    components: {
        ComponentList,
    },
    data() {
        return{
            nodeStorage: new Array,
        }
    },
    mounted() {
        EventBus.$on("update_local_diagram", (data: any) =>{
            console.log("data is",data)
            this.nodeStorage=data;
        });
    },
    methods: {
        save_svg(){
            console.log("called")
            let nodeObjects = "";
            for(let node of this.nodeStorage)
            {
                console.log("node",node)
                nodeObjects.concat(node.renderNode());
            }
            console.log("nodeObjects are",nodeObjects);
            saveSvg("test", JSON.stringify(nodeObjects));
        }
    }

})
</script>
<style>
.header-bar {
  position: relative;
  width: 100%;
  height: 60px;
}

.component-list {
  position: absolute;
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  z-index: -1;
}

td {
  height: 54px;
  border: 0px solid black;
  position: relative;
  z-index: 1;
}

table {
width: 100%; 
border-collapse: collapse; 
border: 1px solid black; 
}

</style>