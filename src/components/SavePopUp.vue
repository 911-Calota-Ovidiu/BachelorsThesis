<template>
    <div class="save-page">
        <div class="save-box">
            <button class="close-button" @click="closePopup">X</button> <!-- Close button -->
            <input type="text" placeholder="Enter filename" v-model="filename">
            <div class="button-group">
                <button class="save-button" @click="save_csv()">Save as CSV</button>
                <button class="save-button" @click="save_local">Save to Local</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { saveCSV, saveLocal } from '@/api/api_store';
import { EventBus } from '@/api/eventbus';
import { defineComponent } from 'vue';
import { nodeStorage } from '@/api/node_api';
export default defineComponent({
    name: "SavePopUp",
    data(){
        return{
            filename: "",
        }
    },
    methods:{
        save_local(){
            if (!this.filename) {
                alert("Filename cannot be empty.");
                return;
            }
            let nodeObjects = [];
            for (let node of nodeStorage) {
                let object = {
                    nodeId: node.nodeId,
                    x: node.x,
                    y: node.y,
                    type: node.type,
                    label: node.label,
                    color: node.color,
                    size: node.size,
                    activationMode: node.activationMode,
                    startX: node.startX,
                    startY: node.startY,
                    endX: node.endX,
                    endY: node.endY
                }
                nodeObjects.push(object);
            }
            console.log(nodeObjects);
            saveLocal(this.filename);
        },
        save_csv(){
            if (!this.filename) {
                alert("Filename cannot be empty.");
                return;
            }
            let nodeObjects = [];
            for (let node of nodeStorage) {
                let object = {
                    nodeId: node.nodeId,
                    x: node.x,
                    y: node.y,
                    type: node.type,
                    label: node.label,
                    color: node.color,
                    size: node.size,
                    activationMode: node.activationMode,
                    startX: node.startX,
                    startY: node.startY,
                    endX: node.endX,
                    endY: node.endY
                }
                nodeObjects.push(object);
            }
            console.log(nodeObjects);
            saveCSV(this.filename);
        },
        closePopup(){
            console.log(this.filename)
            EventBus.$emit('saved_or_cancelled');
        }
    }
})
</script>
<style>
.save-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5); 
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.save-box {
    position: relative;
    padding: 30px; /* Increased padding to ensure space for the close button */
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 300px;
    height: auto;
}

input[type="text"] {
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.save-button {
    padding: 10px 20px;
    border: none;
    background-color: #007BFF;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
}

.save-button:hover {
    background-color: #0056b3;
}

.button-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
}

.close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    color: rgb(0, 0, 0);
    border: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
}
.close-button:hover {
    font-size: 100;
}
</style>
