import { useEffect, useRef, useState } from "react";
import { Node, useReactFlow } from "reactflow";

export type ActiveNodeProps = {
  activeNode: Node | null;
  setActiveNode: React.Dispatch<React.SetStateAction<Node | null>>;
};

export default function NodeEditor({
  activeNode,
  setActiveNode,
}: ActiveNodeProps) {
  return (
    <div className="border rounded-sm py-3 px-2">
      {activeNode && activeNode.type === "message" && (
        <MessageEditor
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
      )}
    </div>
  );
}

function MessageEditor({ activeNode, setActiveNode }: ActiveNodeProps) {
  const [message, setMessage] = useState<string>(activeNode?.data.message ?? "");
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);
  const reactFlow = useReactFlow();

  // Update the message in the activeNode when it changes
  const handleActiveNodeChange = (message: string) => {
    if (!activeNode) {
      return;
    }

    // Get the latest node instance
    const latestNodeInstance = reactFlow.getNode(activeNode.id);
    if (!latestNodeInstance) {
      return;
    }

    // Create the updated node object
    const updatedNodeObj = {
      ...latestNodeInstance,
      data: {
        ...latestNodeInstance.data,
        message, // Update the message
      },
    };

    // Update the activeNode with the new message
    setActiveNode(updatedNodeObj);
  };

  // Update the message state whenever the activeNode message changes
  useEffect(() => {
    setMessage(activeNode?.data.message ?? "");
  }, [activeNode?.data.message]);

  // Focus the textarea when the activeNode changes
  useEffect(() => {
    if (inputMessageRef.current) {
      inputMessageRef.current.focus();
    }
  }, [activeNode]);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-lg transform transition-all hover:scale-105">
      <form className="flex flex-col gap-8">
        <div>
          <label
            htmlFor="message-input"
            className="block text-xl md:text-2xl font-semibold text-center text-red-600  tracking-wide mb-4"
          >
            Actions
          </label>
          <textarea
            ref={inputMessageRef}
            className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none resize-none transition-all"
            id="message-input"
            placeholder="Enter your message here..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              handleActiveNodeChange(event.target.value);
            }}
            rows={5}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
