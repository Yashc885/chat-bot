import React from "react";
import { nodeTypes } from "../nodes";

export default function NodesHousing() {
  return (
    <div className="flex gap-3 flex-wrap">
      {Object.keys(nodeTypes).map((nodeType) => {
        return <NodeCard key={nodeType} nodeType={nodeType} />;
      })}
    </div>
  );
}

function NodeCard({ nodeType }: { nodeType: string }) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    console.log(`Dragging node type: ${nodeType}`); // Debugging
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, nodeType)}
      className="node-item flex bg-white items-center flex-col gap-2 border border-red-500 rounded-md w-36 px-6 py-1 cursor-pointer hover:bg-gray-100"
    >
      <img
        className="w-6"
        src={`/${nodeType.toLowerCase()}.png`}
        alt={nodeType}
        draggable={false}
      />
      <p className="text-sm text-red-500">
        {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
      </p>
    </div>
  );
}
