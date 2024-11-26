import { useState } from "react";
import { NodeProps, Position } from "reactflow";
import CustomHandle from "../components/CustomHandle";

type DropDownNodeProps = {
  options?: string[];
  onChange?: (newOptions: string[]) => void; // Optional callback to update options from parent
};

export type DropDownNodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { options: string[] };
};

export default function DropDownNode({ data, onChange }: NodeProps<DropDownNodeProps>) {
  const [options, setOptions] = useState(data.options || []);

  const handleAddOption = () => {
    const newOption = prompt("Enter new option:");
    if (newOption) {
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      if (onChange) {
        onChange(updatedOptions); // Pass updated options to parent if needed
      }
    }
  };

  return (
    <div className="msg-node border-2 shadow-lg bg-white rounded-lg max-w-[350px] min-w-[240px] break-words">
      <div className="block-title bg-[#ea8080] px-5 py-2 rounded-t-lg">
        <p className="font-semibold text-white text-center text-lg">DropDown</p>
      </div>
      <div className="block-message px-5 py-3 min-h-[50px] space-y-2">
        {(options.length > 0 ? options : ["No options available"]).map((option, index) => (
          <div key={index} className="bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-md shadow-sm">
            {option}
          </div>
        ))}
      </div>
      <button
  className="add-option-btn mt-2 px-3 py-2 bg-[#ea8080] text-white rounded-md mb-4 mx-auto block"
  onClick={handleAddOption}
>
  Add Option
</button>


      <CustomHandle type="target" position={Position.Left} className="custom-handle" />
      <CustomHandle type="source" position={Position.Right} className="custom-handle" />
    </div>
  );
}
