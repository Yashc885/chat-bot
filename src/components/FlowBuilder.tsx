import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  useReactFlow,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "../nodes";
import { initialEdges } from "../edges";
import { getNewNodeId, validateFlow, isDuplicateEdgeStart } from "../util";

import SidePanel from "./SidePanel";
import { toast } from "sonner";

export default function FlowBuilder() {
  const reactFlow = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  // Validate and handle connections between nodes
  const onConnect: OnConnect = (connection) => {
    // Avoid duplicate edges starting from the same node
    if (isDuplicateEdgeStart(edges, connection)) {
      console.log("Duplicate edge start");
      return;
    }
    const edge: Edge = {
      id: `${connection.source}-${connection.target}`,
      ...connection,
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type || !["message", "dropDown", "carousel"].includes(type)) {
      return;
    }

    const position = reactFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: Node = {
      id: getNewNodeId(nodes),
      type,
      position,
      data: type === "message" 
        ? { message: "" } 
        : type === "dropDown" 
        ? { options: [] }
        : { images: [], description: "" }, // Add default data for carousel
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setActiveNode(newNode);
  };

  const saveFlow = () => {
    const isFlowValid = validateFlow(nodes, edges);
    if (!isFlowValid) {
      toast.error("Cannot save flow");
      return;
    }
    console.log("flow_state", {
      nodes,
      edges,
    });
    toast.success("Flow saved");
  };

  return (
    <section>
      <nav className="bg-gray-200 relative flex justify-end px-10">
        <button
          onClick={saveFlow}
          className="bg-white font-[500] px-3 py-1 my-2 text-red-500 border rounded-md hover:bg-red-500 hover:text-white"
        >
          Save Changes
        </button>
      </nav>
      <main className="flow-container flex w-full">
        <div className="flow-1 h-[100vh] w-[75%]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            {/* Plugins */}
            <Background />
            {/* <MiniMap /> */}
            <Controls />
          </ReactFlow>
        </div>
        <SidePanel activeNode={activeNode} setActiveNode={setActiveNode} />
      </main>
    </section>
  );
}
