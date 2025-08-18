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
	Target,
} from "lucide-react";
import "react-calendar/dist/Calendar.css";

interface TrainingSession {
	id: number;
	date: string;
	time: string;
	location: string;
	ageGroup: string;
	coach: string;
	type: string;
	duration: string;
	description: string;
	equipment: string[];
	objectives: string[];
	plan: string; //TO DO: link to google drive
	status: "scheduled" | "completed" | "cancelled";
}

// Mock training data
const trainingData: TrainingSession[] = [
	{
		id: 1,
		date: "2025-08-15",
		time: "16:00",
		location: "Main Training Ground A",
		ageGroup: "U15",
		coach: "Coach Martinez",
		type: "Technical Skills",
		duration: "90 minutes",
		description:
			"Focus on ball control, passing accuracy, and first touch techniques. Players will work on individual skills before progressing to small-sided games.",
		equipment: ["Cones", "Training balls", "Agility ladders", "Goals"],
		objectives: [
			"Improve first touch under pressure",
			"Enhance passing accuracy over various distances",
			"Develop ball control in tight spaces",
		],
		plan: "Players will engage in a series of drills focusing on the key objectives, followed by small-sided games to apply their skills in a match-like environment.",
		status: "scheduled",
	},
	{
		id: 2,
		date: "2025-08-16",
		time: "18:00",
		location: "Indoor Training Facility",
		ageGroup: "U17",
		coach: "Coach Thompson",
		type: "Tactical Training",
		duration: "120 minutes",
		description:
			"Advanced tactical session focusing on formation play, pressing triggers, and transition phases. Video analysis will be included.",
		equipment: [
			"Tactical boards",
			"Video equipment",
			"Bibs",
			"Training balls",
		],
		objectives: [
			"Master 4-3-3 formation positioning",
			"Understand pressing triggers",
			"Improve transition from defense to attack",
		],
		plan: "The session will start with a video analysis of previous matches, followed by tactical drills focusing on the objectives. The session will conclude with a controlled scrimmage to apply learned tactics.",
		status: "scheduled",
	},
	{
		id: 3,
		date: "2025-08-17",
		time: "15:30",
		location: "Training Ground B",
		ageGroup: "U13",
		coach: "Coach Williams",
		type: "Physical Conditioning",
		duration: "75 minutes",
		description:
			"Age-appropriate fitness session combining fun activities with conditioning exercises. Focus on agility, coordination, and basic strength.",
		equipment: [
			"Agility cones",
			"Resistance bands",
			"Medicine balls",
			"Hurdles",
		],
		objectives: [
			"Develop basic agility and coordination",
			"Build cardiovascular endurance",
			"Introduce proper movement patterns",
		],
		plan: "The session will include a variety of fun games and activities designed to improve fitness while keeping players engaged.",
		status: "scheduled",
	},
	{
		id: 4,
		date: "2025-08-18",
		time: "17:00",
		location: "Main Training Ground A",
		ageGroup: "U15",
		coach: "Coach Davis",
		type: "Match Preparation",
		duration: "105 minutes",
		description:
			"Pre-match training session with set-piece practice, tactical review, and light scrimmage. Focus on match readiness and team cohesion.",
		equipment: [
			"Full-size goals",
			"Training balls",
			"Bibs",
			"Corner flags",
		],
		objectives: [
			"Perfect set-piece routines",
			"Review opponent analysis",
			"Build match confidence",
		],
		plan: "The session will focus on refining set-piece routines and reviewing opponent analysis. A light scrimmage will be included to build team cohesion.",
		status: "scheduled",
	},
	{
		id: 5,
		date: "2025-08-20",
		time: "16:30",
		location: "Training Ground C",
		ageGroup: "U17",
		coach: "Coach Rodriguez",
		type: "Recovery Session",
		duration: "60 minutes",
		description:
			"Light recovery session focusing on stretching, mobility work, and low-intensity ball work. Perfect for post-match recovery.",
		equipment: ["Yoga mats", "Foam rollers", "Light training balls"],
		objectives: [
			"Promote muscle recovery",
			"Maintain ball touch",
			"Prevent injury through mobility work",
		],
		plan: "The session will include a series of stretching and mobility exercises, followed by light ball work to maintain touch without exerting too much energy.",
		status: "completed",
	},
];

type CalendarValue = Date | null;

export const Training = ({
	role = "parent",
}: {
	role?: "coach" | "parent" | "public";
}): JSX.Element => {
	const [selectedDate, setSelectedDate] = useState<CalendarValue>(new Date());
	const [selectedTraining, setSelectedTraining] =
		useState<TrainingSession | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	// Get training sessions for a specific date
	const getTrainingForDate = (date: Date): TrainingSession[] => {
		const dateString = date.toISOString().split("T")[0];
		return trainingData.filter((training) => training.date === dateString);
	};

	// Check if a date has training sessions
	const hasTraining = (date: Date): boolean => {
		const dateString = date.toISOString().split("T")[0];
		return trainingData.some((training) => training.date === dateString);
	};

	// Handle date click
	const handleDateClick = (date: Date) => {
		setSelectedDate(date);
		const trainingSessions = getTrainingForDate(date);
		if (trainingSessions.length > 0) {
			setSelectedTraining(trainingSessions[0]); // Show first session if multiple
			setIsDetailsOpen(true);
		}
	};

	// Handle training session click
	const handleTrainingClick = (training: TrainingSession) => {
		setSelectedTraining(training);
		setIsDetailsOpen(true);
	};

	// Custom tile content for calendar
	const tileContent = ({ date }: { date: Date }) => {
		if (hasTraining(date)) {
			const sessions = getTrainingForDate(date);
			return (
				<div className="flex justify-center mt-1">
					<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
				</div>
			);
		}
		return null;
	};

	// Custom tile class name
	const tileClassName = ({ date }: { date: Date }) => {
		if (hasTraining(date)) {
			return "has-training";
		}
		return "";
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "scheduled":
				return "bg-blue-100 text-blue-800";
			case "completed":
				return "bg-green-100 text-green-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const selectedDateSessions = selectedDate
		? getTrainingForDate(selectedDate)
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
									Training Schedule
								</p>
								<p className="text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
									View and manage training sessions across all
									age groups
								</p>
							</div>
						</div>

						{/* Calendar and Sessions Layout */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
							{/* Calendar Section */}
							<div className="lg:col-span-2">
								<div className="bg-white rounded-lg shadow-sm border border-[#dbe0e5] p-6">
									<h3 className="text-lg font-semibold text-[#111418] mb-4 font-['Manrope',Helvetica]">
										Training Calendar
									</h3>
									<div className="training-calendar">
										<Calendar
											onChange={setSelectedDate}
											value={selectedDate}
											onClickDay={handleDateClick}
											tileContent={tileContent}
											tileClassName={tileClassName}
											className="w-full border-none"
										/>
									</div>
								</div>
							</div>

							{/* Sessions List */}
							<div className="lg:col-span-1">
								<div className="bg-white rounded-lg shadow-sm border border-[#dbe0e5] p-6">
									<h3 className="text-lg font-semibold text-[#111418] mb-4 font-['Manrope',Helvetica]">
										{selectedDate
											? `Sessions for ${selectedDate.toLocaleDateString()}`
											: "Select a Date"}
									</h3>

									{selectedDateSessions.length > 0 ? (
										<div className="space-y-3">
											{selectedDateSessions.map(
												(session) => (
													<div
														key={session.id}
														onClick={() =>
															handleTrainingClick(
																session
															)
														}
														className="p-3 border border-[#e5e8ea] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
													>
														<div className="flex justify-between items-start mb-2">
															<h4 className="font-medium text-[#111418] text-sm font-['Manrope',Helvetica]">
																{session.type}
															</h4>
															<Badge
																variant="secondary"
																className={`text-xs ${getStatusColor(
																	session.status
																)}`}
															>
																{session.status}
															</Badge>
														</div>
														<div className="space-y-1 text-xs text-[#60758a] font-['Manrope',Helvetica]">
															<div className="flex items-center gap-1">
																<Clock className="w-3 h-3" />
																{session.time}
															</div>
															<div className="flex items-center gap-1">
																<Users className="w-3 h-3" />
																{
																	session.ageGroup
																}
															</div>
															<div className="flex items-center gap-1">
																<MapPin className="w-3 h-3" />
																{
																	session.location
																}
															</div>
														</div>
													</div>
												)
											)}
										</div>
									) : (
										<p className="text-[#60758a] text-sm font-['Manrope',Helvetica]">
											No training sessions scheduled for
											this date.
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Upcoming Sessions */}
						<div className="p-4">
							<div className="bg-white rounded-lg shadow-sm border border-[#dbe0e5] p-6">
								<h3 className="text-lg font-semibold text-[#111418] mb-4 font-['Manrope',Helvetica]">
									Upcoming Training Sessions
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{trainingData
										.filter(
											(session) =>
												session.status === "scheduled"
										)
										.slice(0, 6)
										.map((session) => (
											<div
												key={session.id}
												onClick={() =>
													handleTrainingClick(session)
												}
												className="p-4 border border-[#e5e8ea] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
											>
												<div className="flex justify-between items-start mb-3">
													<h4 className="font-medium text-[#111418] font-['Manrope',Helvetica]">
														{session.type}
													</h4>
													<Badge
														variant="secondary"
														className="text-xs"
													>
														{session.ageGroup}
													</Badge>
												</div>
												<div className="space-y-2 text-sm text-[#60758a] font-['Manrope',Helvetica]">
													<div className="flex items-center gap-2">
														<CalendarIcon className="w-4 h-4" />
														{new Date(
															session.date
														).toLocaleDateString()}
													</div>
													<div className="flex items-center gap-2">
														<Clock className="w-4 h-4" />
														{session.time} (
														{session.duration})
													</div>
													<div className="flex items-center gap-2">
														<MapPin className="w-4 h-4" />
														{session.location}
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

			{/* Training Details Modal */}
			<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
				<DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
					{selectedTraining && (
						<>
							<DialogHeader>
								<DialogTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
									<Target className="w-5 h-5" />
									{selectedTraining.type}
								</DialogTitle>
								<DialogDescription className="font-['Manrope',Helvetica] text-[#607589]">
									{new Date(
										selectedTraining.date
									).toLocaleDateString()}{" "}
									at {selectedTraining.time}
								</DialogDescription>
							</DialogHeader>

							<div className="space-y-6">
								{/* Basic Info */}
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-3">
										<div className="flex items-center gap-2 text-sm">
											<Clock className="w-4 h-4 text-[#60758a]" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Duration:
											</span>
											<span className="text-[#60758a] font-['Manrope',Helvetica]">
												{selectedTraining.duration}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<MapPin className="w-4 h-4 text-[#60758a]" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Location:
											</span>
											<span className="text-[#60758a] font-['Manrope',Helvetica]">
												{selectedTraining.location}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<Users className="w-4 h-4 text-[#60758a]" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Age Group:
											</span>
											<span className="text-[#60758a] font-['Manrope',Helvetica]">
												{selectedTraining.ageGroup}
											</span>
										</div>
									</div>
									<div className="space-y-3">
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Coach:
											</span>
											<span className="text-[#60758a] ml-2 font-['Manrope',Helvetica]">
												{selectedTraining.coach}
											</span>
										</div>
										<div className="text-sm">
											<span className="font-medium font-['Manrope',Helvetica]">
												Status:
											</span>
											<Badge
												variant="secondary"
												className={`ml-2 text-xs ${getStatusColor(
													selectedTraining.status
												)}`}
											>
												{selectedTraining.status}
											</Badge>
										</div>
									</div>
								</div>

								{/* Description */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Description
									</h4>
									<p className="text-[#60758a] text-sm leading-relaxed font-['Manrope',Helvetica]">
										{selectedTraining.description}
									</p>
								</div>

								{/* Objectives */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Training Objectives
									</h4>

									<ul className="space-y-1">
										{selectedTraining.objectives.map(
											(objective, index) => (
												<li
													key={index}
													className="text-[#60758a] text-sm flex items-start gap-2 font-['Manrope',Helvetica]"
												>
													<span className="text-blue-500 mt-1">
														•
													</span>
													{objective}
												</li>
											)
										)}
									</ul>
								</div>

								{/* Plan */}
								{role === "coach" && (
									<div>
										<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
											Training Plan
										</h4>
										<p className="text-[#60758a] text-sm flex items-start gap-2 font-['Manrope',Helvetica]">
											{selectedTraining.plan}
										</p>
									</div>
								)}

								{/* Equipment */}

								{role === "coach" && (
									<div>
										<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
											Required Equipment
										</h4>
										<div className="flex flex-wrap gap-2">
											{selectedTraining.equipment.map(
												(item, index) => (
													<Badge
														key={index}
														variant="outline"
														className="text-xs font-['Manrope',Helvetica]"
													>
														{item}
													</Badge>
												)
											)}
										</div>
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
								{selectedTraining.status === "scheduled" && (
									<Button className="font-['Manrope',Helvetica] bg-[#111416] hover:bg-[#2a2d31]">
										Edit Session
									</Button>
								)}
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>

			<style jsx>{`
				.training-calendar .react-calendar {
					width: 100%;
					background: white;
					border: none;
					font-family: "Manrope", Helvetica, sans-serif;
				}

				.training-calendar .react-calendar__tile {
					max-width: 100%;
					padding: 10px 6px;
					background: none;
					text-align: center;
					line-height: 16px;
					font-size: 0.875rem;
					border: none;
					position: relative;
				}

				.training-calendar .react-calendar__tile:enabled:hover,
				.training-calendar .react-calendar__tile:enabled:focus {
					background-color: #f3f4f6;
				}

				.training-calendar .react-calendar__tile--now {
					background: #e5e7eb;
				}

				.training-calendar .react-calendar__tile--active {
					background: #3b82f6 !important;
					color: white;
				}

				.training-calendar .react-calendar__tile.has-training {
					background-color: #dbeafe;
					font-weight: 600;
				}

				.training-calendar .react-calendar__tile.has-training:hover {
					background-color: #bfdbfe;
				}

				.training-calendar .react-calendar__navigation button {
					color: #111418;
					min-width: 44px;
					background: none;
					font-size: 16px;
					margin-top: 8px;
					border: none;
				}

				.training-calendar
					.react-calendar__navigation
					button:enabled:hover,
				.training-calendar
					.react-calendar__navigation
					button:enabled:focus {
					background-color: #f3f4f6;
				}
			`}</style>
		</div>
	);
};
