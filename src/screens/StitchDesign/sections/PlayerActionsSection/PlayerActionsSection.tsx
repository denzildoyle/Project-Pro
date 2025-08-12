import React from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

export const PlayerActionsSection = (): JSX.Element => {
  // Define filter categories for player age groups
  const filterCategories = [
    { id: "all", label: "All" },
    { id: "u15", label: "U15" },
    { id: "u17", label: "U17" },
  ];

  return (
    <section className="flex flex-wrap items-start gap-3 px-3 py-3 relative self-stretch w-full">
      <ToggleGroup type="single" defaultValue="all" className="flex gap-3">
        {filterCategories.map((category) => (
          <ToggleGroupItem
            key={category.id}
            value={category.id}
            className="h-8 px-4 py-0 bg-[#eff2f4] rounded-lg hover:bg-[#e4e7ea] data-[state=on]:bg-[#e4e7ea]"
          >
            <span className="font-medium text-[#111416] text-sm leading-[21px] font-sans">
              {category.label}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </section>
  );
};
