import React from "react";
import { nodeTypes } from "../nodes";

// Main container for the draggable node cards
export default function NodesHousing() {
  return (
    <div className="flex gap-3 flex-wrap">
      {Object.keys(nodeTypes).map((nodeType) => {
        return <NodeCard key={nodeType} nodeType={nodeType} />;
      })}
    </div>
  );
}

// NodeCard component to handle each draggable node
function NodeCard({ nodeType }: { nodeType: string }) {
  // Fired when dragging starts
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    // Update the data to be transferred so we can recognize the type of node being dragged
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
        src={`/${nodeType.toLowerCase()}.png`} // Assuming images are stored with the name matching node type
        alt={nodeType}
        draggable={false} // Prevent dragging the image
      />
      <p className="text-sm text-red-500">
        {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} {/* Capitalize first letter */}
      </p>
    </div>
  );
}
