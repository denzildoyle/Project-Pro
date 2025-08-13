import React, { useState } from "react";
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

export const PlayerTableSection = ({
	players,
}: PlayerTableSectionProps): JSX.Element => {
	const navigate = useNavigate();

	const [ageGroup, setAgeGroup] = useState<"All" | "U8" | "U15" | "U17">(
		"All"
	);

	const handleOpenAssessment = (playerId: number) => {
		navigate(`/player/${playerId}/assessment`);
	};

	const filterPlayers = (players: Player[]) => {
		switch (ageGroup) {
			case "U8":
				return players.filter((p) => p.age < 8);
			case "U15":
				return players.filter((p) => p.age >= 8 && p.age < 15);
			case "U17":
				return players.filter((p) => p.age >= 15 && p.age < 17);
			default:
				return players;
		}
	};

	const filteredPlayers = filterPlayers(players);
	return (
		<section className="flex flex-col items-start px-2 sm:px-4 py-3 w-full">
			<div className="mb-4">
				<label className="mr-2 font-medium text-sm">
					Filter by Age Group:
				</label>
				<select
					value={ageGroup}
					onChange={(e) =>
						setAgeGroup(e.target.value as typeof ageGroup)
					}
					className="border rounded px-2 py-1 text-sm"
				>
					<option value="All">All</option>
					<option value="U8">U8</option>
					<option value="U15">U15</option>
					<option value="U17">U17</option>
				</select>
			</div>
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
							{filteredPlayers.map((player) => (
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
											className={`[font-family:'Manrope',Helvetica] font-medium text-xs sm:text-sm px-2 sm:px-4 py-1 h-6 sm:h-8 rounded-lg ${
												player.status === "Completed"
													? "bg-green-100 text-green-800 hover:bg-green-100"
													: "bg-orange-100 text-orange-800 hover:bg-orange-100"
											}`}
										>
											{player.status}
										</Badge>
									</TableCell>
									<TableCell className="w-[155px] px-4 py-2">
										<Button
											variant="ghost"
											onClick={() =>
												handleOpenAssessment(player.id)
											}
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
			</div>
			<div className="w-full bg-white rounded-lg border border-[#dbe0e5] overflow-hidden">
				<div className="overflow-x-auto">
					<Table className="min-w-[800px]">
						<TableHeader></TableHeader>
						<TableBody></TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
};
