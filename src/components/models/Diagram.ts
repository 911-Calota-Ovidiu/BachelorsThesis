import { ConnectionObject, NodeObject } from "../placeable/NodeModels";

export default interface Diagram{
    id: number,
    node_list: (NodeObject | ConnectionObject)[],
    name:string,
}