import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/ui/header";

// Mock assessment data with drill details
const assessmentDetails = {
	1: {
		id: 1,
		date: "2024-07-20",
		type: "Technical",
		playerName: "Ethan Harper",
		drills: [
			{
				name: "Cone Dash",
				criteria: [
					"Keeps the ball close",
					"Maintains control and speed",
					"Avoids cones",
				],
			},
			{
				name: "Agility Ladder",
				criteria: [
					"Quick footwork",
					"Maintains balance",
					"Avoids stepping on rungs",
				],
			},
			{
				name: "Passing Accuracy",
				criteria: [
					"Hits target consistently",
					"Uses proper technique",
					"Varies passing distance",
				],
			},
		],
	},
	2: {
		id: 2,
		date: "2024-06-15",
		type: "Physical",
		playerName: "Ethan Harper",
		drills: [
			{
				name: "Sprint Test",
				criteria: [
					"Explosive start",
					"Maintains top speed",
					"Good running form",
				],
			},
			{
				name: "Endurance Run",
				criteria: [
					"Consistent pace",
					"Proper breathing",
					"Strong finish",
				],
			},
		],
	},
	3: {
		id: 3,
		date: "2024-05-10",
		type: "Tactical",
		playerName: "Ethan Harper",
		drills: [
			{
				name: "Positioning",
				criteria: [
					"Reads the game well",
					"Makes smart runs",
					"Communicates effectively",
				],
			},
			{
				name: "Decision Making",
				criteria: [
					"Quick decisions",
					"Chooses right option",
					"Adapts to situations",
				],
			},
		],
	},
};

type Rating = "excellent" | "good" | "needs-improvement" | null;

export const AssessmentDetail = (): JSX.Element => {
	const { playerId, assessmentId } = useParams<{
		playerId: string;
		assessmentId: string;
	}>();
	const assessment =
		assessmentDetails[
			parseInt(assessmentId || "1") as keyof typeof assessmentDetails
		] || assessmentDetails[1];

	// State to track ratings for each criterion
	const [ratings, setRatings] = useState<Record<string, Rating>>({});

	const handleRatingChange = (criterionKey: string, rating: Rating) => {
		setRatings((prev) => ({
			...prev,
			[criterionKey]: rating,
		}));
	};

	const getRatingSymbol = (rating: Rating) => {
		switch (rating) {
			case "excellent":
				return "✔";
			case "good":
				return "⚠";
			case "needs-improvement":
				return "✘";
			default:
				return "✔/⚠/✘";
		}
	};

	const getRatingColor = (rating: Rating) => {
		switch (rating) {
			case "excellent":
				return "text-green-600";
			case "good":
				return "text-orange-500";
			case "needs-improvement":
				return "text-red-600";
			default:
				return "text-gray-600";
		}
	};

	const handleSavePerformance = () => {
		console.log("Saving performance ratings:", ratings);
		// Here you would typically save to a backend
		alert("Performance saved successfully!");
	};

	return (
		<div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
			<div className="layout-container flex h-full grow flex-col">
				<Header role="coach" />
				{/* Main Content */}
				<div className="px-4 sm:px-10 lg:px-40 flex flex-1 justify-center py-5">
					<div className="layout-content-container flex flex-col max-w-[960px] flex-1">
						{/* Header Section */}
						<div className="flex flex-wrap justify-between gap-3 p-4">
							<div className="flex min-w-72 flex-col gap-3">
								<p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
									Drill Performance for{" "}
									{assessment.playerName}
								</p>
								<p className="text-[#60758a] text-sm font-normal leading-normal">
									Record performance ratings for each drill -{" "}
									{assessment.type} Assessment (
									{assessment.date})
								</p>
							</div>
						</div>

						{/* Drills Sections */}
						{assessment.drills.map((drill, drillIndex) => (
							<div key={drillIndex}>
								<h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
									{drill.name}
								</h2>
								{drill.criteria.map(
									(criterion, criterionIndex) => {
										const criterionKey = `${drillIndex}-${criterionIndex}`;
										const currentRating =
											ratings[criterionKey];

										return (
											<div
												key={criterionIndex}
												className="flex items-center gap-4 bg-white px-4 min-h-14 justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors"
											>
												<p className="text-[#111418] text-base font-normal leading-normal flex-1 truncate">
													{criterion}
												</p>
												<div className="shrink-0 flex gap-2">
													<button
														onClick={() =>
															handleRatingChange(
																criterionKey,
																"excellent"
															)
														}
														className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
															currentRating ===
															"excellent"
																? "bg-green-100 text-green-700 border border-green-300"
																: "hover:bg-green-50 text-green-600"
														}`}
													>
														✔
													</button>
													<button
														onClick={() =>
															handleRatingChange(
																criterionKey,
																"good"
															)
														}
														className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
															currentRating ===
															"good"
																? "bg-orange-100 text-orange-700 border border-orange-300"
																: "hover:bg-orange-50 text-orange-500"
														}`}
													>
														⚠
													</button>
													<button
														onClick={() =>
															handleRatingChange(
																criterionKey,
																"needs-improvement"
															)
														}
														className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
															currentRating ===
															"needs-improvement"
																? "bg-red-100 text-red-700 border border-red-300"
																: "hover:bg-red-50 text-red-600"
														}`}
													>
														✘
													</button>
												</div>
											</div>
										);
									}
								)}
							</div>
						))}

						{/* Save Button */}
						<div className="flex px-4 py-3 justify-end">
							<Button
								onClick={handleSavePerformance}
								className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0d80f2] hover:bg-[#0b6fd1] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
							>
								<span className="truncate">
									Save Performance
								</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
