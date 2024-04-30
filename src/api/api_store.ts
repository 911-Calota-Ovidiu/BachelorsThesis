import axios from 'axios';

const BASE_URL="http://localhost:8081/machinations_api/"

export function saveSvg(name: String, nodes: String){
    axios.post(BASE_URL+"save_svg/" + name, nodes);
}