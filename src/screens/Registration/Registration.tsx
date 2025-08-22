//Multi-player registration with dynamic form creation
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import {
	ChevronLeft,
	ChevronRight,
	User,
	Heart,
	Phone,
	Trophy,
	Shirt,
	Users,
} from "lucide-react";

interface PlayerFormData {
	playerName: string;
	playerDateOfBirth: string;
	playerPhoto: string;
	playerCity: string;
	playerSchool: string;
	playerCountry: string;
	playerPosition: string;
	playerStrongFoot: string;
	playerSportHistory: string;
	preferredLocation: string;
	hobbiesInterests: string;
	ailmentsAllergies: string;
	tshirtSize: string;
	emergencyContactName: string;
	emergencyContactNumber: string;
}

interface RegistrationFormData {
	// Parent information
	parentName: string;
	parentEmail: string;
	parentPassword: string;
	confirmPassword: string;
	numberOfPlayers: number;

	// Multiple players
	players: PlayerFormData[];
}

const createEmptyPlayer = (): PlayerFormData => ({
	playerName: "",
	playerDateOfBirth: "",
	playerPhoto: "",
	playerCity: "",
	playerSchool: "",
	playerCountry: "",
	playerPosition: "",
	playerStrongFoot: "",
	playerSportHistory: "",
	preferredLocation: "",
	hobbiesInterests: "",
	ailmentsAllergies: "",
	tshirtSize: "",
	emergencyContactName: "",
	emergencyContactNumber: "",
});

const copyPlayerData = (
	sourcePlayer: PlayerFormData,
	fieldsToExclude: (keyof PlayerFormData)[] = []
): PlayerFormData => {
	const newPlayer = { ...sourcePlayer };
	fieldsToExclude.forEach((field) => {
		newPlayer[field] = "";
	});
	return newPlayer;
};

// Dynamic step generation based on number of players
const generateSteps = (numberOfPlayers: number) => {
	const steps = [
		{ id: 1, title: "Parent Info", icon: User },
		{ id: 2, title: "Number of Players", icon: Users },
	];

	for (let i = 1; i <= numberOfPlayers; i++) {
		steps.push(
			{ id: steps.length + 1, title: `Player ${i} Basics`, icon: Shirt },
			{ id: steps.length + 2, title: `Player ${i} Sports`, icon: Trophy },
			{
				id: steps.length + 3,
				title: `Player ${i} Personal`,
				icon: Heart,
			},
			{
				id: steps.length + 4,
				title: `Player ${i} Emergency`,
				icon: Phone,
			}
		);
	}

	return steps;
};

export const Registration = (): JSX.Element => {
	const [currentStep, setCurrentStep] = useState(1);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
	const [formData, setFormData] = useState<RegistrationFormData>({
		parentName: "",
		parentEmail: "",
		parentPassword: "",
		confirmPassword: "",
		numberOfPlayers: 1,
		players: [createEmptyPlayer()],
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const STEPS = generateSteps(formData.numberOfPlayers);

	const positions = [
		"Goalkeeper",
		"Defender",
		"Midfielder",
		"Forward",
		"Center Back",
		"Full Back",
		"Wing Back",
		"Defensive Midfielder",
		"Central Midfielder",
		"Attacking Midfielder",
		"Winger",
		"Striker",
	];

	const countries = [
		"Trinidad and Tobago",
		"United States",
		"Canada",
		"United Kingdom",
		"Brazil",
		"Argentina",
		"Germany",
		"France",
		"Spain",
		"Italy",
		"Netherlands",
		"Portugal",
		"Mexico",
		"Jamaica",
		"Barbados",
		"Guyana",
		"Suriname",
	];

	const strongFootOptions = ["Left", "Right", "Both"];
	const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];
	const preferredLocations = [
		"Nelson Mandela Park Port of Spain",
		"Stalagnite Park Cunupia",
	];

	const handleParentInputChange = (
		field: keyof Omit<RegistrationFormData, "players">,
		value: string | number
	) => {
		if (field === "numberOfPlayers") {
			const numPlayers =
				typeof value === "string" ? parseInt(value, 10) : value;
			const currentPlayers = formData.players;
			const newPlayers = [...currentPlayers];

			if (numPlayers > currentPlayers.length) {
				// Add new players, copying data from the first player (excluding personal identifiers)
				const sourcePlayer =
					currentPlayers.length > 0
						? currentPlayers[0]
						: createEmptyPlayer();
				const fieldsToExclude: (keyof PlayerFormData)[] = [
					"playerName",
					"playerDateOfBirth",
					"playerPhoto",
				];

				for (let i = currentPlayers.length; i < numPlayers; i++) {
					if (currentPlayers.length > 0) {
						// Copy from first player, but exclude personal info
						const newPlayer = copyPlayerData(
							sourcePlayer,
							fieldsToExclude
						);
						newPlayers.push(newPlayer);
					} else {
						newPlayers.push(createEmptyPlayer());
					}
				}
			} else if (numPlayers < currentPlayers.length) {
				// Remove excess players
				newPlayers.splice(numPlayers);
			}

			setFormData((prev) => ({
				...prev,
				[field]: numPlayers,
				players: newPlayers,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[field]: value,
			}));
		}

		// Clear error when user starts typing
		if (errors[field as string]) {
			setErrors((prev) => ({
				...prev,
				[field as string]: "",
			}));
		}
	};

	const handlePlayerInputChange = (
		playerIndex: number,
		field: keyof PlayerFormData,
		value: string
	) => {
		setFormData((prev) => {
			const newPlayers = [...prev.players];
			newPlayers[playerIndex] = {
				...newPlayers[playerIndex],
				[field]: value,
			};

			// If this is the first player and we have multiple players, update subsequent players
			// with non-personal information
			if (playerIndex === 0 && prev.numberOfPlayers > 1) {
				const fieldsToSync: (keyof PlayerFormData)[] = [
					"playerCity",
					"playerSchool",
					"playerCountry",
					"playerPosition",
					"playerStrongFoot",
					"playerSportHistory",
					"preferredLocation",
					"hobbiesInterests",
					"ailmentsAllergies",
					"tshirtSize",
					"emergencyContactName",
					"emergencyContactNumber",
				];

				// Only sync if this field should be synced and other players don't have this field filled
				if (fieldsToSync.includes(field)) {
					for (let i = 1; i < newPlayers.length; i++) {
						// Only update if the field is empty in the target player
						if (!newPlayers[i][field]) {
							newPlayers[i] = {
								...newPlayers[i],
								[field]: value,
							};
						}
					}
				}
			}

			return {
				...prev,
				players: newPlayers,
			};
		});

		// Clear error when user starts typing
		const errorKey = `player${playerIndex}_${field}`;
		if (errors[errorKey]) {
			setErrors((prev) => ({
				...prev,
				[errorKey]: "",
			}));
		}
	};

	const getCurrentPlayerFromStep = (step: number): number => {
		if (step <= 2) return 0; // Parent info and number of players steps

		// Each player has 4 steps (basics, sports, personal, emergency)
		const playerStepOffset = step - 3; // Steps after parent info and number selection
		return Math.floor(playerStepOffset / 4);
	};

	const getCurrentPlayerStepType = (
		step: number
	): "basics" | "sports" | "personal" | "emergency" => {
		if (step <= 2) return "basics";

		const playerStepOffset = step - 3;
		const stepInPlayerSequence = playerStepOffset % 4;

		switch (stepInPlayerSequence) {
			case 0:
				return "basics";
			case 1:
				return "sports";
			case 2:
				return "personal";
			case 3:
				return "emergency";
			default:
				return "basics";
		}
	};

	const validateStep = (step: number): boolean => {
		const newErrors: Record<string, string> = {};

		switch (step) {
			case 1: // Parent Info
				if (!formData.parentName.trim()) {
					newErrors.parentName = "Parent name is required";
				}
				if (!formData.parentEmail.trim()) {
					newErrors.parentEmail = "Parent email is required";
				} else if (
					!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)
				) {
					newErrors.parentEmail =
						"Please enter a valid email address";
				}
				if (!formData.parentPassword) {
					newErrors.parentPassword = "Password is required";
				} else if (formData.parentPassword.length < 8) {
					newErrors.parentPassword =
						"Password must be at least 8 characters";
				}
				if (formData.parentPassword !== formData.confirmPassword) {
					newErrors.confirmPassword = "Passwords do not match";
				}
				break;

			case 2: // Number of Players
				if (
					formData.numberOfPlayers < 1 ||
					formData.numberOfPlayers > 10
				) {
					newErrors.numberOfPlayers =
						"Number of players must be between 1 and 10";
				}
				break;

			default:
				// Player-specific validation
				const playerIndex = getCurrentPlayerFromStep(step);
				const stepType = getCurrentPlayerStepType(step);
				const player = formData.players[playerIndex];

				if (stepType === "basics") {
					if (!player.playerName.trim()) {
						newErrors[`player${playerIndex}_playerName`] =
							"Player name is required";
					}
					if (!player.playerDateOfBirth) {
						newErrors[`player${playerIndex}_playerDateOfBirth`] =
							"Player date of birth is required";
					} else {
						const birthDate = new Date(player.playerDateOfBirth);
						const today = new Date();
						const age =
							today.getFullYear() - birthDate.getFullYear();
						if (age < 5 || age > 25) {
							newErrors[
								`player${playerIndex}_playerDateOfBirth`
							] = "Player must be between 5 and 25 years old";
						}
					}
					if (!player.playerCity.trim()) {
						newErrors[`player${playerIndex}_playerCity`] =
							"Player city is required";
					}
					if (!player.playerSchool.trim()) {
						newErrors[`player${playerIndex}_playerSchool`] =
							"Player school is required";
					}
					if (!player.playerCountry) {
						newErrors[`player${playerIndex}_playerCountry`] =
							"Player country is required";
					}
				} else if (stepType === "sports") {
					if (!player.playerStrongFoot) {
						newErrors[`player${playerIndex}_playerStrongFoot`] =
							"Strong foot is required";
					}
					if (!player.preferredLocation) {
						newErrors[`player${playerIndex}_preferredLocation`] =
							"Preferred location is required";
					}
				} else if (stepType === "personal") {
					if (!player.tshirtSize) {
						newErrors[`player${playerIndex}_tshirtSize`] =
							"T-shirt size is required";
					}
				} else if (stepType === "emergency") {
					if (!player.emergencyContactName.trim()) {
						newErrors[`player${playerIndex}_emergencyContactName`] =
							"Emergency contact name is required";
					}
					if (!player.emergencyContactNumber.trim()) {
						newErrors[
							`player${playerIndex}_emergencyContactNumber`
						] = "Emergency contact number is required";
					} else if (
						!/^\+?[\d\s\-\(\)]+$/.test(
							player.emergencyContactNumber
						)
					) {
						newErrors[
							`player${playerIndex}_emergencyContactNumber`
						] = "Please enter a valid phone number";
					}
				}
				break;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNext = () => {
		if (validateStep(currentStep)) {
			setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
			// Update current player index based on the new step
			const newPlayerIndex = getCurrentPlayerFromStep(currentStep + 1);
			setCurrentPlayerIndex(newPlayerIndex);
		}
	};

	const handlePrevious = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1));
		// Update current player index based on the new step
		const newPlayerIndex = getCurrentPlayerFromStep(currentStep - 1);
		setCurrentPlayerIndex(newPlayerIndex);
	};

	const handleSubmit = async () => {
		if (!validateStep(currentStep)) {
			return;
		}

		setIsSubmitting(true);

		try {
			console.log("Registration data:", formData);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			alert(
				`Registration successful! Welcome to Project Pro! ${formData.numberOfPlayers} player(s) registered.`
			);
		} catch (error) {
			console.error("Registration error:", error);
			alert("Registration failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<User className="h-5 w-5" />
								Parent Information
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Please provide your details as the
								parent/guardian
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="parentName"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Parent Name *
								</Label>
								<Input
									id="parentName"
									type="text"
									value={formData.parentName}
									onChange={(e) =>
										handleParentInputChange(
											"parentName",
											e.target.value
										)
									}
									placeholder="Enter your full name"
									className={`font-['Manrope',Helvetica] ${
										errors.parentName
											? "border-red-500"
											: ""
									}`}
								/>
								{errors.parentName && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.parentName}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="parentEmail"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Parent Email *
								</Label>
								<Input
									id="parentEmail"
									type="email"
									value={formData.parentEmail}
									onChange={(e) =>
										handleParentInputChange(
											"parentEmail",
											e.target.value
										)
									}
									placeholder="Enter your email address"
									className={`font-['Manrope',Helvetica] ${
										errors.parentEmail
											? "border-red-500"
											: ""
									}`}
								/>
								{errors.parentEmail && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.parentEmail}
									</p>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label
										htmlFor="parentPassword"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Password *
									</Label>
									<Input
										id="parentPassword"
										type="password"
										value={formData.parentPassword}
										onChange={(e) =>
											handleParentInputChange(
												"parentPassword",
												e.target.value
											)
										}
										placeholder="Create a password"
										className={`font-['Manrope',Helvetica] ${
											errors.parentPassword
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.parentPassword && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.parentPassword}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="confirmPassword"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Confirm Password *
									</Label>
									<Input
										id="confirmPassword"
										type="password"
										value={formData.confirmPassword}
										onChange={(e) =>
											handleParentInputChange(
												"confirmPassword",
												e.target.value
											)
										}
										placeholder="Confirm your password"
										className={`font-['Manrope',Helvetica] ${
											errors.confirmPassword
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.confirmPassword && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.confirmPassword}
										</p>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				);

			case 2:
				return (
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<Users className="h-5 w-5" />
								Number of Players
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								How many players would you like to register?
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="numberOfPlayers"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Number of Players *
								</Label>
								<Select
									value={formData.numberOfPlayers.toString()}
									onValueChange={(value) =>
										handleParentInputChange(
											"numberOfPlayers",
											parseInt(value, 10)
										)
									}
								>
									<SelectTrigger
										className={`font-['Manrope',Helvetica] ${
											errors.numberOfPlayers
												? "border-red-500"
												: ""
										}`}
									>
										<SelectValue placeholder="Select number of players" />
									</SelectTrigger>
									<SelectContent>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
											(num) => (
												<SelectItem
													key={num}
													value={num.toString()}
													className="font-['Manrope',Helvetica]"
												>
													{num}{" "}
													{num === 1
														? "Player"
														: "Players"}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								{errors.numberOfPlayers && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.numberOfPlayers}
									</p>
								)}
								<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
									You can register up to 10 players at once.
									When you fill out information for the first
									player, shared details (like school, city,
									sports preferences) will automatically be
									copied to subsequent players to save time.
								</p>
							</div>
						</CardContent>
					</Card>
				);

			default:
				// Player-specific steps
				const playerIndex = getCurrentPlayerFromStep(currentStep);
				const stepType = getCurrentPlayerStepType(currentStep);
				const player = formData.players[playerIndex];
				const playerNumber = playerIndex + 1;

				if (stepType === "basics") {
					return (
						<Card>
							<CardHeader>
								<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
									<Shirt className="h-5 w-5" />
									Player {playerNumber} - Basic Information
								</CardTitle>
								<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
									Basic details about player {playerNumber}
									{playerIndex > 0 && (
										<span className="block mt-1 text-blue-600">
											Some information has been copied
											from Player 1. Please update as
											needed for this player.
										</span>
									)}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label
											htmlFor={`playerName${playerIndex}`}
											className="font-['Manrope',Helvetica] font-medium text-[#111416]"
										>
											Player Name *
										</Label>
										<Input
											id={`playerName${playerIndex}`}
											type="text"
											value={player.playerName}
											onChange={(e) =>
												handlePlayerInputChange(
													playerIndex,
													"playerName",
													e.target.value
												)
											}
											placeholder="Enter player's full name"
											className={`font-['Manrope',Helvetica] ${
												errors[
													`player${playerIndex}_playerName`
												]
													? "border-red-500"
													: ""
											}`}
										/>
										{errors[
											`player${playerIndex}_playerName`
										] && (
											<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
												{
													errors[
														`player${playerIndex}_playerName`
													]
												}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label
											htmlFor={`playerDateOfBirth${playerIndex}`}
											className="font-['Manrope',Helvetica] font-medium text-[#111416]"
										>
											Date of Birth *
										</Label>
										<Input
											id={`playerDateOfBirth${playerIndex}`}
											type="date"
											value={player.playerDateOfBirth}
											onChange={(e) =>
												handlePlayerInputChange(
													playerIndex,
													"playerDateOfBirth",
													e.target.value
												)
											}
											className={`font-['Manrope',Helvetica] ${
												errors[
													`player${playerIndex}_playerDateOfBirth`
												]
													? "border-red-500"
													: ""
											}`}
										/>
										{errors[
											`player${playerIndex}_playerDateOfBirth`
										] && (
											<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
												{
													errors[
														`player${playerIndex}_playerDateOfBirth`
													]
												}
											</p>
										)}
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label
											htmlFor={`playerCity${playerIndex}`}
											className="font-['Manrope',Helvetica] font-medium text-[#111416]"
										>
											City *
										</Label>
										<Input
											id={`playerCity${playerIndex}`}
											type="text"
											value={player.playerCity}
											onChange={(e) =>
												handlePlayerInputChange(
													playerIndex,
													"playerCity",
													e.target.value
												)
											}
											placeholder="Enter player's city"
											className={`font-['Manrope',Helvetica] ${
												errors[
													`player${playerIndex}_playerCity`
												]
													? "border-red-500"
													: ""
											}`}
										/>
										{errors[
											`player${playerIndex}_playerCity`
										] && (
											<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
												{
													errors[
														`player${playerIndex}_playerCity`
													]
												}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label
											htmlFor={`playerCountry${playerIndex}`}
											className="font-['Manrope',Helvetica] font-medium text-[#111416]"
										>
											Country *
										</Label>
										<Select
											value={player.playerCountry}
											onValueChange={(value) =>
												handlePlayerInputChange(
													playerIndex,
													"playerCountry",
													value
												)
											}
										>
											<SelectTrigger
												className={`font-['Manrope',Helvetica] ${
													errors[
														`player${playerIndex}_playerCountry`
													]
														? "border-red-500"
														: ""
												}`}
											>
												<SelectValue placeholder="Select country" />
											</SelectTrigger>
											<SelectContent>
												{countries.map((country) => (
													<SelectItem
														key={country}
														value={country}
														className="font-['Manrope',Helvetica]"
													>
														{country}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{errors[
											`player${playerIndex}_playerCountry`
										] && (
											<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
												{
													errors[
														`player${playerIndex}_playerCountry`
													]
												}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor={`playerSchool${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										School *
									</Label>
									<Input
										id={`playerSchool${playerIndex}`}
										type="text"
										value={player.playerSchool}
										onChange={(e) =>
											handlePlayerInputChange(
												playerIndex,
												"playerSchool",
												e.target.value
											)
										}
										placeholder="Enter school name"
										className={`font-['Manrope',Helvetica] ${
											errors[
												`player${playerIndex}_playerSchool`
											]
												? "border-red-500"
												: ""
										}`}
									/>
									{errors[
										`player${playerIndex}_playerSchool`
									] && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{
												errors[
													`player${playerIndex}_playerSchool`
												]
											}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor={`playerPhoto${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Player Photo URL (Optional)
									</Label>
									<Input
										id={`playerPhoto${playerIndex}`}
										type="url"
										value={player.playerPhoto}
										onChange={(e) =>
											handlePlayerInputChange(
												playerIndex,
												"playerPhoto",
												e.target.value
											)
										}
										placeholder="Enter photo URL or leave blank"
										className="font-['Manrope',Helvetica]"
									/>
									<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
										You can add a photo URL or upload one
										later
									</p>
								</div>
							</CardContent>
						</Card>
					);
				} else if (stepType === "sports") {
					return (
						<Card>
							<CardHeader>
								<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
									<Trophy className="h-5 w-5" />
									Player {playerNumber} - Sports Information
								</CardTitle>
								<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
									Football-related details about player{" "}
									{playerNumber}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label
											htmlFor={`playerStrongFoot${playerIndex}`}
											className="font-['Manrope',Helvetica] font-medium text-[#111416]"
										>
											Strong Foot *
										</Label>
										<Select
											value={player.playerStrongFoot}
											onValueChange={(value) =>
												handlePlayerInputChange(
													playerIndex,
													"playerStrongFoot",
													value
												)
											}
										>
											<SelectTrigger
												className={`font-['Manrope',Helvetica] ${
													errors[
														`player${playerIndex}_playerStrongFoot`
													]
														? "border-red-500"
														: ""
												}`}
											>
												<SelectValue placeholder="Select strong foot" />
											</SelectTrigger>
											<SelectContent>
												{strongFootOptions.map(
													(foot) => (
														<SelectItem
															key={foot}
															value={foot}
															className="font-['Manrope',Helvetica]"
														>
															{foot}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										{errors[
											`player${playerIndex}_playerStrongFoot`
										] && (
											<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
												{
													errors[
														`player${playerIndex}_playerStrongFoot`
													]
												}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label
											htmlFor={`playerPosition${playerIndex}`}
											className="font-['Manrope',Helvetica] font-medium text-[#111416]"
										>
											Position (Optional)
										</Label>
										<Select
											value={player.playerPosition}
											onValueChange={(value) =>
												handlePlayerInputChange(
													playerIndex,
													"playerPosition",
													value
												)
											}
										>
											<SelectTrigger className="font-['Manrope',Helvetica]">
												<SelectValue placeholder="Select position" />
											</SelectTrigger>
											<SelectContent>
												{positions.map((position) => (
													<SelectItem
														key={position}
														value={position}
														className="font-['Manrope',Helvetica]"
													>
														{position}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor={`preferredLocation${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Preferred Location *
									</Label>
									<Select
										value={player.preferredLocation}
										onValueChange={(value) =>
											handlePlayerInputChange(
												playerIndex,
												"preferredLocation",
												value
											)
										}
									>
										<SelectTrigger
											className={`font-['Manrope',Helvetica] ${
												errors[
													`player${playerIndex}_preferredLocation`
												]
													? "border-red-500"
													: ""
											}`}
										>
											<SelectValue placeholder="Select preferred location" />
										</SelectTrigger>
										<SelectContent>
											{preferredLocations.map(
												(location) => (
													<SelectItem
														key={location}
														value={location}
														className="font-['Manrope',Helvetica]"
													>
														{location}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									{errors[
										`player${playerIndex}_preferredLocation`
									] && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{
												errors[
													`player${playerIndex}_preferredLocation`
												]
											}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor={`playerSportHistory${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Football History (Optional)
									</Label>
									<Textarea
										id={`playerSportHistory${playerIndex}`}
										value={player.playerSportHistory}
										onChange={(e) =>
											handlePlayerInputChange(
												playerIndex,
												"playerSportHistory",
												e.target.value
											)
										}
										placeholder="Tell us about the player's football experience - past or current clubs, school teams, camps, casual play, etc."
										className="font-['Manrope',Helvetica] min-h-[100px]"
										rows={4}
									/>
									<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
										Include any clubs, school teams, camps,
										or other football experiences
									</p>
								</div>
							</CardContent>
						</Card>
					);
				} else if (stepType === "personal") {
					return (
						<Card>
							<CardHeader>
								<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
									<Heart className="h-5 w-5" />
									Player {playerNumber} - Personal Details
								</CardTitle>
								<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
									Additional information about player{" "}
									{playerNumber}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label
										htmlFor={`hobbiesInterests${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Hobbies & Interests (Optional)
									</Label>
									<Textarea
										id={`hobbiesInterests${playerIndex}`}
										value={player.hobbiesInterests}
										onChange={(e) =>
											handlePlayerInputChange(
												playerIndex,
												"hobbiesInterests",
												e.target.value
											)
										}
										placeholder="What does the player enjoy doing besides football? (e.g., reading, music, video games, etc.)"
										className="font-['Manrope',Helvetica] min-h-[80px]"
										rows={3}
									/>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor={`ailmentsAllergies${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Ailments/Allergies (Optional)
									</Label>
									<Textarea
										id={`ailmentsAllergies${playerIndex}`}
										value={player.ailmentsAllergies}
										onChange={(e) =>
											handlePlayerInputChange(
												playerIndex,
												"ailmentsAllergies",
												e.target.value
											)
										}
										placeholder="Please list any medical conditions, allergies, or health concerns we should be aware of"
										className="font-['Manrope',Helvetica] min-h-[80px]"
										rows={3}
									/>
									<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
										This information is kept confidential
										and used only for safety purposes
									</p>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor={`tshirtSize${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										T-Shirt Size *
									</Label>
									<Select
										value={player.tshirtSize}
										onValueChange={(value) =>
											handlePlayerInputChange(
												playerIndex,
												"tshirtSize",
												value
											)
										}
									>
										<SelectTrigger
											className={`font-['Manrope',Helvetica] ${
												errors[
													`player${playerIndex}_tshirtSize`
												]
													? "border-red-500"
													: ""
											}`}
										>
											<SelectValue placeholder="Select t-shirt size" />
										</SelectTrigger>
										<SelectContent>
											{tshirtSizes.map((size) => (
												<SelectItem
													key={size}
													value={size}
													className="font-['Manrope',Helvetica]"
												>
													{size}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{errors[
										`player${playerIndex}_tshirtSize`
									] && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{
												errors[
													`player${playerIndex}_tshirtSize`
												]
											}
										</p>
									)}
								</div>
							</CardContent>
						</Card>
					);
				} else if (stepType === "emergency") {
					return (
						<Card>
							<CardHeader>
								<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
									<Phone className="h-5 w-5" />
									Player {playerNumber} - Emergency Contact
								</CardTitle>
								<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
									Emergency contact information for player{" "}
									{playerNumber}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label
										htmlFor={`emergencyContactName${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Emergency Contact Name *
									</Label>
									<Input
										id={`emergencyContactName${playerIndex}`}
										type="text"
										value={player.emergencyContactName}
										onChange={(e) =>
											handlePlayerInputChange(
												playerIndex,
												"emergencyContactName",
												e.target.value
											)
										}
										placeholder="Enter emergency contact's full name"
										className={`font-['Manrope',Helvetica] ${
											errors[
												`player${playerIndex}_emergencyContactName`
											]
												? "border-red-500"
												: ""
										}`}
									/>
									{errors[
										`player${playerIndex}_emergencyContactName`
									] && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{
												errors[
													`player${playerIndex}_emergencyContactName`
												]
											}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor={`emergencyContactNumber${playerIndex}`}
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Emergency Contact Number *
									</Label>
									<Input
										id={`emergencyContactNumber${playerIndex}`}
										type="tel"
										value={player.emergencyContactNumber}
										onChange={(e) =>
											handlePlayerInputChange(
												playerIndex,
												"emergencyContactNumber",
												e.target.value
											)
										}
										placeholder="Enter emergency contact's phone number"
										className={`font-['Manrope',Helvetica] ${
											errors[
												`player${playerIndex}_emergencyContactNumber`
											]
												? "border-red-500"
												: ""
										}`}
									/>
									{errors[
										`player${playerIndex}_emergencyContactNumber`
									] && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{
												errors[
													`player${playerIndex}_emergencyContactNumber`
												]
											}
										</p>
									)}
									<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
										Include country code if different from
										player's country
									</p>
								</div>
							</CardContent>
						</Card>
					);
				}

				return null;
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div className="flex justify-center items-center gap-4 mb-6">
						<div className="size-8">
							<svg
								viewBox="0 0 48 48"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-[#111416]"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
									fill="currentColor"
								/>
							</svg>
						</div>
						<h1 className="font-bold text-2xl text-[#111416] font-['Manrope',Helvetica]">
							Project Pro
						</h1>
					</div>
					<h2 className="text-3xl font-bold text-[#111418] font-['Manrope',Helvetica]">
						Create Your Account
					</h2>
					<p className="mt-2 text-sm text-[#60758a] font-['Manrope',Helvetica]">
						Step {currentStep} of {STEPS.length}:{" "}
						{STEPS.find((step) => step.id === currentStep)?.title}
						{formData.numberOfPlayers > 1 && currentStep > 2 && (
							<span className="block">
								Registering {formData.numberOfPlayers} players
							</span>
						)}
					</p>
				</div>

				{/* Progress Steps */}
				<div className="flex justify-center mb-8">
					<div className="flex items-center space-x-2 overflow-x-auto pb-2">
						{STEPS.map((step, index) => {
							const Icon = step.icon;
							const isActive = currentStep === step.id;
							const isCompleted = currentStep > step.id;

							return (
								<div
									key={step.id}
									className="flex items-center flex-shrink-0"
								>
									<div
										className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
											isActive
												? "border-[#111416] bg-[#111416] text-white"
												: isCompleted
												? "border-green-500 bg-green-500 text-white"
												: "border-gray-300 bg-white text-gray-400"
										}`}
									>
										<Icon className="h-3 w-3" />
									</div>
									{index < STEPS.length - 1 && (
										<div
											className={`w-4 h-0.5 mx-1 ${
												isCompleted
													? "bg-green-500"
													: "bg-gray-300"
											}`}
										/>
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div className="space-y-8">
					{renderStep()}

					{/* Navigation Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
						<div className="flex items-center gap-4">
							{currentStep > 1 && (
								<Button
									type="button"
									variant="outline"
									onClick={handlePrevious}
									className="font-['Manrope',Helvetica] font-medium"
								>
									<ChevronLeft className="h-4 w-4 mr-2" />
									Previous
								</Button>
							)}

							<button
								type="button"
								className="text-[#60758a] text-sm font-medium hover:text-blue-600 transition-colors font-['Manrope',Helvetica] bg-transparent border-none cursor-pointer"
							>
								Already have an account? Sign in
							</button>
						</div>

						<div className="flex gap-4">
							{currentStep < STEPS.length ? (
								<Button
									type="button"
									onClick={handleNext}
									className="min-w-[150px] font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
								>
									Next
									<ChevronRight className="h-4 w-4 ml-2" />
								</Button>
							) : (
								<Button
									type="button"
									onClick={handleSubmit}
									disabled={isSubmitting}
									className="min-w-[200px] font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
								>
									{isSubmitting
										? "Creating Account..."
										: "Create Account"}
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
