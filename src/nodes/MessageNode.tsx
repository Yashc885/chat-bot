import { NodeProps, Position } from "reactflow";
import CustomHandle from "../components/CustomHandle";

type MessageNodeProps = {
  message?: string;
};

export type messageNodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { message?: string };
};

export default function MessageNode({ data }: NodeProps<MessageNodeProps>) {
  return (
<div className="msg-node border-2 shadow-lg bg-white rounded-lg max-w-[350px] min-w-[240px] break-words">
  <div className="block-title bg-[#ea8080] px-5 py-2 rounded-t-lg">
    <p className="font-semibold text-white text-center text-lg">Send Message</p>
  </div>
  <div className="block-message px-5 py-3 min-h-[50px] text-gray-700 text-sm leading-relaxed">
    {data.message || "No message provided"}
  </div>
  <CustomHandle type="target" position={Position.Left} className="custom-handle" />
  <CustomHandle type="source" position={Position.Right} className="custom-handle" />
</div>

  );
}
