import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  status: string;
  photo: string;
}

interface PlayerTableSectionProps {
  players: Player[];
}

export const PlayerTableSection = ({ players }: PlayerTableSectionProps): JSX.Element => {
  return (
    <section className="flex flex-col items-start px-2 sm:px-4 py-3 w-full">
      <div className="w-full bg-white rounded-lg border border-[#dbe0e5] overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow className="border-none">
              <TableHead className="w-[72px] px-2 sm:px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Photo
              </TableHead>
              <TableHead className="w-[140px] sm:w-[180px] px-2 sm:px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Name
              </TableHead>
              <TableHead className="w-[80px] sm:w-[162px] px-2 sm:px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Age
              </TableHead>
              <TableHead className="w-[120px] sm:w-[189px] px-2 sm:px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Position
              </TableHead>
              <TableHead className="w-[120px] sm:w-[168px] px-2 sm:px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Assessed
              </TableHead>
              <TableHead className="w-[120px] sm:w-[155px] px-2 sm:px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#607589] text-sm">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player.id}
                className="h-[60px] sm:h-[72px] border-t border-[#e5e8ea] hover:bg-[#f8f9fa] transition-colors"
              >
                <TableCell className="w-[72px] px-2 sm:px-4 py-2">
                  <Avatar className="w-8 sm:w-10 h-8 sm:h-10">
                    <AvatarImage
                      src={player.photo}
                      alt={`${player.name} photo`}
                      className="object-cover"
                    />
                    <AvatarFallback className="[font-family:'Manrope',Helvetica] font-medium text-xs sm:text-sm">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="w-[140px] sm:w-[180px] px-2 sm:px-4 py-2">
                  <div className="[font-family:'Manrope',Helvetica] font-normal text-[#111416] text-xs sm:text-sm truncate">
                    {player.name}
                  </div>
                </TableCell>
                <TableCell className="w-[80px] sm:w-[162px] px-2 sm:px-4 py-2">
                  <div className="[font-family:'Manrope',Helvetica] font-normal text-[#607589] text-xs sm:text-sm">
                    {player.age}
                  </div>
                </TableCell>
                <TableCell className="w-[120px] sm:w-[189px] px-2 sm:px-4 py-2">
                  <div className="[font-family:'Manrope',Helvetica] font-normal text-[#607589] text-xs sm:text-sm">
                    {player.position}
                  </div>
                </TableCell>
                <TableCell className="w-[120px] sm:w-[168px] px-2 sm:px-4 py-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#eff2f4] text-[#111416] [font-family:'Manrope',Helvetica] font-medium text-xs sm:text-sm hover:bg-[#eff2f4] px-2 sm:px-4 py-1 h-6 sm:h-8 rounded-lg"
                  >
                    {player.status}
                  </Badge>
                </TableCell>
                <TableCell className="w-[120px] sm:w-[155px] px-2 sm:px-4 py-2">
                  <Button
                    variant="ghost"
                    className="[font-family:'Manrope',Helvetica] font-bold text-[#607589] text-xs sm:text-sm p-0 h-auto hover:bg-transparent hover:text-[#111416] transition-colors"
                  >
                    Open Assessment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </section>
  );
};
