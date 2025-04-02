import React from 'react';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite';
import { ScheduleButton } from '../Schedule/ScheduleButton';
import { DownloadRoadmapButton } from '../DownloadRoadmapButton';
import { ShareRoadmapButton } from '../ShareRoadmapButton';
import { ArrowLeftIcon, Pencil } from 'lucide-react';
import type { IApiRoadmap } from './roadmaps.interface';

function ContrasteHeaderRoadmap({ roadmap }: { roadmap: IApiRoadmap }) {
  console.log('roadmap', roadmap);
  const slug = roadmap.title.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="container mt-0 flex flex-col gap-2.5 px-0 sm:mt-3 sm:px-4">
      <div className="relative rounded-none border bg-white px-5 pb-0 pt-4 sm:rounded-lg">
        <div className="flex items-start justify-between">
          <a
            className="inline-flex items-center justify-center rounded-md bg-gray-300 px-2 py-1.5 text-xs font-medium hover:bg-gray-400 sm:hidden sm:text-sm"
            aria-label="Back to roadmaps"
            href={'/contraste'}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </a>

          <a
            href="/contraste"
            className="hidden rounded-md text-sm font-medium text-gray-500 transition-all hover:text-black focus:outline-0 sm:block"
            aria-label="Back to All Roadmaps"
          >
            &larr;&nbsp;<span>&nbsp;Toutes les Roadmaps</span>
          </a>
          <div className="relative right-0 top-0 flex items-center gap-1 sm:-right-2 sm:-top-0.5">
            <MarkFavorite
              resourceId={String(roadmap.id)}
              resourceType="roadmap"
              className="relative top-px mr-2 text-gray-500 !opacity-100 hover:text-gray-600 focus:outline-0 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:stroke-gray-400 [&>svg]:stroke-[0.4] hover:[&>svg]:stroke-gray-600 sm:[&>svg]:h-4 sm:[&>svg]:w-4"
            />
            <ScheduleButton
              resourceId={String(roadmap.id)}
              resourceType="roadmap"
              resourceTitle={roadmap.title}
            />
            <DownloadRoadmapButton roadmapId={String(roadmap.id)} />
            <ShareRoadmapButton
              description={roadmap.description}
              pageUrl={`https://roadmap.sh/${roadmap.id}`}
            />
          </div>
        </div>
        <div className="mb-1 mt-5 sm:mb-5 sm:mt-12">
          <h1 className="mb-0.5 text-2xl font-bold sm:mb-3.5 sm:text-5xl">
            {roadmap.title}
          </h1>
          <p className="text-balance text-sm text-gray-500 sm:text-lg">
            {roadmap.description}
          </p>
          <div className="mt-4 flex justify-end">
            <a
              className="group inline-flex items-center gap-1.5 border-b-2 border-b-transparent px-0 text-sm font-medium text-gray-500 transition-colors hover:text-black"
              href={`roadmap-editor/${slug}`}
            >
              <Pencil className="h-4 w-4" />
              Modifier la roadmap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContrasteHeaderRoadmap;
