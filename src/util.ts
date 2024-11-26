import { Edge, Node } from "reactflow";
function getNewNodeId(nodes: Node[]): string {
  const lastId = Math.max(...nodes.map((node) => parseInt(node.id, 10) || 0));
  return (lastId + 1).toString();
}
function isDuplicateEdgeStart(edges: Edge[], connection: Edge): boolean {
  return edges.some((edge) => edge.source === connection.source);
}
function isValidUniqueSelection(selection: { nodes: Node[]; edges: Edge[] }): boolean {
  return selection.nodes.length === 1 && selection.edges.length === 0;
}
function validateFlow(nodes: Node[], edges: Edge[]): boolean {
  if (nodes.length < 2) {
    return true;
  }

  const nodeTargetCounts = new Map<string, number>();
  nodes.forEach((node) => {
    nodeTargetCounts.set(node.id, 0);
  });
  edges.forEach((edge) => {
    if (edge.target) {
      const currentCount = nodeTargetCounts.get(edge.target) || 0;
      nodeTargetCounts.set(edge.target, currentCount + 1);
    }
  });
  let emptyTargetHandlesCount = 0;
  nodeTargetCounts.forEach((count) => {
    if (count === 0) {
      emptyTargetHandlesCount++;
    }
  });
  return emptyTargetHandlesCount <= 1;
}
export {
  getNewNodeId,
  isDuplicateEdgeStart,
  isValidUniqueSelection,
  validateFlow,
};
