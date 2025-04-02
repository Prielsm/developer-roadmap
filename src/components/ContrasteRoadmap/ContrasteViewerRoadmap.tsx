import { useState } from 'react';
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
import roadmapsData from './roadmaps.json';
import type { IApiRoadmap, NodeData } from './roadmaps.interface';
import ContrasteHeaderRoadmap from './ContrasteHeaderRoadmap';
import ResourceProgressStats from '../ResourceProgressStats.astro';

export default function ContrasteViewerRoadmap({ name }: { name: string }) {
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);

  const roadmap = roadmapsData.find(
    (roadmap) => roadmap.title.replace(/\s+/g, '-').toLowerCase() === name,
  );

  if (!roadmap) return <p>Chargement...</p>;

  const styles = {
    width: '100%',
    height: 600,
    maxWidth: 830,
    margin: '0 auto',
  };

  return (
    <div className="relative h-full p-4">
      <ContrasteHeaderRoadmap roadmap={roadmap as IApiRoadmap} />
      {roadmap.jsonData && (
        <ReactFlow
          nodes={roadmap.jsonData.nodes}
          edges={roadmap.jsonData.edges}
          onNodeClick={(_, node) => setSelectedNode(node as Node<NodeData>)}
          style={styles}
          ref={(element) => {
            if (element)
              element.style.setProperty('height', '600px', 'important');
          }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      )}

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
                        />
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
          <div className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"></div>
        </div>
      )}
    </div>
  );
}
