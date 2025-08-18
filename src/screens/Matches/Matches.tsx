import React, { useState } from "react";
import Calendar from "react-calendar";
import { Header } from "../../components/ui/header";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import {
	Clock,
	MapPin,
	Users,
	CalendarIcon,
	Trophy,
	Target,
	Plus,
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
	homeScore?: number;
	awayScore?: number;
	status: "scheduled" | "live" | "completed" | "cancelled" | "postponed";
	description: string;
	objectives: string[];
	teamSheet: {
		formation: string;
		captain: string;
	};
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
		},
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
		},
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
		},
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
		},
		attendance: 150,
	},
];

type CalendarValue = Date | null;

export const Matches = ({
	role = "parent",
}: {
	role?: "coach" | "parent" | "public";
}): JSX.Element => {
	const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date());
	const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newMatch, setNewMatch] = useState<Partial<Match>>({
		date: "",
		time: "",
		homeTeam: "",
		awayTeam: "",
		venue: "",
		ageGroup: "",
		competition: "",
		matchType: "",
		status: "scheduled",
		description: "",
		objectives: [],
		teamSheet: {
			formation: "",
			captain: "",
		},
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

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

	const handleAddMatch = () => {
		setIsAddModalOpen(true);
	};

	const handleInputChange = (field: string, value: string) => {
		if (field.startsWith("teamSheet.")) {
			const teamSheetField = field.split(".")[1];
			setNewMatch((prev) => ({
				...prev,
				teamSheet: {
					...prev.teamSheet!,
					[teamSheetField]: value,
				},
			}));
		} else {
			setNewMatch((prev) => ({
				...prev,
				[field]: value,
			}));
		}

		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({
				...prev,
				[field]: "",
			}));
		}
	};

	const handleArrayInputChange = (field: "objectives", value: string) => {
		const items = value
			.split(",")
			.map((item) => item.trim())
			.filter((item) => item);

		setNewMatch((prev) => ({
			...prev,
			[field]: items,
		}));
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!newMatch.date) newErrors.date = "Date is required";
		if (!newMatch.time) newErrors.time = "Time is required";
		if (!newMatch.homeTeam) newErrors.homeTeam = "Home team is required";
		if (!newMatch.awayTeam) newErrors.awayTeam = "Away team is required";
		if (!newMatch.venue) newErrors.venue = "Venue is required";
		if (!newMatch.ageGroup) newErrors.ageGroup = "Age group is required";
		if (!newMatch.competition)
			newErrors.competition = "Competition is required";
		if (!newMatch.matchType) newErrors.matchType = "Match type is required";
		if (!newMatch.description)
			newErrors.description = "Description is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = () => {
		if (!validateForm()) return;

		// Here you would typically save to backend
		console.log("New match:", newMatch);
		alert("Match added successfully!");

		// Reset form
		setNewMatch({
			date: "",
			time: "",
			homeTeam: "",
			awayTeam: "",
			venue: "",
			ageGroup: "",
			competition: "",
			matchType: "",
			status: "scheduled",
			description: "",
			objectives: [],
			teamSheet: {
				formation: "",
				captain: "",
			},
		});
		setErrors({});
		setIsAddModalOpen(false);
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
							<Button
								onClick={handleAddMatch}
								className="font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
							>
								<Plus className="w-4 h-4 mr-2" />
								Add Match
							</Button>
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

			{/* Add Match Modal */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
				<DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416]">
							Add New Match
						</DialogTitle>
						<DialogDescription className="font-['Manrope',Helvetica] text-[#607589]">
							Schedule a new match for your team
						</DialogDescription>
					</DialogHeader>

					<div onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="date"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Date *
								</Label>
								<Input
									id="date"
									type="date"
									value={newMatch.date}
									onChange={(e) =>
										handleInputChange(
											"date",
											e.target.value
										)
									}
									className={`font-['Manrope',Helvetica] ${
										errors.date ? "border-red-500" : ""
									}`}
								/>
								{errors.date && (
									<p className="text-sm text-red-500">
										{errors.date}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="time"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Time *
								</Label>
								<Input
									id="time"
									type="time"
									value={newMatch.time}
									onChange={(e) =>
										handleInputChange(
											"time",
											e.target.value
										)
									}
									className={`font-['Manrope',Helvetica] ${
										errors.time ? "border-red-500" : ""
									}`}
								/>
								{errors.time && (
									<p className="text-sm text-red-500">
										{errors.time}
									</p>
								)}
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="homeTeam"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Home Team *
								</Label>
								<Input
									id="homeTeam"
									value={newMatch.homeTeam}
									onChange={(e) =>
										handleInputChange(
											"homeTeam",
											e.target.value
										)
									}
									placeholder="Enter home team name"
									className={`font-['Manrope',Helvetica] ${
										errors.homeTeam ? "border-red-500" : ""
									}`}
								/>
								{errors.homeTeam && (
									<p className="text-sm text-red-500">
										{errors.homeTeam}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="awayTeam"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Away Team *
								</Label>
								<Input
									id="awayTeam"
									value={newMatch.awayTeam}
									onChange={(e) =>
										handleInputChange(
											"awayTeam",
											e.target.value
										)
									}
									placeholder="Enter away team name"
									className={`font-['Manrope',Helvetica] ${
										errors.awayTeam ? "border-red-500" : ""
									}`}
								/>
								{errors.awayTeam && (
									<p className="text-sm text-red-500">
										{errors.awayTeam}
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="venue"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Venue *
							</Label>
							<Input
								id="venue"
								value={newMatch.venue}
								onChange={(e) =>
									handleInputChange("venue", e.target.value)
								}
								placeholder="Enter match venue"
								className={`font-['Manrope',Helvetica] ${
									errors.venue ? "border-red-500" : ""
								}`}
							/>
							{errors.venue && (
								<p className="text-sm text-red-500">
									{errors.venue}
								</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="ageGroup"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Age Group *
								</Label>
								<Select
									value={newMatch.ageGroup}
									onValueChange={(value) =>
										handleInputChange("ageGroup", value)
									}
								>
									<SelectTrigger
										className={`font-['Manrope',Helvetica] ${
											errors.ageGroup
												? "border-red-500"
												: ""
										}`}
									>
										<SelectValue placeholder="Select age group" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="U13">U13</SelectItem>
										<SelectItem value="U15">U15</SelectItem>
										<SelectItem value="U17">U17</SelectItem>
									</SelectContent>
								</Select>
								{errors.ageGroup && (
									<p className="text-sm text-red-500">
										{errors.ageGroup}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="competition"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Competition *
								</Label>
								<Input
									id="competition"
									value={newMatch.competition}
									onChange={(e) =>
										handleInputChange(
											"competition",
											e.target.value
										)
									}
									placeholder="e.g., Youth League, Cup Competition"
									className={`font-['Manrope',Helvetica] ${
										errors.competition
											? "border-red-500"
											: ""
									}`}
								/>
								{errors.competition && (
									<p className="text-sm text-red-500">
										{errors.competition}
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="matchType"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Match Type *
							</Label>
							<Select
								value={newMatch.matchType}
								onValueChange={(value) =>
									handleInputChange("matchType", value)
								}
							>
								<SelectTrigger
									className={`font-['Manrope',Helvetica] ${
										errors.matchType ? "border-red-500" : ""
									}`}
								>
									<SelectValue placeholder="Select match type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="League Match">
										League Match
									</SelectItem>
									<SelectItem value="Cup Match">
										Cup Match
									</SelectItem>
									<SelectItem value="Friendly Match">
										Friendly Match
									</SelectItem>
									<SelectItem value="Tournament">
										Tournament
									</SelectItem>
								</SelectContent>
							</Select>
							{errors.matchType && (
								<p className="text-sm text-red-500">
									{errors.matchType}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="description"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Description *
							</Label>
							<Input
								id="description"
								value={newMatch.description}
								onChange={(e) =>
									handleInputChange(
										"description",
										e.target.value
									)
								}
								placeholder="Describe the match importance and context"
								className={`font-['Manrope',Helvetica] ${
									errors.description ? "border-red-500" : ""
								}`}
							/>
							{errors.description && (
								<p className="text-sm text-red-500">
									{errors.description}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="objectives"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Match Objectives (comma-separated)
							</Label>
							<Input
								id="objectives"
								value={newMatch.objectives?.join(", ") || ""}
								onChange={(e) =>
									handleArrayInputChange(
										"objectives",
										e.target.value
									)
								}
								placeholder="e.g., Control possession, Keep clean sheet"
								className="font-['Manrope',Helvetica]"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="formation"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Formation
								</Label>
								<Input
									id="formation"
									value={newMatch.teamSheet?.formation || ""}
									onChange={(e) =>
										handleInputChange(
											"teamSheet.formation",
											e.target.value
										)
									}
									placeholder="e.g., 4-3-3"
									className="font-['Manrope',Helvetica]"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="captain"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Captain
								</Label>
								<Input
									id="captain"
									value={newMatch.teamSheet?.captain || ""}
									onChange={(e) =>
										handleInputChange(
											"teamSheet.captain",
											e.target.value
										)
									}
									placeholder="Enter captain name"
									className="font-['Manrope',Helvetica]"
								/>
							</div>
						</div>

						<DialogFooter className="gap-2 sm:gap-0">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsAddModalOpen(false)}
								className="font-['Manrope',Helvetica] font-medium"
							>
								Cancel
							</Button>
							<Button
								type="button"
								onClick={handleSubmit}
								className="font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
							>
								Add Match
							</Button>
						</DialogFooter>
					</div>
				</DialogContent>
			</Dialog>

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

								{/* Attendance (if available) */}
								{selectedMatch.attendance && (
									<div className="p-3 bg-gray-50 rounded-lg">
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Attendance:
											</span>
											<span className="text-[#60758a] ml-2 font-['Manrope',Helvetica]">
												{selectedMatch.attendance}
											</span>
										</div>
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
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-blue-50 rounded-lg">
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
									</div>
								</div>

								{/* Match Objectives */}
								{role === "coach" && (
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
								)}
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
