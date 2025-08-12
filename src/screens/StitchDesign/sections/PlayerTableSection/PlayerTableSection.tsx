import React from "react";
import { useNavigate } from "react-router-dom";
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

const playersData = [
  {
    id: 1,
    name: "Ethan Harper",
    age: 16,
    position: "Forward",
    status: "Completed",
    photo: "..//depth-10--frame-0.png",
  },
  {
    id: 2,
    name: "Liam Carter",
    age: 15,
    position: "Midfielder",
    status: "Pending",
    photo: "..//depth-10--frame-0-1.png",
  },
  {
    id: 3,
    name: "Noah Bennett",
    age: 17,
    position: "Defender",
    status: "Completed",
    photo: "..//depth-10--frame-0-2.png",
  },
  {
    id: 4,
    name: "Oliver Reed",
    age: 16,
    position: "Forward",
    status: "Pending",
    photo: "..//depth-10--frame-0-3.png",
  },
  {
    id: 5,
    name: "Elijah Foster",
    age: 15,
    position: "Midfielder",
    status: "Completed",
    photo: "..//depth-10--frame-0-4.png",
  },
  {
    id: 6,
    name: "Lucas Morgan",
    age: 17,
    position: "Defender",
    status: "Pending",
    photo: "..//depth-10--frame-0-5.png",
  },
  {
    id: 7,
    name: "Henry Hayes",
    age: 16,
    position: "Forward",
    status: "Completed",
    photo: "..//depth-10--frame-0-6.png",
  },
  {
    id: 8,
    name: "Daniel Blake",
    age: 15,
    position: "Midfielder",
    status: "Pending",
    photo: "..//depth-10--frame-0-7.png",
  },
  {
    id: 9,
    name: "Owen Hughes",
    age: 17,
    position: "Defender",
    status: "Completed",
    photo: "..//depth-10--frame-0-8.png",
  },
  {
    id: 10,
    name: "Samuel Cox",
    age: 16,
    position: "Forward",
    status: "Pending",
    photo: "..//depth-10--frame-0-9.png",
  },
];

export const PlayerTableSection = (): JSX.Element => {
  const navigate = useNavigate();

  const handleOpenAssessment = (playerId: number) => {
    navigate(`/player/${playerId}/assessment`);
  };

  return (
    <section className="flex flex-col items-start px-4 py-3 w-full">
      <div className="w-full bg-white rounded-lg border border-[#dbe0e5] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-none">
              <TableHead className="w-[72px] px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Photo
              </TableHead>
              <TableHead className="w-[180px] px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Name
              </TableHead>
              <TableHead className="w-[162px] px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Age
              </TableHead>
              <TableHead className="w-[189px] px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Position
              </TableHead>
              <TableHead className="w-[168px] px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-sm">
                Assessed
              </TableHead>
              <TableHead className="w-[155px] px-4 py-3 [font-family:'Manrope',Helvetica] font-medium text-[#607589] text-sm">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playersData.map((player) => (
              <TableRow
                key={player.id}
                className="h-[72px] border-t border-[#e5e8ea]"
              >
                <TableCell className="w-[72px] px-4 py-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={player.photo}
                      alt={`${player.name} photo`}
                      className="object-cover"
                    />
                    <AvatarFallback className="[font-family:'Manrope',Helvetica] font-medium text-sm">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="w-[180px] px-4 py-2">
                  <div className="[font-family:'Manrope',Helvetica] font-normal text-[#111416] text-sm">
                    {player.name}
                  </div>
                </TableCell>
                <TableCell className="w-[162px] px-4 py-2">
                  <div className="[font-family:'Manrope',Helvetica] font-normal text-[#607589] text-sm">
                    {player.age}
                  </div>
                </TableCell>
                <TableCell className="w-[189px] px-4 py-2">
                  <div className="[font-family:'Manrope',Helvetica] font-normal text-[#607589] text-sm">
                    {player.position}
                  </div>
                </TableCell>
                <TableCell className="w-[168px] px-4 py-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#eff2f4] text-[#111416] [font-family:'Manrope',Helvetica] font-medium text-sm hover:bg-[#eff2f4] px-4 py-1 h-8 rounded-lg"
                  >
                    {player.status}
                  </Badge>
                </TableCell>
                <TableCell className="w-[155px] px-4 py-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleOpenAssessment(player.id)}
                    className="[font-family:'Manrope',Helvetica] font-bold text-[#607589] text-sm p-0 h-auto hover:bg-transparent"
                  >
                    Open Assessment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
