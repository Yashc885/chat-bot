import { useEffect } from "react";
import NodesHousing from "./NodesHousing";
import NodeEditor, { ActiveNodeProps } from "./NodeEditor";
import {
  Viewport,
  useOnSelectionChange,
  useOnViewportChange,
  useReactFlow,
} from "reactflow";
import { isValidUniqueSelection } from "../util";

export default function SidePanel({
  activeNode,
  setActiveNode,
}: ActiveNodeProps) {
  const reactFlow = useReactFlow();

  // This will get triggered on selection change of item (node, edge) on the viewport
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      if (!isValidUniqueSelection({ nodes, edges })) {
        return;
      } else {
        setActiveNode(nodes[0]);
      }
    },
  });

  /*
    This will get triggered on change of viewport selection,
    we can use this to identify if the user has clicked on the viewport to deselect the node
  */
  useOnViewportChange({
    onStart: (viewport: Viewport) => {
      console.log("viewport", viewport);
      setActiveNode(null);
    },
  });

  // Update the node in the react flow
  useEffect(() => {
    if (!activeNode) return;

    reactFlow.setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === activeNode.id) {
          return activeNode;
        }
        return node;
      });
    });
  }, [activeNode, reactFlow]);

  return (
    <aside className="h-screen w-1/4 border-l border-gray-300 bg-gray-50 flex flex-col">
      <header className="relative flex items-center justify-center py-4 bg-white shadow-md">
        {activeNode && (
          <button
            onClick={() => setActiveNode(null)} // Deselect the node
            className="absolute left-4 flex items-center gap-2 text-gray-500 hover:text-red-600 transition"
          >
            <img src="back.png" alt="Back" className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
        <h1 className="text-lg font-semibold text-red-500">
          {activeNode ? "Edit Node" : "Nodes"}
        </h1>
      </header>

      <div className="flex-1 px-6 py-4 overflow-auto">
        {activeNode ? (
          <NodeEditor activeNode={activeNode} setActiveNode={setActiveNode} />
        ) : (
          <NodesHousing />
        )}
      </div>
    </aside>
  );
}
