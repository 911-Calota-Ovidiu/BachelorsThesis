<template>
    <div class="header-bar">
        <table>
            <tr>
                <td>
                    <ComponentList class="component-list"/>
                </td>
                <td style = "align-items: center; position: absolute; justify-content: center; display: flex; width: 100px;">
                    <input type="button" value="Save" @click="save()" style="margin-right: 20px;">
                    <input type="button" value="Load" @click="load()">
                </td>
            </tr>
        </table>
        <LoadPopUp v-if="loading"/>
        <SavePopUp v-if="saving"/>
    </div>
</template>
<script lang="ts">
import ComponentList from './Component_list.vue';
import { defineComponent} from 'vue';
import { EventBus } from '@/api/eventbus';
import { nodeStorage } from '@/api/node_api';
import SavePopUp from './SavePopUp.vue';
import LoadPopUp from './LoadPopUp.vue';
export default defineComponent({
    name: 'HeaderBar',
    components: {
        ComponentList,
        SavePopUp,
        LoadPopUp
    },
    data(){
        return{
            saving: false,
            loading: true,
        }
    },
    mounted() {
        EventBus.$on("update_local_diagram", () =>{
            console.log("data is",nodeStorage)
        });

        EventBus.$on("loaded_or_cancelled", () =>{
            console.log("data is",nodeStorage)
            this.loading=false;
        });
        EventBus.$on("saved_or_cancelled", () =>{
            console.log("data is",nodeStorage)
            this.saving=false;
        });
    },
    methods: {
        save(){
            this.saving = true;
        },
        load(){
            this.loading = true;
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