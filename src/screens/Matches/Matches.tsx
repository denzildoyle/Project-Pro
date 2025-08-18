import React, { useState } from "react";
import Calendar from "react-calendar";
import { Header } from "../../components/ui/header";
import { Button } from "../../components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import {
	Clock,
	MapPin,
	Users,
	Calendar as CalendarIcon,
	Trophy,
	Target,
} from "lucide-react";
import "react-calendar/dist/Calendar.css";

interface Match {
	id: number;
	date: string;
	time: string;
	homeTeam: string;
	awayTeam: string;
	venue: string;
	ageGroup: string;
	competition: string;
	matchType: string;
	referee: string;
	homeScore?: number;
	awayScore?: number;
	status: "scheduled" | "live" | "completed" | "cancelled" | "postponed";
	description: string;
	objectives: string[];
	teamSheet: {
		formation: string;
		captain: string;
		keyPlayers: string[];
	};
	weather?: string;
	attendance?: number;
}

// Mock match data
const matchData: Match[] = [
	{
		id: 1,
		date: "2025-01-15",
		time: "15:00",
		homeTeam: "Project Pro U15",
		awayTeam: "City Academy U15",
		venue: "Project Pro Stadium",
		ageGroup: "U15",
		competition: "Youth League",
		matchType: "League Match",
		referee: "John Smith",
		status: "scheduled",
		description:
			"Important league match against City Academy. This is a crucial game for maintaining our position at the top of the table.",
		objectives: [
			"Maintain possession and control tempo",
			"Execute set-piece routines effectively",
			"Keep a clean sheet",
		],
		teamSheet: {
			formation: "4-3-3",
			captain: "Ethan Harper",
			keyPlayers: ["Ethan Harper", "Liam Carter", "Noah Bennett"],
		},
		weather: "Sunny, 22°C",
	},
	{
		id: 2,
		date: "2025-01-18",
		time: "14:30",
		homeTeam: "United Youth U17",
		awayTeam: "Project Pro U17",
		venue: "United Youth Ground",
		ageGroup: "U17",
		competition: "Cup Competition",
		matchType: "Quarter Final",
		referee: "Sarah Johnson",
		status: "scheduled",
		description:
			"Cup quarter-final away match. A challenging fixture against a strong United Youth side.",
		objectives: [
			"Stay compact defensively",
			"Exploit counter-attacking opportunities",
			"Maintain discipline and avoid cards",
		],
		teamSheet: {
			formation: "4-5-1",
			captain: "Oliver Reed",
			keyPlayers: ["Oliver Reed", "Lucas Morgan", "Henry Hayes"],
		},
		weather: "Cloudy, 18°C",
	},
	{
		id: 3,
		date: "2025-01-20",
		time: "16:00",
		homeTeam: "Project Pro U13",
		awayTeam: "Rangers Youth U13",
		venue: "Project Pro Training Ground",
		ageGroup: "U13",
		competition: "Friendly",
		matchType: "Friendly Match",
		referee: "Mike Wilson",
		status: "scheduled",
		description:
			"Friendly match to give younger players match experience and test new tactical approaches.",
		objectives: [
			"Give all squad players game time",
			"Practice new formation",
			"Focus on player development",
		],
		teamSheet: {
			formation: "4-4-2",
			captain: "Daniel Blake",
			keyPlayers: ["Daniel Blake", "Owen Hughes", "Samuel Cox"],
		},
	},
	{
		id: 4,
		date: "2025-01-22",
		time: "19:00",
		homeTeam: "Project Pro U17",
		awayTeam: "Elite Academy U17",
		venue: "Project Pro Stadium",
		ageGroup: "U17",
		competition: "Youth League",
		matchType: "League Match",
		referee: "David Brown",
		status: "scheduled",
		description:
			"Evening fixture under lights against Elite Academy. A test of our squad depth and tactical flexibility.",
		objectives: [
			"Adapt to playing under floodlights",
			"Rotate squad to manage player fitness",
			"Maintain winning momentum",
		],
		teamSheet: {
			formation: "3-5-2",
			captain: "Lucas Morgan",
			keyPlayers: ["Lucas Morgan", "Henry Hayes", "Elijah Foster"],
		},
		weather: "Clear, 15°C",
	},
	{
		id: 5,
		date: "2025-01-12",
		time: "15:30",
		homeTeam: "Project Pro U15",
		awayTeam: "Coastal FC U15",
		venue: "Project Pro Stadium",
		ageGroup: "U15",
		competition: "Youth League",
		matchType: "League Match",
		referee: "Emma Davis",
		homeScore: 3,
		awayScore: 1,
		status: "completed",
		description:
			"Excellent performance against Coastal FC with dominant display throughout the match.",
		objectives: [
			"Control the midfield",
			"Create chances from wide areas",
			"Maintain concentration for 90 minutes",
		],
		teamSheet: {
			formation: "4-3-3",
			captain: "Ethan Harper",
			keyPlayers: ["Ethan Harper", "Liam Carter", "Noah Bennett"],
		},
		weather: "Sunny, 20°C",
		attendance: 150,
	},
];

type CalendarValue = Date | null;

export const Matches = (): JSX.Element => {
	const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date());
	const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	// Get matches for a specific date
	const getMatchesForDate = (date: Date): Match[] => {
		const dateString = date.toISOString().split("T")[0];
		return matchData.filter((match) => match.date === dateString);
	};

	// Check if a date has matches
	const hasMatches = (date: Date): boolean => {
		const dateString = date.toISOString().split("T")[0];
		return matchData.some((match) => match.date === dateString);
	};

	// Handle date click
	const handleDateClick = (date: Date) => {
		setSelectedDate(date);
		const matches = getMatchesForDate(date);
		if (matches.length > 0) {
			setSelectedMatch(matches[0]); // Show first match if multiple
			setIsDetailsOpen(true);
		}
	};

	// Handle match click
	const handleMatchClick = (match: Match) => {
		setSelectedMatch(match);
		setIsDetailsOpen(true);
	};

	// Custom tile content for calendar
	const tileContent = ({ date }: { date: Date }) => {
		if (hasMatches(date)) {
			const matches = getMatchesForDate(date);
			const hasCompletedMatch = matches.some(
				(m) => m.status === "completed"
			);
			const hasLiveMatch = matches.some((m) => m.status === "live");

			return (
				<div className="flex justify-center mt-1">
					<div
						className={`w-2 h-2 rounded-full ${
							hasLiveMatch
								? "bg-red-500"
								: hasCompletedMatch
								? "bg-green-500"
								: "bg-blue-500"
						}`}
					></div>
				</div>
			);
		}
		return null;
	};

	// Custom tile class name
	const tileClassName = ({ date }: { date: Date }) => {
		if (hasMatches(date)) {
			return "has-matches";
		}
		return "";
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "scheduled":
				return "bg-blue-100 text-blue-800";
			case "live":
				return "bg-red-100 text-red-800";
			case "completed":
				return "bg-green-100 text-green-800";
			case "cancelled":
				return "bg-gray-100 text-gray-800";
			case "postponed":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const selectedDateMatches = selectedDate
		? getMatchesForDate(selectedDate)
		: [];

	return (
		<div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
			<div className="layout-container flex h-full grow flex-col">
				<Header />

				{/* Main Content */}
				<div className="px-4 sm:px-10 lg:px-40 flex flex-1 justify-center py-5">
					<div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
						{/* Header Section */}
						<div className="flex flex-wrap justify-between gap-3 p-4">
							<div className="flex min-w-72 flex-col gap-3">
								<p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight font-['Manrope',Helvetica]">
									Match Schedule
								</p>
								<p className="text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
									View and manage matches across all age
									groups and competitions
								</p>
							</div>
						</div>

						{/* Calendar and Matches Layout */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
							{/* Calendar Section */}
							<div className="lg:col-span-2">
								<div className="bg-white rounded-lg shadow-sm border border-[#dbe0e5] p-6">
									<h3 className="text-lg font-semibold text-[#111418] mb-4 font-['Manrope',Helvetica]">
										Match Calendar
									</h3>
									<div className="match-calendar">
										<Calendar
											onChange={setSelectedDate}
											value={selectedDate}
											onClickDay={handleDateClick}
											tileContent={tileContent}
											tileClassName={tileClassName}
											className="w-full border-none"
										/>
									</div>
									<div className="flex items-center gap-4 mt-4 text-xs text-[#60758a] font-['Manrope',Helvetica]">
										<div className="flex items-center gap-1">
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
											<span>Scheduled</span>
										</div>
										<div className="flex items-center gap-1">
											<div className="w-2 h-2 bg-red-500 rounded-full"></div>
											<span>Live</span>
										</div>
										<div className="flex items-center gap-1">
											<div className="w-2 h-2 bg-green-500 rounded-full"></div>
											<span>Completed</span>
										</div>
									</div>
								</div>
							</div>

							{/* Matches List */}
							<div className="lg:col-span-1">
								<div className="bg-white rounded-lg shadow-sm border border-[#dbe0e5] p-6">
									<h3 className="text-lg font-semibold text-[#111418] mb-4 font-['Manrope',Helvetica]">
										{selectedDate
											? `Matches for ${selectedDate.toLocaleDateString()}`
											: "Select a Date"}
									</h3>

									{selectedDateMatches.length > 0 ? (
										<div className="space-y-3">
											{selectedDateMatches.map(
												(match) => (
													<div
														key={match.id}
														onClick={() =>
															handleMatchClick(
																match
															)
														}
														className="p-3 border border-[#e5e8ea] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
													>
														<div className="flex justify-between items-start mb-2">
															<h4 className="font-medium text-[#111418] text-sm font-['Manrope',Helvetica]">
																{match.homeTeam}{" "}
																vs{" "}
																{match.awayTeam}
															</h4>
															<Badge
																variant="secondary"
																className={`text-xs ${getStatusColor(
																	match.status
																)}`}
															>
																{match.status}
															</Badge>
														</div>
														{match.status ===
															"completed" &&
															match.homeScore !==
																undefined &&
															match.awayScore !==
																undefined && (
																<div className="text-lg font-bold text-[#111418] mb-2 font-['Manrope',Helvetica]">
																	{
																		match.homeScore
																	}{" "}
																	-{" "}
																	{
																		match.awayScore
																	}
																</div>
															)}
														<div className="space-y-1 text-xs text-[#60758a] font-['Manrope',Helvetica]">
															<div className="flex items-center gap-1">
																<Clock className="w-3 h-3" />
																{match.time}
															</div>
															<div className="flex items-center gap-1">
																<Users className="w-3 h-3" />
																{match.ageGroup}
															</div>
															<div className="flex items-center gap-1">
																<MapPin className="w-3 h-3" />
																{match.venue}
															</div>
															<div className="flex items-center gap-1">
																<Trophy className="w-3 h-3" />
																{
																	match.competition
																}
															</div>
														</div>
													</div>
												)
											)}
										</div>
									) : (
										<p className="text-[#60758a] text-sm font-['Manrope',Helvetica]">
											No matches scheduled for this date.
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Upcoming Matches */}
						<div className="p-4">
							<div className="bg-white rounded-lg shadow-sm border border-[#dbe0e5] p-6">
								<h3 className="text-lg font-semibold text-[#111418] mb-4 font-['Manrope',Helvetica]">
									Upcoming Matches
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{matchData
										.filter(
											(match) =>
												match.status === "scheduled"
										)
										.slice(0, 6)
										.map((match) => (
											<div
												key={match.id}
												onClick={() =>
													handleMatchClick(match)
												}
												className="p-4 border border-[#e5e8ea] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
											>
												<div className="flex justify-between items-start mb-3">
													<h4 className="font-medium text-[#111418] font-['Manrope',Helvetica] text-sm">
														{match.homeTeam} vs{" "}
														{match.awayTeam}
													</h4>
													<Badge
														variant="secondary"
														className="text-xs"
													>
														{match.ageGroup}
													</Badge>
												</div>
												<div className="space-y-2 text-sm text-[#60758a] font-['Manrope',Helvetica]">
													<div className="flex items-center gap-2">
														<CalendarIcon className="w-4 h-4" />
														{new Date(
															match.date
														).toLocaleDateString()}
													</div>
													<div className="flex items-center gap-2">
														<Clock className="w-4 h-4" />
														{match.time}
													</div>
													<div className="flex items-center gap-2">
														<MapPin className="w-4 h-4" />
														{match.venue}
													</div>
													<div className="flex items-center gap-2">
														<Trophy className="w-4 h-4" />
														{match.competition}
													</div>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Match Details Modal */}
			<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
				<DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
					{selectedMatch && (
						<>
							<DialogHeader>
								<DialogTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
									<Trophy className="w-5 h-5" />
									{selectedMatch.homeTeam} vs{" "}
									{selectedMatch.awayTeam}
								</DialogTitle>
								<DialogDescription className="font-['Manrope',Helvetica] text-[#607589]">
									{new Date(
										selectedMatch.date
									).toLocaleDateString()}{" "}
									at {selectedMatch.time}
								</DialogDescription>
							</DialogHeader>

							<div className="space-y-6">
								{/* Match Result (if completed) */}
								{selectedMatch.status === "completed" &&
									selectedMatch.homeScore !== undefined &&
									selectedMatch.awayScore !== undefined && (
										<div className="text-center p-4 bg-green-50 rounded-lg">
											<div className="text-3xl font-bold text-[#111418] font-['Manrope',Helvetica]">
												{selectedMatch.homeScore} -{" "}
												{selectedMatch.awayScore}
											</div>
											<p className="text-sm text-[#60758a] font-['Manrope',Helvetica] mt-1">
												Final Score
											</p>
										</div>
									)}

								{/* Basic Info */}
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-3">
										<div className="flex items-center gap-2 text-sm">
											<Clock className="w-4 h-4 text-[#60758a]" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Kick-off:
											</span>
											<span className="text-[#60758a] font-['Manrope',Helvetica]">
												{selectedMatch.time}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<MapPin className="w-4 h-4 text-[#60758a]" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Venue:
											</span>
											<span className="text-[#60758a] font-['Manrope',Helvetica]">
												{selectedMatch.venue}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<Users className="w-4 h-4 text-[#60758a]" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Age Group:
											</span>
											<span className="text-[#60758a] font-['Manrope',Helvetica]">
												{selectedMatch.ageGroup}
											</span>
										</div>
									</div>
									<div className="space-y-3">
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Competition:
											</span>
											<span className="text-[#60758a] ml-2 font-['Manrope',Helvetica]">
												{selectedMatch.competition}
											</span>
										</div>
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Referee:
											</span>
											<span className="text-[#60758a] ml-2 font-['Manrope',Helvetica]">
												{selectedMatch.referee}
											</span>
										</div>
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Status:
											</span>
											<Badge
												variant="secondary"
												className={`ml-2 text-xs ${getStatusColor(
													selectedMatch.status
												)}`}
											>
												{selectedMatch.status}
											</Badge>
										</div>
									</div>
								</div>

								{/* Weather & Attendance (if available) */}
								{(selectedMatch.weather ||
									selectedMatch.attendance) && (
									<div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
										{selectedMatch.weather && (
											<div className="text-sm">
												<span className="font-medium font-['Manrope',Helvetica]">
													Weather:
												</span>
												<span className="text-[#60758a] ml-2 font-['Manrope',Helvetica]">
													{selectedMatch.weather}
												</span>
											</div>
										)}
										{selectedMatch.attendance && (
											<div className="text-sm">
												<span className="font-medium font-['Manrope',Helvetica]">
													Attendance:
												</span>
												<span className="text-[#60758a] ml-2 font-['Manrope',Helvetica]">
													{selectedMatch.attendance}
												</span>
											</div>
										)}
									</div>
								)}

								{/* Description */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Match Preview
									</h4>
									<p className="text-[#60758a] text-sm leading-relaxed font-['Manrope',Helvetica]">
										{selectedMatch.description}
									</p>
								</div>

								{/* Team Sheet */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Team Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-blue-50 rounded-lg">
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Formation:
											</span>
											<span className="text-[#60758a] ml-2 font-['Manrope',Helvetica]">
												{
													selectedMatch.teamSheet
														.formation
												}
											</span>
										</div>
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Captain:
											</span>
											<span className="text-[#60758a] ml-2 font-['Manrope',Helvetica]">
												{
													selectedMatch.teamSheet
														.captain
												}
											</span>
										</div>
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Key Players:
											</span>
											<div className="mt-1">
												{selectedMatch.teamSheet.keyPlayers.map(
													(player, index) => (
														<Badge
															key={index}
															variant="outline"
															className="text-xs mr-1 mb-1 font-['Manrope',Helvetica]"
														>
															{player}
														</Badge>
													)
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Match Objectives */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Match Objectives
									</h4>
									<ul className="space-y-1">
										{selectedMatch.objectives.map(
											(objective, index) => (
												<li
													key={index}
													className="text-[#60758a] text-sm flex items-start gap-2 font-['Manrope',Helvetica]"
												>
													<Target className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
													{objective}
												</li>
											)
										)}
									</ul>
								</div>
							</div>

							<div className="flex justify-end gap-2 pt-4">
								<Button
									variant="outline"
									onClick={() => setIsDetailsOpen(false)}
									className="font-['Manrope',Helvetica]"
								>
									Close
								</Button>
								{selectedMatch.status === "scheduled" && (
									<Button className="font-['Manrope',Helvetica] bg-[#111416] hover:bg-[#2a2d31]">
										Edit Match
									</Button>
								)}
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>

			<style jsx>{`
				.match-calendar .react-calendar {
					width: 100%;
					background: white;
					border: none;
					font-family: "Manrope", Helvetica, sans-serif;
				}

				.match-calendar .react-calendar__tile {
					max-width: 100%;
					padding: 10px 6px;
					background: none;
					text-align: center;
					line-height: 16px;
					font-size: 0.875rem;
					border: none;
					position: relative;
				}

				.match-calendar .react-calendar__tile:enabled:hover,
				.match-calendar .react-calendar__tile:enabled:focus {
					background-color: #f3f4f6;
				}

				.match-calendar .react-calendar__tile--now {
					background: #e5e7eb;
				}

				.match-calendar .react-calendar__tile--active {
					background: #3b82f6 !important;
					color: white;
				}

				.match-calendar .react-calendar__tile.has-matches {
					background-color: #dbeafe;
					font-weight: 600;
				}

				.match-calendar .react-calendar__tile.has-matches:hover {
					background-color: #bfdbfe;
				}

				.match-calendar .react-calendar__navigation button {
					color: #111418;
					min-width: 44px;
					background: none;
					font-size: 16px;
					margin-top: 8px;
					border: none;
				}

				.match-calendar
					.react-calendar__navigation
					button:enabled:hover,
				.match-calendar
					.react-calendar__navigation
					button:enabled:focus {
					background-color: #f3f4f6;
				}
			`}</style>
		</div>
	);
};
