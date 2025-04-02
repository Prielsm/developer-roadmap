import { useIsMounted } from '../../hooks/use-is-mounted';
import type { IApiRoadmap } from '../ContrasteRoadmap/roadmaps.interface';
import { MarkFavorite } from '../FeaturedItems/MarkFavorite';
import type { GroupType } from './RoadmapsPage';

type RoadmapCardProps = {
  roadmap: IApiRoadmap;
};

export function RoadmapCard(props: RoadmapCardProps) {
  const { roadmap } = props;

  const isMounted = useIsMounted();

  const link = '/roadmap/' + roadmap.title.replace(/\s+/g, '-').toLowerCase();

  return (
    <a
      key={roadmap.id}
      className="relative rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
      href={link}
    >
      {roadmap.title}

      {/* {isMounted && (
        <MarkFavorite
          resourceId={roadmap.id}
          resourceType="roadmap"
          className="data-[is-favorite=true]:opacity-35"
        />
      )} */}
    </a>
  );
}
