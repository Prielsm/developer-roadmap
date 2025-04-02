import type { Edge, Node } from 'reactflow';

export interface JsonData {
  nodes: Node[];
  edges: Edge[];
}

export interface NodeData {
  label: string;
  description?: string;
  links?: { title: string; url: string }[];
}

export interface IApiRoadmap {
  id: number;
  title: string;
  description: string;
  jsonData: JsonData | null;
  users: any[];
  progress: null;
  type: string;
}
