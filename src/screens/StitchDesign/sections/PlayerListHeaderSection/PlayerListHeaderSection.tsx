import React from "react";
import { Button } from "../../../../components/ui/button";

interface PlayerListHeaderSectionProps {
  onAddPlayer: () => void;
}

export const PlayerListHeaderSection = ({ onAddPlayer }: PlayerListHeaderSectionProps): JSX.Element => {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 w-full">
      <div className="flex flex-col items-start">
        <h1 className="font-bold text-2xl sm:text-[32px] text-[#111416] leading-8 sm:leading-10 font-['Manrope',Helvetica]">
          Players
        </h1>
      </div>

      <Button
        onClick={onAddPlayer}
        variant="secondary"
        className="h-8 px-4 py-0 rounded-lg font-medium text-sm text-[#111416] bg-[#eff2f4] hover:bg-[#e4e7e9] w-full sm:w-auto"
      >
        Add Player
      </Button>
    </header>
  );
};
