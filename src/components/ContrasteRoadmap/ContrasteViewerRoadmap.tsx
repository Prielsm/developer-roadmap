import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { HeartHandshake, X } from 'lucide-react';
import { ResourceListSeparator } from '../TopicDetail/ResourceListSeparator';
import { TopicDetailLink } from '../TopicDetail/TopicDetailLink';
import myRoadmap from './myRoadmap.json';

interface RoadmapData {
  nodes: Node[];
  edges: Edge[];
}

interface NodeData {
  label: string;
  description?: string;
  links?: { title: string; url: string }[];
}

export default function ContrasteViewerRoadmap({ name }: { name: string }) {
  const { id } = useParams<{ id: string }>();
  console.log('name', name);

  // const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(myRoadmap);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const title = name.replace(/\s+/g, '_').toLowerCase();
  console.log('title', title);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/roadmap/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setRoadmap(data))
  //     .catch((err) => console.error('Error fetching roadmap:', err));
  // }, [id]);

  if (!roadmap) return <p>Chargement...</p>;

  return (
    <div className="relative h-screen p-4">
      <h1>{title}</h1>
      <button
        onClick={
          () => {
            console.log('test');
          }

          // navigate(`/roadmap-editor/${id}`, { state: { roadmap } })
        }
        className="mb-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
      >
        Modifier cette roadmap
      </button>

      <ReactFlow
        nodes={roadmap.nodes}
        edges={roadmap.edges}
        onNodeClick={(_, node) => setSelectedNode(node as Node<NodeData>)}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      {selectedNode && (
        <div className={'relative z-[92]'}>
          <div className="fixed right-0 top-0 z-40 flex h-screen w-full flex-col overflow-y-auto bg-white p-4 focus:outline-0 sm:max-w-[600px] sm:p-6">
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
            <div className="prose prose-quoteless prose-h1:mb-2.5 prose-h1:mt-7 prose-h1:text-balance prose-h2:mb-3 prose-h2:mt-0 prose-h3:mb-[5px] prose-h3:mt-[10px] prose-p:mb-2 prose-p:mt-0 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-li:m-0 prose-li:mb-0.5">
              {selectedNode.data.label && <h1>{selectedNode.data.label}</h1>}
              {/* <div
                      id="topic-content"
                      dangerouslySetInnerHTML={{ __html: topicHtml }}
                    /> */}
              {selectedNode.data.description && (
                <p>{selectedNode.data.description}</p>
              )}
            </div>

            {selectedNode.data.links && selectedNode.data.links.length > 0 && (
              <>
                <ResourceListSeparator
                  text="Free Resources"
                  className="text-green-600"
                  icon={HeartHandshake}
                />
                <ul className="ml-3 mt-4 space-y-1">
                  {selectedNode.data.links.map((link) => {
                    return (
                      <li key={link.title}>
                        <TopicDetailLink
                          url={link.url}
                          type={'official'}
                          title={link.title}
                          // onClick={() => {
                          //   // if it is one of our roadmaps, we want to track the click
                          //   if (canSubmitContribution) {
                          //     const parsedUrl = parseUrl(link.url);

                          //     window.fireEvent({
                          //       category: "TopicResourceClick",
                          //       action: `Click: ${parsedUrl.hostname}`,
                          //       label: `${resourceType} / ${resourceId} / ${topicId} / ${link.url}`,
                          //     });
                          //   }
                          // }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
