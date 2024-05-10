import axios from 'axios';
import { nodeStorage } from './node_api';
import Diagram from '@/components/models/Diagram';


const BASE_URL="http://localhost:8081/machinations_api/"
export function saveLocal(name: String){
    axios.post(BASE_URL + "save/" + name, nodeStorage);
}

export function saveCSV(name: String){
    axios.post(BASE_URL + "save_csv/" + name, nodeStorage);
}

export async function loadAll(){
    try {
        const response = await axios.get(BASE_URL + "load_all");
        console.log(response.data)
        return response.data;
      } catch (error) {
       alert('Error fetching data:'+ error);
      }
}