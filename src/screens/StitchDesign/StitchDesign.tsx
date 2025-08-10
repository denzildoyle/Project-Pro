import React from "react";
import { PlayerActionsSection } from "./sections/PlayerActionsSection";
import { PlayerListHeaderSection } from "./sections/PlayerListHeaderSection";
import { PlayerTableSection } from "./sections/PlayerTableSection/PlayerTableSection";
import { SearchSection } from "./sections/SearchSection";

export const StitchDesign = (): JSX.Element => {
  return (
    <div className="flex flex-col bg-white w-full min-h-screen">
      <div className="flex flex-col flex-1 w-full bg-white">
        <div className="flex flex-col w-full">
          <SearchSection />
          <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-40 py-5 w-full">
            <div className="flex flex-col max-w-[960px] w-full">
              <PlayerListHeaderSection />
              <PlayerActionsSection />
              <PlayerTableSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
