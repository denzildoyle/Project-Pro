import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../../components/ui/header";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

// Mock player report data
const playerReportData = {
	1: {
		name: "Kai Rampersad",
		category: "U13",
		position: "DEFENDER",
		parisRate: 5,
		globalRate: 50,
		photo: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
		stats: {
			technique: {
				"Short pass": 5,
				"Long pass": 5,
				"First touch": 5,
				Accuracy: 5,
				Dribbling: 5,
				Finishing: 1,
				"Marking 1v1": 4,
				"Weak foot": 5,
			},
			mental: {
				Motivation: 5,
				Aggressiveness: 5,
				"Emotion management": 5,
				Concentration: 5,
				Leadership: 5,
				"Collective team work": 5,
			},
			possession: {
				"Occupy space": 5,
				Mobility: 5,
				"Game orientation": 5,
				Positioning: 5,
			},
			transition: {
				Offensive: 5,
				Defensive: 5,
			},
			physical: {
				Acceleration: 5,
				Agility: 5,
				Strength: 5,
				Stamina: 5,
			},
			perception: {
				"Information taking": 5,
				Analyse: 5,
				"Decision making": 5,
			},
			paris: {
				POSSESSION: 5,
				ANALYSE: 5,
				REACTION: 5,
				INTENSITY: 5,
				STRUCTURE: 5,
			},
		},
		radarData: [4, 5, 5, 5, 5],
		comments:
			"You're an engaged and committed player. What's needed now is more focus, consistency, and discipline during training. You have the qualities—now you must express them fully.",
		session: "SUMMER 2025",
		coach: "Coach Rayan",
	},
};

export const PlayerReport = (): JSX.Element => {
	const { playerId } = useParams<{ playerId: string }>();
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstance = useRef<Chart | null>(null);

	const player =
		playerReportData[
			parseInt(playerId || "1") as keyof typeof playerReportData
		] || playerReportData[1];

	useEffect(() => {
		if (chartRef.current) {
			// Destroy existing chart if it exists
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}

			const ctx = chartRef.current.getContext("2d");
			if (ctx) {
				chartInstance.current = new Chart(ctx, {
					type: "radar",
					data: {
						labels: [
							"TECHNIQUE",
							"TACTIC",
							"PHYSIC",
							"MENTAL",
							"TRANSITION",
						],
						datasets: [
							{
								label: "Player Stats",
								data: player.radarData,
								backgroundColor: "rgba(220, 38, 38, 0.2)",
								borderColor: "rgba(220, 38, 38, 1)",
								borderWidth: 2,
								pointBackgroundColor: "rgba(220, 38, 38, 1)",
								pointBorderColor: "#fff",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(220, 38, 38, 1)",
							},
						],
					},
					options: {
						elements: {
							line: {
								borderWidth: 3,
							},
						},
						scales: {
							r: {
								angleLines: {
									display: true,
									color: "#e5e7eb",
								},
								suggestedMin: 0,
								suggestedMax: 5,
								grid: {
									color: "#e5e7eb",
								},
								pointLabels: {
									font: {
										size: 10,
										weight: "bold",
									},
									color: "#4b5563",
								},
								ticks: {
									display: false,
									stepSize: 1,
								},
							},
						},
						plugins: {
							legend: {
								display: false,
							},
						},
						maintainAspectRatio: false,
					},
				});
			}
		}

		// Cleanup function
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [player.radarData]);

	const RatingScale = () => (
		<div>
			<h3 className="font-bold mb-2 font-['Manrope',Helvetica]">
				PERFORMANCE RATING SCALE
			</h3>
			{[
				{
					rating: 1,
					description:
						"Weak : Performs below the expected standards.",
				},
				{
					rating: 3,
					description:
						"Needs Improvement : Does not currently meet expectations.",
				},
				{
					rating: 5,
					description:
						"Average : Satisfactory performance but could be improved.",
				},
				{
					rating: 7,
					description:
						"Above average : Consistently meets the expected standard of performance.",
				},
				{
					rating: 9,
					description:
						"Excellent : Ability and performance exceeds performance standards.",
				},
			].map((item) => (
				<div
					key={item.rating}
					className="flex items-center mb-1 text-xs font-['Manrope',Helvetica]"
				>
					<div className="w-3.5 h-3.5 border border-gray-400 mr-2"></div>
					<span>
						{item.rating} &gt; {item.description}
					</span>
				</div>
			))}
		</div>
	);

	const StatsCategory = ({
		title,
		stats,
		isParisSection = false,
	}: {
		title: string;
		stats: Record<string, number>;
		isParisSection?: boolean;
	}) => (
		<div
			className={`mb-6 ${
				isParisSection ? "bg-gray-100 p-4 rounded-lg" : ""
			}`}
		>
			<h4
				className={`font-bold text-gray-600 mb-3 uppercase text-sm tracking-wide font-['Manrope',Helvetica] ${
					isParisSection ? "text-center text-red-600" : ""
				}`}
			>
				{title}
			</h4>
			{Object.entries(stats).map(([key, value]) => (
				<div
					key={key}
					className="flex justify-between mb-1 text-sm font-['Manrope',Helvetica]"
				>
					<span>{key}</span>
					<span>{value}</span>
				</div>
			))}
		</div>
	);

	return (
		<div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
			<div className="layout-container flex h-full grow flex-col">
				<Header role="coach" />

				{/* Main Content */}
				<div className="px-4 sm:px-10 lg:px-40 flex flex-1 justify-center py-5">
					<div className="layout-content-container flex flex-col max-w-[900px] flex-1">
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
							<Link
								to={`/player/${playerId}/assessment`}
								className="text-[#60758a] text-base font-medium leading-normal font-['Manrope',Helvetica] hover:text-blue-600 transition-colors"
							>
								{player.name}
							</Link>
							<span className="text-[#60758a] text-base font-medium leading-normal font-['Manrope',Helvetica]">
								/
							</span>
							<span className="text-[#111418] text-base font-medium leading-normal font-['Manrope',Helvetica]">
								Report
							</span>
						</div>

						{/* Main Report Container */}
						<div className="bg-white p-10 shadow-lg rounded-xl mx-4">
							{/* Header Image */}
							<header className="mb-8">
								<img
									src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800"
									alt="Team players celebrating"
									className="w-full h-auto rounded-lg mb-8"
								/>
								<h2 className="text-red-600 font-bold uppercase tracking-wider pb-2 border-b-4 border-red-600 mb-6 font-['Manrope',Helvetica]">
									PERFORMANCE
								</h2>
							</header>

							{/* Player Info Grid */}
							<section className="grid grid-cols-3 gap-6 mb-8 text-center">
								<div className="player-info-item">
									<p className="text-xl font-bold text-gray-900 font-['Manrope',Helvetica]">
										{player.name}
									</p>
									<h3 className="text-sm text-gray-600 font-['Manrope',Helvetica]">
										CATEGORY{" "}
										<span className="font-normal">
											{player.category}
										</span>
									</h3>
									<h3 className="text-sm text-gray-600 font-['Manrope',Helvetica]">
										POSITION{" "}
										<span className="font-normal">
											{player.position}
										</span>
									</h3>
								</div>
								<div className="player-info-item">
									<h3 className="text-sm text-gray-600 mb-1 font-['Manrope',Helvetica]">
										P.A.R.I.S. RATE
									</h3>
									<div className="text-xl font-bold text-gray-900 font-['Manrope',Helvetica]">
										{player.parisRate}
									</div>
								</div>
								<div className="player-info-item">
									<h3 className="text-sm text-gray-600 mb-1 font-['Manrope',Helvetica]">
										GLOBAL RATE
									</h3>
									<div className="text-xl font-bold text-gray-900 font-['Manrope',Helvetica]">
										{player.globalRate}
									</div>
									<div className="w-full bg-gray-300 rounded-full h-2 mt-2">
										<div
											className="bg-blue-600 h-2 rounded-full"
											style={{
												width: `${player.globalRate}%`,
											}}
										></div>
									</div>
								</div>
							</section>

							{/* Performance Grid */}
							<main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
								<div className="lg:col-span-1">
									<RatingScale />
								</div>
								<div className="lg:col-span-2 flex flex-col items-end">
									<img
										src="https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=200"
										alt="Club logo"
										className="w-20 h-auto mb-2"
									/>
									<p className="text-sm font-bold font-['Manrope',Helvetica]">
										ACADEMY PRO
									</p>
									<p className="text-xs font-['Manrope',Helvetica]">
										Paris
									</p>
								</div>
							</main>

							{/* Stats Grid */}
							<section className="mt-8">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
									<div>
										<StatsCategory
											title="TECHNIQUE"
											stats={player.stats.technique}
										/>
										<StatsCategory
											title="MENTAL"
											stats={player.stats.mental}
										/>
									</div>
									<div>
										<StatsCategory
											title="POSSESSION"
											stats={player.stats.possession}
										/>
										<StatsCategory
											title="TRANSITION"
											stats={player.stats.transition}
										/>
										<StatsCategory
											title="P.A.R.I.S."
											stats={player.stats.paris}
											isParisSection={true}
										/>
									</div>
									<div>
										<StatsCategory
											title="PHYSICAL"
											stats={player.stats.physical}
										/>
									</div>
									<div>
										<StatsCategory
											title="PERCEPTION"
											stats={player.stats.perception}
										/>
									</div>
								</div>
							</section>

							{/* Chart and Player Image */}
							<section className="flex flex-col lg:flex-row items-center justify-between mt-8 gap-8">
								<div className="w-full lg:w-80 h-80">
									<canvas ref={chartRef}></canvas>
								</div>
								<div className="text-right">
									<img
										src={player.photo}
										alt="Player portrait"
										className="max-w-48 rounded-lg"
									/>
								</div>
							</section>

							{/* General Comments */}
							<section className="mt-8">
								<h2 className="text-red-600 font-bold uppercase tracking-wider pb-2 border-b-4 border-red-600 mb-6 font-['Manrope',Helvetica]">
									GENERAL COMMENTS
								</h2>
								<div className="bg-gray-100 p-6 rounded-lg mb-8">
									<p className="text-gray-700 leading-relaxed font-['Manrope',Helvetica]">
										{player.comments}
									</p>
								</div>
							</section>

							{/* Footer */}
							<footer className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-300">
								<div>
									<h4 className="text-xs text-gray-500 uppercase font-['Manrope',Helvetica]">
										SESSION
									</h4>
									<p className="font-medium font-['Manrope',Helvetica]">
										{player.session}
									</p>
								</div>
								<div>
									<h4 className="text-xs text-gray-500 uppercase font-['Manrope',Helvetica]">
										COACH
									</h4>
									<p className="font-medium font-['Manrope',Helvetica]">
										{player.coach}
									</p>
								</div>
							</footer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
