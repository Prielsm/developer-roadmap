import { isLoggedIn } from '../../lib/jwt.ts';
import { showLoginPopup } from '../../lib/popup.ts';

export function RoadmapsPageHeader({ header }: { header: string }) {
  return (
    <div className="bg-white py-3 sm:py-12">
      <div className="container">
        <div className="flex flex-col items-start bg-white sm:items-center">
          <h1 className="text-2xl font-bold sm:text-5xl">{header}</h1>
          <p className="mb-3 mt-1 text-center text-sm sm:my-3 sm:text-lg">
            Parcourez les roadmaps de Contraste et développez vos compétences
            grâce à celles-ci.
          </p>
          <p className="mb-3 flex w-full flex-col gap-1.5 sm:mb-0 sm:w-auto sm:flex-row sm:gap-3">
            <a
              className="inline-block rounded-md bg-black px-3.5 py-2 text-sm text-white sm:py-1.5 sm:text-base"
              href="https://draw.roadmap.sh"
              onClick={(e) => {
                if (!isLoggedIn()) {
                  e.preventDefault();
                  showLoginPopup();
                }
              }}
            >
              Construisez votre propre roadmap
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
