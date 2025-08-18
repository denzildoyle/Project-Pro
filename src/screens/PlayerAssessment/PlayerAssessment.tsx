import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";

// Mock assessment data
const assessmentData = [
	{
		id: 1,
		date: "2024-07-20",
		type: "Technical",
		overallScore: 85,
	},
	{
		id: 2,
		date: "2024-06-15",
		type: "Physical",
		overallScore: 78,
	},
	{
		id: 3,
		date: "2024-05-10",
		type: "Tactical",
		overallScore: 92,
	},
];

// Mock player data - in a real app this would come from props or API
const playerData = {
	1: {
		name: "Ethan Harper",
		position: "Forward",
		age: 18,
		location: "Port of Spain, Trinidad",
		strongFoot: "Right",
		photo: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	2: {
		name: "Liam Carter",
		position: "Midfielder",
		age: 15,
		location: "London, England",
		strongFoot: "Left",
		photo: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
	},
	// Add more players as needed
};

export const PlayerAssessment = (): JSX.Element => {
	const { playerId } = useParams<{ playerId: string }>();
	const navigate = useNavigate();
	const player =
		playerData[parseInt(playerId || "1") as keyof typeof playerData] ||
		playerData[1];

	const handleViewAssessment = (assessmentId: number) => {
		navigate(`/player/${playerId}/assessment/${assessmentId}`);
	};

	return (
		<div className="flex flex-col bg-white w-full min-h-screen">
			{/* Main Content */}
			<div className="px-4 sm:px-10 lg:px-40 flex flex-1 justify-center py-5">
				<div className="flex flex-col max-w-[960px] flex-1">
					{/* Breadcrumb */}
					<div className="flex flex-wrap gap-2 p-4">
						<Link
							to="/"
							className="text-[#60758a] text-base font-medium leading-normal font-['Manrope',Helvetica] hover:text-blue-600 transition-colors"
						>
							Players
						</Link>
						<span className="text-[#60758a] text-base font-medium leading-normal font-['Manrope',Helvetica]">
							/
						</span>
						<span className="text-[#111418] text-base font-medium leading-normal font-['Manrope',Helvetica]">
							{player.name}
						</span>
					</div>

					{/* Player Profile Section */}
					<div className="flex p-4">
						<div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
							<div className="flex flex-col sm:flex-row gap-4">
								<Avatar className="min-h-32 w-32 rounded-full">
									<AvatarImage
										src={player.photo}
										alt={`${player.name} photo`}
										className="object-cover"
									/>
									<AvatarFallback className="text-2xl font-bold">
										{player.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col justify-center">
									<p className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] font-['Manrope',Helvetica]">
										{player.name}
									</p>
									<p className="text-[#60758a] text-base font-normal leading-normal font-['Manrope',Helvetica]">
										{player.position}
									</p>
									<p className="text-[#60758a] text-base font-normal leading-normal font-['Manrope',Helvetica]">
										Age: {player.age} · Location:{" "}
										{player.location} · Strong Foot:{" "}
										{player.strongFoot}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Assessments Section */}
					<h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] font-['Manrope',Helvetica] px-4 pb-3 pt-5">
						Assessments
					</h2>

					{/* Assessments Table */}
					<div className="px-4 py-3">
						<div className="w-full bg-white rounded-lg border border-[#dbe0e6] overflow-hidden">
							<Table>
								<TableHeader>
									<TableRow className="border-none bg-white">
										<TableHead className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal font-['Manrope',Helvetica] w-[200px] sm:w-[400px]">
											Date
										</TableHead>
										<TableHead className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal font-['Manrope',Helvetica] w-[150px] sm:w-[400px]">
											Type
										</TableHead>
										<TableHead className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal font-['Manrope',Helvetica] w-[120px] sm:w-[400px]">
											Overall Score
										</TableHead>
										<TableHead className="px-4 py-3 text-left text-[#60758a] text-sm font-medium leading-normal font-['Manrope',Helvetica] w-[100px] sm:w-60">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{assessmentData.map((assessment) => (
										<TableRow
											key={assessment.id}
											className="h-[72px] border-t border-t-[#dbe0e6] hover:bg-gray-50 transition-colors"
										>
											<TableCell className="px-4 py-2 text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
												{assessment.date}
											</TableCell>
											<TableCell className="px-4 py-2 text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
												{assessment.type}
											</TableCell>
											<TableCell className="px-4 py-2 text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
												<span
													className={`font-semibold ${
														assessment.overallScore >=
														90
															? "text-green-600"
															: assessment.overallScore >=
															  80
															? "text-blue-600"
															: assessment.overallScore >=
															  70
															? "text-orange-600"
															: "text-red-600"
													}`}
												>
													{assessment.overallScore}
												</span>
											</TableCell>
											<TableCell className="px-4 py-2">
												<Button
													variant="ghost"
													onClick={() =>
														handleViewAssessment(
															assessment.id
														)
													}
													className="text-[#60758a] text-sm font-bold leading-normal tracking-[0.015em] font-['Manrope',Helvetica] p-0 h-auto hover:bg-transparent hover:text-blue-600 transition-colors"
												>
													View
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>

					{/* Create New Assessment Button */}
					<div className="flex px-4 py-3 justify-end">
						<Button
							onClick={() =>
								navigate(`/player/${playerId}/report`)
							}
							variant="outline"
							className="min-w-[84px] max-w-[480px] h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] font-['Manrope',Helvetica] transition-colors"
						>
							View Report
						</Button>
						<Button className="min-w-[84px] max-w-[480px] h-10 px-4 bg-[#0d80f2] hover:bg-[#0b6fd1] text-white text-sm font-bold leading-normal tracking-[0.015em] font-['Manrope',Helvetica] transition-colors">
							Create New Assessment
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
