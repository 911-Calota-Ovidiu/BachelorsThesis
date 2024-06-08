import axios from 'axios';
import { nodeStorage, setNodeStorage } from './node_api';
import { NodeObject, ConnectionObject, getNodeFromName, getConnectionFromName } from '@/components/placeable/NodeModels';


const BASE_URL="http://localhost:8081/machinations_api/"
export function saveLocal(name: String,nodeObjects: (NodeObject | ConnectionObject)[]){
    axios.post(BASE_URL + "save/" + name, nodeObjects);
}

export function saveCSV(name: String){
    axios.post(BASE_URL + "save_csv/" + name, nodeStorage);
}

export async function loadAll(){
    try {
        const response = await axios.get(BASE_URL + "load_all");
        return response.data;
      } catch (error) {
       alert('Error fetching data:'+ error);
      }
}

export function sendFile(file: any) {
    axios.post(BASE_URL + "send_file", file)
        .then(response => {
            const nodeList = [];
            const fileNodes = response.data;
            for(const node of fileNodes){
                if(node.type === "ResourceConnection" || node.type === "StateConnection" || node.type === "ResourceNode" || node.type === "StateNode"){   
                        
                        const startId = node.startId;
                        const endId = node.endId;
                        const startOfConnection = fileNodes.find((nod: NodeObject) => nod.nodeId === startId) as NodeObject;
                        const endOfConnection = fileNodes.find((nod: NodeObject) => nod.nodeId === endId) as NodeObject;
                        const connection = getConnectionFromName(node.nodeId,node.type, startOfConnection.x + 23, startOfConnection.y + 23, endOfConnection.x + 23, endOfConnection.y + 23, startId, endId);
                        nodeList.push(connection);

                } else{
                    nodeList.push(getNodeFromName(node.type, node.x, node.y, node.nodeId))
                }
            }
            setNodeStorage(nodeList)
        })
}