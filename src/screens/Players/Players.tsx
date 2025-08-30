import { useState } from "react";
import { AddPlayerModal } from "../../components/AddPlayerModal";
import { PlayerListHeaderSection } from "./sections/PlayerListHeaderSection";
import { PlayerTableSection } from "./sections/PlayerTableSection/PlayerTableSection";
import { Header } from "../../components/ui/header";

interface Player {
	id: number;
	name: string;
	age: number;
	position: string;
	status: string;
	photo: string;
}

export const Players = (): JSX.Element => {
	const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
	const [players, setPlayers] = useState<Player[]>([
		{
			id: 1,
			name: "Ethan Harper",
			age: 16,
			position: "Forward",
			status: "Completed",
			photo: "/depth-10--frame-0.png",
		},
		{
			id: 2,
			name: "Liam Carter",
			age: 15,
			position: "Midfielder",
			status: "Pending",
			photo: "/depth-10--frame-0-1.png",
		},
		{
			id: 3,
			name: "Noah Bennett",
			age: 17,
			position: "Defender",
			status: "Completed",
			photo: "/depth-10--frame-0-2.png",
		},
		{
			id: 4,
			name: "Oliver Reed",
			age: 16,
			position: "Forward",
			status: "Pending",
			photo: "/depth-10--frame-0-3.png",
		},
		{
			id: 5,
			name: "Elijah Foster",
			age: 15,
			position: "Midfielder",
			status: "Completed",
			photo: "/depth-10--frame-0-4.png",
		},
		{
			id: 6,
			name: "Lucas Morgan",
			age: 17,
			position: "Defender",
			status: "Pending",
			photo: "/depth-10--frame-0-5.png",
		},
		{
			id: 7,
			name: "Henry Hayes",
			age: 16,
			position: "Forward",
			status: "Completed",
			photo: "/depth-10--frame-0-6.png",
		},
		{
			id: 8,
			name: "Daniel Blake",
			age: 15,
			position: "Midfielder",
			status: "Pending",
			photo: "/depth-10--frame-0-7.png",
		},
		{
			id: 9,
			name: "Owen Hughes",
			age: 17,
			position: "Defender",
			status: "Completed",
			photo: "/depth-10--frame-0-8.png",
		},
		{
			id: 10,
			name: "Samuel Cox",
			age: 16,
			position: "Forward",
			status: "Pending",
			photo: "/depth-10--frame-0-9.png",
		},
	]);

	const handleAddPlayer = (newPlayerData: Omit<Player, "id">) => {
		const newPlayer: Player = {
			...newPlayerData,
			id: Math.max(...players.map((p) => p.id)) + 1,
		};
		setPlayers((prev) => [...prev, newPlayer]);
	};

	return (
		<div>
			<PlayerListHeaderSection
				onAddPlayer={() => setIsAddPlayerModalOpen(true)}
			/>
			<PlayerTableSection players={players} />
			<AddPlayerModal
				isOpen={isAddPlayerModalOpen}
				onClose={() => setIsAddPlayerModalOpen(false)}
				onAddPlayer={handleAddPlayer}
			/>
		</div>
	);
};
