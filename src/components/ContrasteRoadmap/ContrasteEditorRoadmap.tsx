import { Pencil, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Edge,
  type Node,
  type Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import roadmapsData from './roadmaps.json';

type Link = {
  title: string;
  url: string;
};

type NodeData = {
  label: string;
  description: string;
  links: Link[];
};

const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    position: { x: 250, y: 5 },
    data: { label: 'Start', description: '', links: [] },
    type: 'default',
  },
];

const initialEdges: Edge[] = [];

export default function ContrasteRoadmapEditor({ name }: { name?: string }) {
  const roadmap = roadmapsData.find(
    (roadmap) => roadmap.title.replace(/\s+/g, '-').toLowerCase() === name,
  );

  const [roadmapTitle, setRoadmapTitle] = useState(
    roadmap?.title ?? 'Ma roadmap',
  );
  const [roadmapDescription, setRoadmapDescription] = useState(
    roadmap?.description ?? 'Ma description',
  );
  const [isEditing, setIsEditing] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>(
    roadmap?.jsonData?.nodes ?? initialNodes,
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    roadmap?.jsonData?.edges ?? initialEdges,
  );
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [nodeData, setNodeData] = useState<NodeData>({
    label: '',
    description: '',
    links: [],
  });

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const addNode = () => {
    const newNode: Node<NodeData> = {
      id: (nodes.length + 1).toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Thème ${nodes.length + 1}`, description: '', links: [] },
      type: 'default',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveRoadmap = async () => {
    const roadmapData = {
      title: roadmapTitle,
      description: roadmapDescription,
      jsonData: {
        nodes: nodes,
        edges: edges,
      },
      users: [],
      progress: null,
      type: 'frontend',
    };

    console.log('data', roadmapData);
  };

  const onNodeClick = (_event: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node);
    setNodeData({
      label: node.data.label,
      description: node.data.description,
      links: node.data.links || [],
    });
  };

  const updateNodeData = () => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, ...nodeData } }
            : node,
        ),
      );
      setSelectedNode(null);
      setNodeData({ label: '', description: '', links: [] });
    }
  };

  const addLink = () => {
    setNodeData({
      ...nodeData,
      links: [...nodeData.links, { title: '', url: '' }],
    });
  };

  const updateLink = (index: number, field: keyof Link, value: string) => {
    const updatedLinks = nodeData.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    setNodeData({ ...nodeData, links: updatedLinks });
  };

  const removeLink = (index: number) => {
    const updatedLinks = nodeData.links.filter((_, i) => i !== index);
    setNodeData({ ...nodeData, links: updatedLinks });
  };
  return (
    <div>
      <div className="flex gap-2 p-4">
        <div className="flex w-1/4 items-center justify-between rounded border bg-gray-100 p-2">
          <div>
            <h2 className="text-lg font-bold">{roadmapTitle}</h2>
            <p className="text-sm text-gray-600">{roadmapDescription}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Pencil size={18} />
          </button>
        </div>
        {isEditing && (
          <div className="popup fixed left-0 right-0 top-0 z-[99] flex h-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
            <div className="relative h-full w-full max-w-md p-4 md:h-auto">
              <div className="popup-body relative h-full rounded-lg bg-white shadow">
                <form className="p-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Roadmap Meta
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Ajoute un titre et une description à ta roadmap.
                  </p>
                  <div className="mt-4">
                    <label
                      htmlFor="title"
                      className="block text-xs uppercase text-gray-400"
                    >
                      Titre
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border border-gray-300 px-2.5 py-2 outline-none focus:border-black sm:text-sm"
                        placeholder="Entrez le titre de la roadmap"
                        value={roadmapTitle}
                        onChange={(e) => setRoadmapTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="description"
                      className="block text-xs uppercase text-gray-400"
                    >
                      Description
                    </label>
                    <div className="relative mt-1">
                      <textarea
                        id="description"
                        name="description"
                        className="block h-24 w-full resize-none rounded-md border border-gray-300 px-2.5 py-2 outline-none focus:border-black sm:text-sm"
                        placeholder="Entrez la description"
                        value={roadmapDescription}
                        onChange={(e) => setRoadmapDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black outline-none hover:border-gray-300 hover:bg-gray-50 focus:border-gray-300 focus:bg-gray-100"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      Fermer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={saveRoadmap}
          className="ml-auto flex h-9 w-[164px] items-center justify-center rounded-[5px] bg-slate-900 px-4 text-white transition-colors hover:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-save mr-2 h-4 w-4"
          >
            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
            <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
          </svg>
          Sauvegarder
        </button>
      </div>
      <div className="h-500 flex gap-2 p-4" style={{ height: '500px' }}>
        <div className="z-50 flex w-40 flex-col gap-4 overflow-y-auto border-l bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-xs font-normal uppercase text-gray-400">
            Composants
          </h2>
          <button
            onClick={addNode}
            className="dndnode flex h-11 cursor-grab items-center justify-start rounded-[5px] border border-gray-300 px-4 py-3"
            draggable="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle mr-2 h-4 w-4"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Thème
          </button>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {selectedNode && (
        <aside className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col gap-4 overflow-y-auto border-l bg-white p-4 shadow-lg">
          <div className="text-sm font-medium text-gray-500">
            Contenu &amp; Liens
          </div>
          <button
            type="button"
            id="close-topic"
            className="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={() => {
              setSelectedNode(null);
            }}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col">
            <div className="flex flex-col">
              <label
                className="text-xs uppercase text-gray-400"
                htmlFor="title"
              >
                Titre
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Entrez le titre"
                value={nodeData.label}
                onChange={(e) =>
                  setNodeData({ ...nodeData, label: e.target.value })
                }
                className="mt-2 flex h-8 items-center rounded border px-2 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="mt-4 flex flex-col">
              <label className="flex items-center text-xs uppercase text-gray-400">
                Description
                <span className="group relative normal-case">
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-10 block w-max -translate-x-1/2 -translate-y-0.5 transform rounded-md bg-gray-900 px-2 py-1 text-sm font-medium text-white opacity-0 shadow-sm duration-100 group-hover:opacity-100">
                    You can write markdown here
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-info ml-1 inline-block"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </span>
              </label>
              <div className="relative">
                <textarea
                  value={nodeData.description}
                  onChange={(e) =>
                    setNodeData({ ...nodeData, description: e.target.value })
                  }
                  className="tiptap ProseMirror content-editor prose prose-quoteless mt-2 min-h-[300px] w-full rounded border p-2 focus:outline-none focus:ring-1 focus:ring-black prose-h1:mb-2.5 prose-h1:mt-7 prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-2 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-li:m-0 prose-li:mb-0.5"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2 border-t pt-4">
            {nodeData.links.map((link, index) => (
              <div className="flex flex-col gap-1 overflow-hidden rounded-md border">
                <div className="flex flex-col gap-2 p-3">
                  <select className="flex h-8 rounded-md border bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="opensource">Opensource</option>
                    <option value="course">Course</option>
                    <option value="website">Website</option>
                    <option value="podcast">Podcast</option>
                  </select>
                  <div className="relative flex grow flex-col gap-1.5">
                    <input
                      type="text"
                      placeholder="Titre de la ressource"
                      value={link.title}
                      onChange={(e) =>
                        updateLink(index, 'title', e.target.value)
                      }
                      className="flex h-8 w-full rounded-md border bg-transparent px-3 py-1 pl-7 text-sm transition-colors placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <label className="absolute left-[8px] top-[9px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-circle-check h-[14px] w-[14px]"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </label>
                  </div>
                  <div className="relative flex grow flex-col gap-1.5">
                    <input
                      type="text"
                      placeholder="URL de la ressource"
                      value={link.url}
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      className="flex h-8 w-full rounded-md border bg-transparent px-3 py-1 pl-7 text-sm transition-colors placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <label className="absolute left-[8px] top-[9px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-link"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <button
                  className="flex h-7 w-full shrink-0 items-center justify-center border-t border-red-200 bg-red-100 text-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                  onClick={() => removeLink(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-trash"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                  <span className="ml-2 text-sm">Remove</span>
                </button>
              </div>
            ))}

            <button
              className="mt-2.5 flex h-8 w-full items-center justify-center rounded border text-sm font-medium hover:bg-gray-100"
              onClick={addLink}
            >
              Ajouter un lien
            </button>
          </div>

          <button
            onClick={updateNodeData}
            className="flex h-8 w-full items-center justify-center rounded-md bg-gray-200 p-1 px-4 text-sm font-medium hover:bg-gray-200/80"
          >
            Sauvegarder
          </button>
        </aside>
      )}
    </div>
  );
}
