<template>
    <div class="load-page" @click="closePopup">
        <div class="load-box" @click.stop>
            <button class="close-button" @click="closePopup">X</button>
            <div class="diagram_data" style="display: flex; width: 100%; height: 100%;">
                <div class="item-list" style="width: 50%; overflow-y: scroll;">
                    <ul>
                        <li v-for="(diagram, index) in diagrams" :key="diagram.id" @click="selectItem(diagram)">
                            {{index}} {{ diagram.name }}
                        </li>
                    </ul>
                </div>
                <div class="item-details" style="width: 50%;">
                    <p v-if="selectedDiagram">Nodes: {{ selectedDiagram?.node_list.length }}</p>
                    <p v-for="typeCount in nodeTypeCounts" :key="typeCount.type">
                        {{ typeCount.type }}: {{ typeCount.count }}
                    </p>
                </div>
            </div>
            <div class="button-group">
                <input type="file" class="load-button" @change="selectFile" style="background-color: rgba(0, 0, 0, 0);">
                <button class="load-button" @click="loadFile()">Load from XLSX</button>
                <button class="load-button" @click="loadSelected()">Load Selected Diagram</button>
                <button class="load-button" @click="createNewDiagram()">New Diagram</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EventBus } from '@/api/eventbus';
import { loadAll, sendFile } from '@/api/api_store';
import Diagram from './models/Diagram';
import { setNodeStorage } from '@/api/node_api';
import { ConnectionObject, NodeObject, getConnectionFromName, getNodeFromName } from './placeable/NodeModels';

export default defineComponent({
    name: "LoadPopUp",
    data(){
        return{
            file: null as File | null,
            fileData: new FormData,
            diagrams: [] as Diagram[],
            selectedDiagram: null as unknown as Diagram,
        }
    },
    mounted() {
        loadAll().then(response => {
            this.diagrams = response;
        });

    },
    computed:{
        nodeTypeCounts() {
            if (!this.selectedDiagram || !this.selectedDiagram.node_list) {
                return [];
            }

            const countMap: Record<string, number> = {};
            for (const node of this.selectedDiagram.node_list) {
                if (node.type in countMap) {
                    countMap[node.type]++;
                } else {
                    countMap[node.type] = 1;
                }
            }

            return Object.keys(countMap).map(type => ({
                type,
                count: countMap[type]
            }));
        }
    },
    methods:{
        loadSelected() {
            let nodeList = [];
            if(!this.selectedDiagram){
                alert("Please select a diagram first!");
                return;
            }
            for(let node of this.selectedDiagram?.node_list){
                if(node.type === "ResourceConnection" || node.type === "StateConnection" || node.type === "ResourceNode" || node.type === "StateNode"){   
                        console.log(node)
                        const startId = node.startId;
                        const endId = node.endId;
                        const startOfConnection = this.selectedDiagram?.node_list.find((nod: NodeObject | ConnectionObject) => nod.nodeId === startId) as NodeObject;
                        const endOfConnection = this.selectedDiagram?.node_list.find((nod: NodeObject | ConnectionObject) => nod.nodeId === endId) as NodeObject;
                        console.log("this must have x",startId)
                        const connection = getConnectionFromName(node.nodeId,node.type, startOfConnection.x + 23, startOfConnection.y + 23, endOfConnection.x + 23, endOfConnection.y + 23, startId, endId);
                        nodeList.push(connection);

                } else {
                    nodeList.push(getNodeFromName(node.type, node.x, node.y, node.nodeId))
                }
            }
            setNodeStorage(nodeList)
            EventBus.$emit('loaded_or_cancelled');
        },
        closePopup(){
            EventBus.$emit('loaded_or_cancelled');
        },
        selectItem(item: any) {
            this.selectedDiagram = item;
        },
        selectFile(event: any){
            this.file = event.target.files[0];
        },
        loadFile(){
            if (!this.file) {
                alert("Please select a file first!");
                return;
            }
            this.fileData = new FormData();
            this.fileData.append("file", this.file as File);
            sendFile(this.fileData);
        },
        createNewDiagram() {
            const newDiagram: Diagram = {
                id: 2077,
                name: `Name is irrelevant`,
                node_list: []
            };
            this.diagrams.push(newDiagram);
            this.selectedDiagram = newDiagram;
            this.loadSelected();
        }
    }
})
</script>

<style>
.load-page {
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

.load-box {
    position: relative;
    padding: 30px; 
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 500px;
    height: 500px;
    justify-content: flex-end;
}

input[type="text"] {
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.load-button {
    padding: 10px 20px;
    border: none;
    background-color: #007BFF;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
}

.load-button:hover {
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
    background-color: rgba(0, 0, 0, 0);

}
.diagram_data {
    display: flex;
    height: 200px;
    width: 100%;
    border: 1px solid #ccc;
    margin: 20px;
    overflow: hidden;
}

.item-list ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.item-list li {
    padding: 8px;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.3s;
}

.item-list li:hover {
    background-color: #f0f0f0;
}

.item-details {
    padding-left: 20px;
}
.load-file{
    justify-content: center;
    display: flex;
}
</style>NodeObject, 
