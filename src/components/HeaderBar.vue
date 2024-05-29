<template>
    <div class="header-bar">
        <ComponentList class="component-list"/>
        <div style ="align-items: center; position: absolute; justify-content: center; display: flex; width: 200px; right: 20px;">
            
            <input class="load-save-button" type="button" value="Save" @click="save()" style="margin-right: 150px;">
            <input class="load-save-button" type="button" value="Load" @click="load()">
        </div>
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
  height: 55px;
  z-index: 1000; /* Ensure this is higher than the z-index of the SVG elements */
  background-color: #f8f9fa; /* Set your desired background color here */
  border: 1px solid black; 

}

.component-list {
  position: absolute;
  top: 0; 
  left: 0; 
  width: 100vw; 
  height: 100%; 
  z-index: -1;
  align-items: center;
  justify-content: center;
}
.load-save-button{
    position: inherit;
    top: 17px;
}

</style>