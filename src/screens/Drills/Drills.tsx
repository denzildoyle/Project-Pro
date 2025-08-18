import React, { useState } from "react";
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
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import {
	Search,
	Users,
	Clock,
	MapPin,
	Target,
	Trophy,
	BookOpen,
	Ruler,
	Package,
	User,
	Filter,
	Plus,
} from "lucide-react";

interface Drill {
	id: number;
	title: string;
	type: "assessment" | "training";
	description: string;
	drillDesign: string;
	ageGroup: string;
	topic: string;
	equipment: string[];
	numberOfPlayers: string;
	spaceRequired: string;
	duration: string;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	coach: string;
	objectives: string[];
	instructions: string[];
	variations?: string[];
	safetyNotes?: string[];
	hasScoring?: boolean;
	scoringCriteria?: string[];
}

// Mock drill data
const drillsData: Drill[] = [
	{
		id: 1,
		title: "Cone Weaving Assessment",
		type: "assessment",
		description:
			"Players dribble through a series of cones while maintaining ball control and speed. This drill assesses technical ability, agility, and ball control under pressure.",
		drillDesign:
			"Set up 8 cones in a straight line, 2 yards apart. Players start at one end and weave through all cones.",
		ageGroup: "U15",
		topic: "Ball Control & Dribbling",
		equipment: [
			"8 Cones",
			"1 Football per player",
			"Stopwatch",
			"Clipboard for scoring",
		],
		numberOfPlayers: "1-4 players",
		spaceRequired: "20ft x 10ft",
		duration: "15 minutes",
		difficulty: "Intermediate",
		coach: "Coach Martinez",
		objectives: [
			"Assess ball control under pressure",
			"Evaluate agility and coordination",
			"Measure technical consistency",
		],
		instructions: [
			"Set up 8 cones in a straight line, 2 yards apart",
			"Player starts with ball at first cone",
			"Weave through all cones using both feet",
			"Time the drill and note any cone touches",
			"Complete 3 attempts and record best time",
		],
		variations: [
			"Use only weak foot",
			"Add time pressure",
			"Increase cone spacing for younger players",
		],
		safetyNotes: [
			"Ensure adequate space between players",
			"Check for proper footwear",
			"Warm up before attempting",
		],
		hasScoring: true,
		scoringCriteria: [
			"Time to complete (40%)",
			"Ball control (30%)",
			"Technique (20%)",
			"Cone avoidance (10%)",
		],
	},
	{
		id: 2,
		title: "Passing Accuracy Challenge",
		type: "assessment",
		description:
			"Players attempt to hit specific targets from various distances to assess passing accuracy and technique under different conditions.",
		drillDesign:
			"Set up 3 target zones at 10, 20, and 30 yards with different sized goals or markers.",
		ageGroup: "U17",
		topic: "Passing & Accuracy",
		equipment: [
			"6 Cones",
			"3 Small goals or targets",
			"10 Footballs",
			"Measuring tape",
		],
		numberOfPlayers: "1-6 players",
		spaceRequired: "40ft x 30ft",
		duration: "20 minutes",
		difficulty: "Advanced",
		coach: "Coach Thompson",
		objectives: [
			"Assess passing accuracy at different distances",
			"Evaluate technique consistency",
			"Measure decision-making under pressure",
		],
		instructions: [
			"Set up 3 target zones at increasing distances",
			"Player takes 5 shots at each target",
			"Record successful hits and technique quality",
			"Note which foot is used for each attempt",
			"Calculate accuracy percentage for each distance",
		],
		hasScoring: true,
		scoringCriteria: [
			"Short distance accuracy (25%)",
			"Medium distance accuracy (35%)",
			"Long distance accuracy (25%)",
			"Technique quality (15%)",
		],
	},
	{
		id: 3,
		title: "Small-Sided Possession Game",
		type: "training",
		description:
			"A fun and competitive small-sided game focused on maintaining possession and quick passing. Great for developing teamwork and ball retention skills.",
		drillDesign:
			"Create a 30x20 yard area with two teams of 4 players each, plus 2 neutral players who always play with the team in possession.",
		ageGroup: "U15",
		topic: "Possession & Teamwork",
		equipment: [
			"8 Cones",
			"2 Sets of bibs",
			"2 Footballs",
			"Small goals (optional)",
		],
		numberOfPlayers: "10 players",
		spaceRequired: "30ft x 20ft",
		duration: "25 minutes",
		difficulty: "Intermediate",
		coach: "Coach Williams",
		objectives: [
			"Improve ball retention under pressure",
			"Develop quick decision-making",
			"Enhance team communication",
			"Build fitness through game-like situations",
		],
		instructions: [
			"Set up playing area with cones",
			"Divide players into two teams of 4",
			"Add 2 neutral players who support possession team",
			"Team keeps possession for as long as possible",
			"Switch possession when ball goes out or is intercepted",
			"Play multiple rounds of 3-4 minutes each",
		],
		variations: [
			"Limit touches (2-touch, 1-touch)",
			"Add small goals for scoring opportunities",
			"Change field dimensions",
			"Add specific passing requirements",
		],
		safetyNotes: [
			"Ensure players wear appropriate shin guards",
			"Monitor for fatigue and rotate players",
			"Keep water available for hydration breaks",
		],
		hasScoring: false,
	},
	{
		id: 4,
		title: "Agility Ladder Footwork",
		type: "training",
		description:
			"Fundamental footwork training using agility ladders to improve coordination, speed, and agility. Essential for all field players.",
		drillDesign:
			"Use 2-3 agility ladders placed parallel to each other with different footwork patterns for each ladder.",
		ageGroup: "U13",
		topic: "Agility & Coordination",
		equipment: ["3 Agility ladders", "Cones for marking", "Whistle"],
		numberOfPlayers: "6-12 players",
		spaceRequired: "25ft x 15ft",
		duration: "20 minutes",
		difficulty: "Beginner",
		coach: "Coach Davis",
		objectives: [
			"Improve foot coordination",
			"Develop agility and quickness",
			"Build muscle memory for footwork patterns",
			"Enhance balance and body control",
		],
		instructions: [
			"Set up agility ladders in parallel lines",
			"Demonstrate each footwork pattern",
			"Players work through each ladder with different patterns",
			"Focus on quick, light steps",
			"Rest between sets to maintain quality",
			"Progress from slow to match-speed execution",
		],
		variations: [
			"Add ball control while moving through ladders",
			"Combine with passing at the end",
			"Use lateral movements",
			"Add competitive elements with timing",
		],
		safetyNotes: [
			"Ensure ladders are properly secured",
			"Check for adequate spacing between players",
			"Start slowly and build up speed gradually",
		],
		hasScoring: false,
	},
	{
		id: 5,
		title: "1v1 Defending Assessment",
		type: "assessment",
		description:
			"Individual defensive assessment where players must defend against an attacker in a confined space. Tests defensive positioning, timing, and decision-making.",
		drillDesign:
			"Create a 15x10 yard channel with a small goal at one end. Defender starts in the middle, attacker at the opposite end.",
		ageGroup: "U17",
		topic: "Defending & 1v1 Situations",
		equipment: ["6 Cones", "1 Small goal", "5 Footballs", "Stopwatch"],
		numberOfPlayers: "2-8 players",
		spaceRequired: "15ft x 10ft",
		duration: "18 minutes",
		difficulty: "Advanced",
		coach: "Coach Rodriguez",
		objectives: [
			"Assess defensive positioning",
			"Evaluate 1v1 defending technique",
			"Test decision-making under pressure",
			"Measure recovery speed and reactions",
		],
		instructions: [
			"Set up channel with goal at one end",
			"Defender starts in middle of channel",
			"Attacker begins with ball at opposite end",
			"Attacker tries to score, defender prevents goal",
			"Each player defends 5 attempts",
			"Record successful defensive actions",
		],
		hasScoring: true,
		scoringCriteria: [
			"Successful defensive actions (40%)",
			"Positioning and approach (25%)",
			"Timing of challenges (20%)",
			"Recovery and second efforts (15%)",
		],
	},
	{
		id: 6,
		title: "Shooting Technique Training",
		type: "training",
		description:
			"Comprehensive shooting practice focusing on technique, power, and accuracy from various angles and distances.",
		drillDesign:
			"Set up multiple shooting stations around the penalty area with different angles and distances to goal.",
		ageGroup: "U15",
		topic: "Shooting & Finishing",
		equipment: [
			"1 Full-size goal",
			"20 Footballs",
			"6 Cones",
			"Goalkeeper equipment",
		],
		numberOfPlayers: "8-16 players",
		spaceRequired: "Penalty area (44ft x 18ft)",
		duration: "30 minutes",
		difficulty: "Intermediate",
		coach: "Coach Martinez",
		objectives: [
			"Improve shooting technique",
			"Develop power and accuracy",
			"Practice finishing from different angles",
			"Build confidence in front of goal",
		],
		instructions: [
			"Set up 4 shooting stations around penalty area",
			"Players rotate through each station",
			"Focus on proper technique before power",
			"Include both feet in practice",
			"Goalkeeper provides realistic opposition",
			"Collect and reset balls efficiently",
		],
		variations: [
			"Add time pressure with quick shots",
			"Include volleys and half-volleys",
			"Practice with crosses from wide areas",
			"Add defensive pressure",
		],
		safetyNotes: [
			"Ensure goalkeeper has proper equipment",
			"Control ball collection to avoid injuries",
			"Maintain safe distance between shooting stations",
		],
		hasScoring: false,
	},
];

export const Drills = (): JSX.Element => {
	const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState<
		"all" | "assessment" | "training"
	>("all");
	const [filterAgeGroup, setFilterAgeGroup] = useState<string>("all");
	const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newDrill, setNewDrill] = useState<Partial<Drill>>({
		title: "",
		type: "training",
		description: "",
		drillDesign: "",
		ageGroup: "",
		topic: "",
		equipment: [],
		numberOfPlayers: "",
		spaceRequired: "",
		duration: "",
		difficulty: "Beginner",
		coach: "",
		objectives: [],
		instructions: [],
		variations: [],
		safetyNotes: [],
		hasScoring: false,
		scoringCriteria: [],
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Handle drill click
	const handleDrillClick = (drill: Drill) => {
		setSelectedDrill(drill);
		setIsDetailsOpen(true);
	};

	const handleAddDrill = () => {
		setIsAddModalOpen(true);
	};

	const handleInputChange = (field: keyof Drill, value: string | boolean) => {
		setNewDrill((prev) => ({
			...prev,
			[field]: value,
		}));

		// Clear error when user starts typing
		if (errors[field as string]) {
			setErrors((prev) => ({
				...prev,
				[field as string]: "",
			}));
		}
	};

	const handleArrayInputChange = (
		field:
			| "equipment"
			| "objectives"
			| "instructions"
			| "variations"
			| "safetyNotes"
			| "scoringCriteria",
		value: string
	) => {
		const items = value
			.split(",")
			.map((item) => item.trim())
			.filter((item) => item);
		setNewDrill((prev) => ({
			...prev,
			[field]: items,
		}));
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!newDrill.title) newErrors.title = "Title is required";
		if (!newDrill.description)
			newErrors.description = "Description is required";
		if (!newDrill.drillDesign)
			newErrors.drillDesign = "Drill design is required";
		if (!newDrill.ageGroup) newErrors.ageGroup = "Age group is required";
		if (!newDrill.topic) newErrors.topic = "Topic is required";
		if (!newDrill.numberOfPlayers)
			newErrors.numberOfPlayers = "Number of players is required";
		if (!newDrill.spaceRequired)
			newErrors.spaceRequired = "Space required is required";
		if (!newDrill.duration) newErrors.duration = "Duration is required";
		if (!newDrill.coach) newErrors.coach = "Coach is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		// Here you would typically save to backend
		console.log("New drill:", newDrill);
		alert("Drill added successfully!");

		// Reset form
		setNewDrill({
			title: "",
			type: "training",
			description: "",
			drillDesign: "",
			ageGroup: "",
			topic: "",
			equipment: [],
			numberOfPlayers: "",
			spaceRequired: "",
			duration: "",
			difficulty: "Beginner",
			coach: "",
			objectives: [],
			instructions: [],
			variations: [],
			safetyNotes: [],
			hasScoring: false,
			scoringCriteria: [],
		});
		setErrors({});
		setIsAddModalOpen(false);
	};

	// Filter drills based on search and filters
	const filteredDrills = drillsData.filter((drill) => {
		const matchesSearch =
			drill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			drill.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			drill.topic.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = filterType === "all" || drill.type === filterType;
		const matchesAgeGroup =
			filterAgeGroup === "all" || drill.ageGroup === filterAgeGroup;
		const matchesDifficulty =
			filterDifficulty === "all" || drill.difficulty === filterDifficulty;

		return (
			matchesSearch && matchesType && matchesAgeGroup && matchesDifficulty
		);
	});

	const getTypeColor = (type: string) => {
		switch (type) {
			case "assessment":
				return "bg-red-100 text-red-800";
			case "training":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Beginner":
				return "bg-green-100 text-green-800";
			case "Intermediate":
				return "bg-yellow-100 text-yellow-800";
			case "Advanced":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

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
									Coaching Drills Library
								</p>
								<p className="text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
									Comprehensive collection of training and
									assessment drills for all age groups
								</p>
							</div>
							<Button
								onClick={handleAddDrill}
								className="font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
							>
								<Plus className="w-4 h-4 mr-2" />
								Add Drill
							</Button>
						</div>

						{/* Search and Filters */}
						<div className="p-4">
							<div className="bg-white rounded-lg shadow-sm border border-[#dbe0e5] p-6">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
									{/* Search */}
									<div className="lg:col-span-2 relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#60758a] w-4 h-4" />
										<Input
											placeholder="Search drills..."
											value={searchTerm}
											onChange={(e) =>
												setSearchTerm(e.target.value)
											}
											className="pl-10 font-['Manrope',Helvetica]"
										/>
									</div>

									{/* Type Filter */}
									<Select
										value={filterType}
										onValueChange={(value: any) =>
											setFilterType(value)
										}
									>
										<SelectTrigger className="font-['Manrope',Helvetica]">
											<SelectValue placeholder="Drill Type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												value="all"
												className="font-['Manrope',Helvetica]"
											>
												All Types
											</SelectItem>
											<SelectItem
												value="assessment"
												className="font-['Manrope',Helvetica]"
											>
												Assessment
											</SelectItem>
											<SelectItem
												value="training"
												className="font-['Manrope',Helvetica]"
											>
												Training
											</SelectItem>
										</SelectContent>
									</Select>

									{/* Age Group Filter */}
									<Select
										value={filterAgeGroup}
										onValueChange={setFilterAgeGroup}
									>
										<SelectTrigger className="font-['Manrope',Helvetica]">
											<SelectValue placeholder="Age Group" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												value="all"
												className="font-['Manrope',Helvetica]"
											>
												All Ages
											</SelectItem>
											<SelectItem
												value="U13"
												className="font-['Manrope',Helvetica]"
											>
												U13
											</SelectItem>
											<SelectItem
												value="U15"
												className="font-['Manrope',Helvetica]"
											>
												U15
											</SelectItem>
											<SelectItem
												value="U17"
												className="font-['Manrope',Helvetica]"
											>
												U17
											</SelectItem>
										</SelectContent>
									</Select>

									{/* Difficulty Filter */}
									<Select
										value={filterDifficulty}
										onValueChange={setFilterDifficulty}
									>
										<SelectTrigger className="font-['Manrope',Helvetica]">
											<SelectValue placeholder="Difficulty" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												value="all"
												className="font-['Manrope',Helvetica]"
											>
												All Levels
											</SelectItem>
											<SelectItem
												value="Beginner"
												className="font-['Manrope',Helvetica]"
											>
												Beginner
											</SelectItem>
											<SelectItem
												value="Intermediate"
												className="font-['Manrope',Helvetica]"
											>
												Intermediate
											</SelectItem>
											<SelectItem
												value="Advanced"
												className="font-['Manrope',Helvetica]"
											>
												Advanced
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>

						{/* Drills Grid */}
						<div className="p-4">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredDrills.map((drill) => (
									<Card
										key={drill.id}
										onClick={() => handleDrillClick(drill)}
										className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-[#dbe0e5]"
									>
										<CardHeader className="pb-3">
											<div className="flex justify-between items-start mb-2">
												<CardTitle className="font-['Manrope',Helvetica] font-bold text-lg text-[#111418] line-clamp-2">
													{drill.title}
												</CardTitle>
												<div className="flex flex-col gap-1">
													<Badge
														variant="secondary"
														className={`text-xs ${getTypeColor(
															drill.type
														)}`}
													>
														{drill.type}
													</Badge>
													{drill.hasScoring && (
														<Badge
															variant="outline"
															className="text-xs"
														>
															<Trophy className="w-3 h-3 mr-1" />
															Scored
														</Badge>
													)}
												</div>
											</div>
											<CardDescription className="font-['Manrope',Helvetica] text-[#607589] line-clamp-3">
												{drill.description}
											</CardDescription>
										</CardHeader>
										<CardContent className="pt-0">
											<div className="space-y-3">
												{/* Key Info */}
												<div className="grid grid-cols-2 gap-2 text-sm">
													<div className="flex items-center gap-1 text-[#60758a] font-['Manrope',Helvetica]">
														<Users className="w-3 h-3" />
														{drill.ageGroup}
													</div>
													<div className="flex items-center gap-1 text-[#60758a] font-['Manrope',Helvetica]">
														<Clock className="w-3 h-3" />
														{drill.duration}
													</div>
													<div className="flex items-center gap-1 text-[#60758a] font-['Manrope',Helvetica]">
														<User className="w-3 h-3" />
														{drill.numberOfPlayers}
													</div>
													<div className="flex items-center gap-1 text-[#60758a] font-['Manrope',Helvetica]">
														<Ruler className="w-3 h-3" />
														{drill.spaceRequired}
													</div>
												</div>

												{/* Topic and Difficulty */}
												<div className="flex justify-between items-center">
													<Badge
														variant="outline"
														className="text-xs font-['Manrope',Helvetica]"
													>
														<BookOpen className="w-3 h-3 mr-1" />
														{drill.topic}
													</Badge>
													<Badge
														variant="secondary"
														className={`text-xs ${getDifficultyColor(
															drill.difficulty
														)}`}
													>
														{drill.difficulty}
													</Badge>
												</div>

												{/* Coach */}
												<div className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
													Coach: {drill.coach}
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>

							{filteredDrills.length === 0 && (
								<div className="text-center py-12">
									<p className="text-[#60758a] text-lg font-['Manrope',Helvetica]">
										No drills found matching your criteria.
									</p>
									<p className="text-[#60758a] text-sm font-['Manrope',Helvetica] mt-2">
										Try adjusting your search or filters.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Add Drill Modal */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
				<DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416]">
							Add New Drill
						</DialogTitle>
						<DialogDescription className="font-['Manrope',Helvetica] text-[#607589]">
							Create a new drill for your coaching library
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label
								htmlFor="title"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Drill Title *
							</Label>
							<Input
								id="title"
								value={newDrill.title}
								onChange={(e) =>
									handleInputChange("title", e.target.value)
								}
								placeholder="Enter drill title"
								className={`font-['Manrope',Helvetica] ${
									errors.title ? "border-red-500" : ""
								}`}
							/>
							{errors.title && (
								<p className="text-sm text-red-500">
									{errors.title}
								</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="type"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Drill Type *
								</Label>
								<Select
									value={newDrill.type}
									onValueChange={(
										value: "assessment" | "training"
									) => handleInputChange("type", value)}
								>
									<SelectTrigger className="font-['Manrope',Helvetica]">
										<SelectValue placeholder="Select drill type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="training">
											Training
										</SelectItem>
										<SelectItem value="assessment">
											Assessment
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="ageGroup"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Age Group *
								</Label>
								<Select
									value={newDrill.ageGroup}
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
								value={newDrill.description}
								onChange={(e) =>
									handleInputChange(
										"description",
										e.target.value
									)
								}
								placeholder="Describe the drill purpose and benefits"
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
								htmlFor="drillDesign"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Drill Design *
							</Label>
							<Input
								id="drillDesign"
								value={newDrill.drillDesign}
								onChange={(e) =>
									handleInputChange(
										"drillDesign",
										e.target.value
									)
								}
								placeholder="Describe the drill setup and layout"
								className={`font-['Manrope',Helvetica] ${
									errors.drillDesign ? "border-red-500" : ""
								}`}
							/>
							{errors.drillDesign && (
								<p className="text-sm text-red-500">
									{errors.drillDesign}
								</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="topic"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Topic *
								</Label>
								<Input
									id="topic"
									value={newDrill.topic}
									onChange={(e) =>
										handleInputChange(
											"topic",
											e.target.value
										)
									}
									placeholder="e.g., Ball Control & Dribbling"
									className={`font-['Manrope',Helvetica] ${
										errors.topic ? "border-red-500" : ""
									}`}
								/>
								{errors.topic && (
									<p className="text-sm text-red-500">
										{errors.topic}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="difficulty"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Difficulty *
								</Label>
								<Select
									value={newDrill.difficulty}
									onValueChange={(
										value:
											| "Beginner"
											| "Intermediate"
											| "Advanced"
									) => handleInputChange("difficulty", value)}
								>
									<SelectTrigger className="font-['Manrope',Helvetica]">
										<SelectValue placeholder="Select difficulty" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Beginner">
											Beginner
										</SelectItem>
										<SelectItem value="Intermediate">
											Intermediate
										</SelectItem>
										<SelectItem value="Advanced">
											Advanced
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label
									htmlFor="numberOfPlayers"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Number of Players *
								</Label>
								<Input
									id="numberOfPlayers"
									value={newDrill.numberOfPlayers}
									onChange={(e) =>
										handleInputChange(
											"numberOfPlayers",
											e.target.value
										)
									}
									placeholder="e.g., 1-4 players"
									className={`font-['Manrope',Helvetica] ${
										errors.numberOfPlayers
											? "border-red-500"
											: ""
									}`}
								/>
								{errors.numberOfPlayers && (
									<p className="text-sm text-red-500">
										{errors.numberOfPlayers}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="spaceRequired"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Space Required *
								</Label>
								<Input
									id="spaceRequired"
									value={newDrill.spaceRequired}
									onChange={(e) =>
										handleInputChange(
											"spaceRequired",
											e.target.value
										)
									}
									placeholder="e.g., 20ft x 10ft"
									className={`font-['Manrope',Helvetica] ${
										errors.spaceRequired
											? "border-red-500"
											: ""
									}`}
								/>
								{errors.spaceRequired && (
									<p className="text-sm text-red-500">
										{errors.spaceRequired}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="duration"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Duration *
								</Label>
								<Input
									id="duration"
									value={newDrill.duration}
									onChange={(e) =>
										handleInputChange(
											"duration",
											e.target.value
										)
									}
									placeholder="e.g., 15 minutes"
									className={`font-['Manrope',Helvetica] ${
										errors.duration ? "border-red-500" : ""
									}`}
								/>
								{errors.duration && (
									<p className="text-sm text-red-500">
										{errors.duration}
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="coach"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Coach *
							</Label>
							<Input
								id="coach"
								value={newDrill.coach}
								onChange={(e) =>
									handleInputChange("coach", e.target.value)
								}
								placeholder="Enter coach name"
								className={`font-['Manrope',Helvetica] ${
									errors.coach ? "border-red-500" : ""
								}`}
							/>
							{errors.coach && (
								<p className="text-sm text-red-500">
									{errors.coach}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="equipment"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Equipment (comma-separated)
							</Label>
							<Input
								id="equipment"
								value={newDrill.equipment?.join(", ") || ""}
								onChange={(e) =>
									handleArrayInputChange(
										"equipment",
										e.target.value
									)
								}
								placeholder="e.g., 8 Cones, 1 Football per player, Stopwatch"
								className="font-['Manrope',Helvetica]"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="objectives"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Objectives (comma-separated)
							</Label>
							<Input
								id="objectives"
								value={newDrill.objectives?.join(", ") || ""}
								onChange={(e) =>
									handleArrayInputChange(
										"objectives",
										e.target.value
									)
								}
								placeholder="e.g., Assess ball control under pressure, Evaluate agility"
								className="font-['Manrope',Helvetica]"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="instructions"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Instructions (comma-separated)
							</Label>
							<Input
								id="instructions"
								value={newDrill.instructions?.join(", ") || ""}
								onChange={(e) =>
									handleArrayInputChange(
										"instructions",
										e.target.value
									)
								}
								placeholder="e.g., Set up 8 cones in a straight line, Player starts with ball at first cone"
								className="font-['Manrope',Helvetica]"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="variations"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Variations (comma-separated)
							</Label>
							<Input
								id="variations"
								value={newDrill.variations?.join(", ") || ""}
								onChange={(e) =>
									handleArrayInputChange(
										"variations",
										e.target.value
									)
								}
								placeholder="e.g., Use only weak foot, Add time pressure"
								className="font-['Manrope',Helvetica]"
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="safetyNotes"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Safety Notes (comma-separated)
							</Label>
							<Input
								id="safetyNotes"
								value={newDrill.safetyNotes?.join(", ") || ""}
								onChange={(e) =>
									handleArrayInputChange(
										"safetyNotes",
										e.target.value
									)
								}
								placeholder="e.g., Ensure adequate space between players, Check for proper footwear"
								className="font-['Manrope',Helvetica]"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="hasScoring"
									checked={newDrill.hasScoring}
									onChange={(e) =>
										handleInputChange(
											"hasScoring",
											e.target.checked
										)
									}
									className="rounded"
								/>
								<Label
									htmlFor="hasScoring"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Has Scoring Criteria
								</Label>
							</div>
						</div>

						{newDrill.hasScoring && (
							<div className="space-y-2">
								<Label
									htmlFor="scoringCriteria"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Scoring Criteria (comma-separated)
								</Label>
								<Input
									id="scoringCriteria"
									value={
										newDrill.scoringCriteria?.join(", ") ||
										""
									}
									onChange={(e) =>
										handleArrayInputChange(
											"scoringCriteria",
											e.target.value
										)
									}
									placeholder="e.g., Time to complete (40%), Ball control (30%)"
									className="font-['Manrope',Helvetica]"
								/>
							</div>
						)}

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
								type="submit"
								className="font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
							>
								Add Drill
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Drill Details Modal */}
			<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
				<DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
					{selectedDrill && (
						<>
							<DialogHeader>
								<DialogTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
									<Target className="w-5 h-5" />
									{selectedDrill.title}
								</DialogTitle>
								<DialogDescription className="font-['Manrope',Helvetica] text-[#607589]">
									{selectedDrill.type === "assessment"
										? "Assessment Drill"
										: "Training Drill"}{" "}
									• {selectedDrill.ageGroup} •{" "}
									{selectedDrill.difficulty}
								</DialogDescription>
							</DialogHeader>

							<div className="space-y-6">
								{/* Basic Info Grid */}
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
									<div className="text-sm">
										<div className="flex items-center gap-1 text-[#60758a] mb-1">
											<Clock className="w-4 h-4" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Duration
											</span>
										</div>
										<span className="text-[#111418] font-['Manrope',Helvetica]">
											{selectedDrill.duration}
										</span>
									</div>
									<div className="text-sm">
										<div className="flex items-center gap-1 text-[#60758a] mb-1">
											<Users className="w-4 h-4" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Players
											</span>
										</div>
										<span className="text-[#111418] font-['Manrope',Helvetica]">
											{selectedDrill.numberOfPlayers}
										</span>
									</div>
									<div className="text-sm">
										<div className="flex items-center gap-1 text-[#60758a] mb-1">
											<Ruler className="w-4 h-4" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Space
											</span>
										</div>
										<span className="text-[#111418] font-['Manrope',Helvetica]">
											{selectedDrill.spaceRequired}
										</span>
									</div>
									<div className="text-sm">
										<div className="flex items-center gap-1 text-[#60758a] mb-1">
											<User className="w-4 h-4" />
											<span className="font-medium font-['Manrope',Helvetica]">
												Coach
											</span>
										</div>
										<span className="text-[#111418] font-['Manrope',Helvetica]">
											{selectedDrill.coach}
										</span>
									</div>
								</div>

								{/* Description */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Description
									</h4>
									<p className="text-[#60758a] text-sm leading-relaxed font-['Manrope',Helvetica]">
										{selectedDrill.description}
									</p>
								</div>

								{/* Drill Design */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Drill Design
									</h4>
									<p className="text-[#60758a] text-sm leading-relaxed font-['Manrope',Helvetica]">
										{selectedDrill.drillDesign}
									</p>
								</div>

								{/* Equipment */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica] flex items-center gap-2">
										<Package className="w-4 h-4" />
										Required Equipment
									</h4>
									<div className="flex flex-wrap gap-2">
										{selectedDrill.equipment.map(
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

								{/* Objectives */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Objectives
									</h4>
									<ul className="space-y-1">
										{selectedDrill.objectives.map(
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

								{/* Instructions */}
								<div>
									<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
										Instructions
									</h4>
									<ol className="space-y-2">
										{selectedDrill.instructions.map(
											(instruction, index) => (
												<li
													key={index}
													className="text-[#60758a] text-sm flex gap-3 font-['Manrope',Helvetica]"
												>
													<span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
														{index + 1}
													</span>
													{instruction}
												</li>
											)
										)}
									</ol>
								</div>

								{/* Scoring Criteria (Assessment Drills Only) */}
								{selectedDrill.hasScoring &&
									selectedDrill.scoringCriteria && (
										<div className="p-4 bg-red-50 rounded-lg">
											<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica] flex items-center gap-2">
												<Trophy className="w-4 h-4 text-red-600" />
												Scoring Criteria
											</h4>
											<ul className="space-y-1">
												{selectedDrill.scoringCriteria.map(
													(criteria, index) => (
														<li
															key={index}
															className="text-[#60758a] text-sm flex items-start gap-2 font-['Manrope',Helvetica]"
														>
															<span className="text-red-500 mt-1">
																•
															</span>
															{criteria}
														</li>
													)
												)}
											</ul>
										</div>
									)}

								{/* Variations */}
								{selectedDrill.variations &&
									selectedDrill.variations.length > 0 && (
										<div>
											<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica]">
												Variations
											</h4>
											<ul className="space-y-1">
												{selectedDrill.variations.map(
													(variation, index) => (
														<li
															key={index}
															className="text-[#60758a] text-sm flex items-start gap-2 font-['Manrope',Helvetica]"
														>
															<span className="text-green-500 mt-1">
																•
															</span>
															{variation}
														</li>
													)
												)}
											</ul>
										</div>
									)}

								{/* Safety Notes */}
								{selectedDrill.safetyNotes &&
									selectedDrill.safetyNotes.length > 0 && (
										<div className="p-4 bg-yellow-50 rounded-lg">
											<h4 className="font-semibold text-[#111418] mb-2 font-['Manrope',Helvetica] flex items-center gap-2">
												⚠️ Safety Notes
											</h4>
											<ul className="space-y-1">
												{selectedDrill.safetyNotes.map(
													(note, index) => (
														<li
															key={index}
															className="text-[#60758a] text-sm flex items-start gap-2 font-['Manrope',Helvetica]"
														>
															<span className="text-yellow-600 mt-1">
																•
															</span>
															{note}
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
								<Button className="font-['Manrope',Helvetica] bg-[#111416] hover:bg-[#2a2d31]">
									Edit Drill
								</Button>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};
