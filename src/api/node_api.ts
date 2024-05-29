import { ConnectionObject, NodeObject } from "@/components/placeable/NodeModels";
import { EventBus } from "./eventbus";

export let nodeStorage :  (NodeObject | ConnectionObject)[] = [];

export function setNodeStorage(newNodes: (NodeObject | ConnectionObject)[]) {
    nodeStorage = [];
    nodeStorage = newNodes;
    EventBus.$emit('loaded_or_cancelled');
}
