import type { Node, NodeTypes } from "reactflow";
import MessageNode, { messageNodeType } from "./MessageNode";
import DropDownNode, { DropDownNodeType } from "./DropdownNode";
export const initialNodes: Node[] = [
  {
    id: "1",
    type: "message",
    position: { x: 0, y: 300 },
    data: { message: "What's your name?" },
  },
  {
    id: "2",
    type: "message",
    position: { x: 300, y: 300 },
    data: { message: "Tell me your query" },
  },
  {
    id: "3",
    type: "message",
    position: { x: 300, y: 400 },
    data: { message: "Random ✨" },
  },
  {
    id: "4",
    type: "dropDown",
    position: { x: 600, y: 350 },
    data: { options: ["How was your day?", "Had your lunch?", "Good afternoon, how can I help you?"] },
  },
];
export const nodeTypes: NodeTypes = {
  message: MessageNode,
  dropDown: DropDownNode,
};
