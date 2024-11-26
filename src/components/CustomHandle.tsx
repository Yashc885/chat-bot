import { Handle, HandleProps } from "reactflow";

export default function CustomHandle(props: HandleProps) {
  return (
    <Handle
      style={{
        width: 7,
        height: 7,
        background: "gray",
        position: "absolute",
        right: "-2px",
      }}
      {...props}
    />
  );
}
