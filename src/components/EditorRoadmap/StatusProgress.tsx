import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import X from '../../pages/x.astro';
import type { Node } from 'reactflow';

function StatusProgress() {
  const [showChangeStatus, setShowChangeStatus] = useState(false);

  return (
    <div className="mb-2">
      <div className="relative inline-flex rounded-md border border-gray-300">
        <span className="inline-flex cursor-default items-center p-1 px-2 text-sm text-black">
          <span className="flex h-2 w-2">
            <span
              className={`relative inline-flex h-2 w-2 rounded-full`}
            ></span>
          </span>
          <span className="ml-2 capitalize">In Progress</span>
        </span>

        <button
          className="inline-flex cursor-pointer items-center rounded-br-md rounded-tr-md border-l border-l-gray-300 bg-gray-100 p-1 px-2 text-sm text-black hover:bg-gray-200"
          onClick={() => setShowChangeStatus(!showChangeStatus)}
        >
          <span className="mr-0.5">Update Status</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {showChangeStatus && (
          <div className="absolute right-0 top-full mt-1 flex min-w-[160px] flex-col divide-y rounded-md border border-gray-200 bg-white shadow-md [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-b-md">
            <button
              className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => console.log('done')}
            >
              <span>
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full`}
                ></span>
                Done
              </span>
              <span className="text-xs text-gray-500">D</span>
            </button>
            <button
              className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => console.log('learning')}
            >
              <span>
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full`}
                ></span>
                In Progress
              </span>

              <span className="text-xs text-gray-500">L</span>
            </button>
            <button
              className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => console.log('pending')}
            >
              <span>
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full`}
                ></span>
                Reset
              </span>
              <span className="text-xs text-gray-500">R</span>
            </button>
            <button
              className="inline-flex justify-between px-3 py-1.5 text-left text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => console.log('skipped')}
            >
              <span>
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full`}
                ></span>
                Skip
              </span>
              <span className="text-xs text-gray-500">S</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusProgress;
