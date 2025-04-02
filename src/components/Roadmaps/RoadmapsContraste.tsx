import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/classname.ts';
import { Filter, X } from 'lucide-react';
import { CategoryFilterButton } from './CategoryFilterButton.tsx';
import { useOutsideClick } from '../../hooks/use-outside-click.ts';
import {
  deleteUrlParam,
  getUrlParams,
  setUrlParams,
} from '../../lib/browser.ts';
import { RoadmapCard } from './RoadmapCard.tsx';
import { httpGet } from '../../lib/http.ts';
import type { UserProgressResponse } from '../HeroSection/FavoriteRoadmaps.tsx';
import { isLoggedIn } from '../../lib/jwt.ts';
import roadmaps from '../ContrasteRoadmap/roadmaps.json';
import type { IApiRoadmap } from '../ContrasteRoadmap/roadmaps.interface.ts';

const groupNames = [...new Set(roadmaps.map((item) => item.type))];
function groupRoadmaps(roadmaps: IApiRoadmap[]) {
  return Object.values(
    roadmaps.reduce(
      (
        acc: Record<string, { group: string; roadmaps: IApiRoadmap[] }>,
        roadmap,
      ) => {
        if (!acc[roadmap.type]) {
          acc[roadmap.type] = {
            group: roadmap.type,
            roadmaps: [],
          };
        }
        acc[roadmap.type].roadmaps.push(roadmap);
        return acc;
      },
      {},
    ),
  );
}

const groupedRoadmaps = groupRoadmaps(roadmaps);

export function RoadmapsContraste() {
  const [activeGroup, setActiveGroup] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredRoadmaps, setFilteredRoadmaps] = useState(groupedRoadmaps);

  useEffect(() => {
    const params = getUrlParams();
    if (params.g && groupNames.includes(params.g)) {
      setActiveGroup(params.g);
    }
  }, []);

  useEffect(() => {
    if (activeGroup === '') {
      setFilteredRoadmaps(groupedRoadmaps);
    } else {
      setFilteredRoadmaps(
        groupedRoadmaps.filter((group) => group.group === activeGroup),
      );
    }
  }, [activeGroup]);

  return (
    <div className="border-t bg-gray-100">
      <div className="container relative flex flex-col gap-4 sm:flex-row">
        <div
          className={cn(
            'hidden w-full flex-col from-gray-100 sm:w-[180px] sm:border-r sm:bg-gradient-to-l sm:pt-6',
            {
              'hidden sm:flex': !isFilterOpen,
              'z-50 flex': isFilterOpen,
            },
          )}
        >
          <div className="absolute top-0 -mx-4 w-full bg-white pb-0 shadow-xl sm:sticky sm:top-10 sm:mx-0 sm:bg-transparent sm:pb-20 sm:shadow-none">
            <div className="grid grid-cols-1">
              <CategoryFilterButton
                onClick={() => {
                  setActiveGroup('');
                  setIsFilterOpen(false);
                  deleteUrlParam('g');
                }}
                category={'All Roadmaps'}
                selected={activeGroup === ''}
              />

              {groupedRoadmaps.map((group) => (
                <CategoryFilterButton
                  key={group.group}
                  onClick={() => {
                    setActiveGroup(group.group);
                    setIsFilterOpen(false);
                    document?.getElementById('filter-button')?.scrollIntoView();
                    setUrlParams({ g: group.group });
                  }}
                  category={group.group}
                  selected={activeGroup === group.group}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-6 pb-20 pt-2 sm:pt-8">
          {filteredRoadmaps.map((group) => (
            <div key={`${group.group}-${group.roadmaps.length}`}>
              <h2 className="mb-2 text-xs uppercase tracking-wide text-gray-400">
                {group.group}
              </h2>

              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3">
                {group.roadmaps.map((roadmap) => (
                  <RoadmapCard roadmap={roadmap} key={roadmap.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
