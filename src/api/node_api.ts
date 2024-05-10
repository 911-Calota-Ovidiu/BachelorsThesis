import { ConnectionObject, NodeObject } from "@/components/placeable/NodeModels";

export let nodeStorage :  (NodeObject | ConnectionObject)[] = [];

export function setNodeStorage(newNodes: (NodeObject | ConnectionObject)[]) {
    nodeStorage = newNodes;
    console.log("nodestorage is", nodeStorage)

}
