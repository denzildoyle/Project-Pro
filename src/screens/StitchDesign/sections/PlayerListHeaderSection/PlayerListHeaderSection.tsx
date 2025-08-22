import { Button } from "../../../../components/ui/button";
import { Plus } from "lucide-react";

interface PlayerListHeaderSectionProps {
	onAddPlayer: () => void;
}

export const PlayerListHeaderSection = ({
	onAddPlayer,
}: PlayerListHeaderSectionProps): JSX.Element => {
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
				className="font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
			>
				<Plus className="w-4 h-4 mr-2" />
				Add Player
			</Button>
		</header>
	);
};
