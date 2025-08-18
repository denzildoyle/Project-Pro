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
} from "lucide-react";

interface RegistrationFormData {
	// Parent information
	parentName: string;
	parentEmail: string;
	parentPassword: string;
	confirmPassword: string;

	// Player basic information
	playerName: string;
	playerDateOfBirth: string;
	playerPhoto: string;
	playerCity: string;
	playerSchool: string;
	playerCountry: string;

	// Player sports information
	playerPosition: string;
	playerStrongFoot: string;
	playerSportHistory: string;
	preferredLocation: string;

	// Personal details
	hobbiesInterests: string;
	ailmentsAllergies: string;
	tshirtSize: string;

	// Emergency contact
	emergencyContactName: string;
	emergencyContactNumber: string;
}

const STEPS = [
	{ id: 1, title: "Parent Info", icon: User },
	{ id: 2, title: "Player Basics", icon: Shirt },
	{ id: 3, title: "Sports Info", icon: Trophy },
	{ id: 4, title: "Personal Details", icon: Heart },
	{ id: 5, title: "Emergency Contact", icon: Phone },
];

export const Registration = (): JSX.Element => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<RegistrationFormData>({
		parentName: "",
		parentEmail: "",
		parentPassword: "",
		confirmPassword: "",
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

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

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
		"Nelson Mandela Park",
		"Port of Spain",
		"Stalagnite Park",
		"Cunupia",
	];

	const handleInputChange = (
		field: keyof RegistrationFormData,
		value: string
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({
				...prev,
				[field]: "",
			}));
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

			case 2: // Player Basics
				if (!formData.playerName.trim()) {
					newErrors.playerName = "Player name is required";
				}
				if (!formData.playerDateOfBirth) {
					newErrors.playerDateOfBirth =
						"Player date of birth is required";
				} else {
					const birthDate = new Date(formData.playerDateOfBirth);
					const today = new Date();
					const age = today.getFullYear() - birthDate.getFullYear();
					if (age < 5 || age > 25) {
						newErrors.playerDateOfBirth =
							"Player must be between 5 and 25 years old";
					}
				}
				if (!formData.playerCity.trim()) {
					newErrors.playerCity = "Player city is required";
				}
				if (!formData.playerSchool.trim()) {
					newErrors.playerSchool = "Player school is required";
				}
				if (!formData.playerCountry) {
					newErrors.playerCountry = "Player country is required";
				}
				break;

			case 3: // Sports Info
				if (!formData.playerStrongFoot) {
					newErrors.playerStrongFoot = "Strong foot is required";
				}
				if (!formData.preferredLocation) {
					newErrors.preferredLocation =
						"Preferred location is required";
				}
				break;

			case 4: // Personal Details
				if (!formData.tshirtSize) {
					newErrors.tshirtSize = "T-shirt size is required";
				}
				break;

			case 5: // Emergency Contact
				if (!formData.emergencyContactName.trim()) {
					newErrors.emergencyContactName =
						"Emergency contact name is required";
				}
				if (!formData.emergencyContactNumber.trim()) {
					newErrors.emergencyContactNumber =
						"Emergency contact number is required";
				} else if (
					!/^\+?[\d\s\-\(\)]+$/.test(formData.emergencyContactNumber)
				) {
					newErrors.emergencyContactNumber =
						"Please enter a valid phone number";
				}
				break;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNext = () => {
		if (validateStep(currentStep)) {
			setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
		}
	};

	const handlePrevious = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1));
	};

	const handleSubmit = async () => {
		if (!validateStep(currentStep)) {
			return;
		}

		setIsSubmitting(true);

		try {
			console.log("Registration data:", formData);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			alert("Registration successful! Welcome to Project Pro!");
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
										handleInputChange(
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
										handleInputChange(
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
											handleInputChange(
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
											handleInputChange(
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
								<Shirt className="h-5 w-5" />
								Player Basic Information
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Basic details about the player
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label
										htmlFor="playerName"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Player Name *
									</Label>
									<Input
										id="playerName"
										type="text"
										value={formData.playerName}
										onChange={(e) =>
											handleInputChange(
												"playerName",
												e.target.value
											)
										}
										placeholder="Enter player's full name"
										className={`font-['Manrope',Helvetica] ${
											errors.playerName
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.playerName && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.playerName}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="playerDateOfBirth"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Date of Birth *
									</Label>
									<Input
										id="playerDateOfBirth"
										type="date"
										value={formData.playerDateOfBirth}
										onChange={(e) =>
											handleInputChange(
												"playerDateOfBirth",
												e.target.value
											)
										}
										className={`font-['Manrope',Helvetica] ${
											errors.playerDateOfBirth
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.playerDateOfBirth && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.playerDateOfBirth}
										</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label
										htmlFor="playerCity"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										City *
									</Label>
									<Input
										id="playerCity"
										type="text"
										value={formData.playerCity}
										onChange={(e) =>
											handleInputChange(
												"playerCity",
												e.target.value
											)
										}
										placeholder="Enter player's city"
										className={`font-['Manrope',Helvetica] ${
											errors.playerCity
												? "border-red-500"
												: ""
										}`}
									/>
									{errors.playerCity && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.playerCity}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="playerCountry"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Country *
									</Label>
									<Select
										value={formData.playerCountry}
										onValueChange={(value) =>
											handleInputChange(
												"playerCountry",
												value
											)
										}
									>
										<SelectTrigger
											className={`font-['Manrope',Helvetica] ${
												errors.playerCountry
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
									{errors.playerCountry && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.playerCountry}
										</p>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="playerSchool"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									School *
								</Label>
								<Input
									id="playerSchool"
									type="text"
									value={formData.playerSchool}
									onChange={(e) =>
										handleInputChange(
											"playerSchool",
											e.target.value
										)
									}
									placeholder="Enter school name"
									className={`font-['Manrope',Helvetica] ${
										errors.playerSchool
											? "border-red-500"
											: ""
									}`}
								/>
								{errors.playerSchool && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.playerSchool}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="playerPhoto"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Player Photo URL (Optional)
								</Label>
								<Input
									id="playerPhoto"
									type="url"
									value={formData.playerPhoto}
									onChange={(e) =>
										handleInputChange(
											"playerPhoto",
											e.target.value
										)
									}
									placeholder="Enter photo URL or leave blank"
									className="font-['Manrope',Helvetica]"
								/>
								<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
									You can add a photo URL or upload one later
								</p>
							</div>
						</CardContent>
					</Card>
				);

			case 3:
				return (
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<Trophy className="h-5 w-5" />
								Sports Information
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Football-related details about the player
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label
										htmlFor="playerStrongFoot"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Strong Foot *
									</Label>
									<Select
										value={formData.playerStrongFoot}
										onValueChange={(value) =>
											handleInputChange(
												"playerStrongFoot",
												value
											)
										}
									>
										<SelectTrigger
											className={`font-['Manrope',Helvetica] ${
												errors.playerStrongFoot
													? "border-red-500"
													: ""
											}`}
										>
											<SelectValue placeholder="Select strong foot" />
										</SelectTrigger>
										<SelectContent>
											{strongFootOptions.map((foot) => (
												<SelectItem
													key={foot}
													value={foot}
													className="font-['Manrope',Helvetica]"
												>
													{foot}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{errors.playerStrongFoot && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.playerStrongFoot}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="playerPosition"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Position (Optional)
									</Label>
									<Select
										value={formData.playerPosition}
										onValueChange={(value) =>
											handleInputChange(
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
									htmlFor="preferredLocation"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Preferred Location *
								</Label>
								<Select
									value={formData.preferredLocation}
									onValueChange={(value) =>
										handleInputChange(
											"preferredLocation",
											value
										)
									}
								>
									<SelectTrigger
										className={`font-['Manrope',Helvetica] ${
											errors.preferredLocation
												? "border-red-500"
												: ""
										}`}
									>
										<SelectValue placeholder="Select preferred location" />
									</SelectTrigger>
									<SelectContent>
										{preferredLocations.map((location) => (
											<SelectItem
												key={location}
												value={location}
												className="font-['Manrope',Helvetica]"
											>
												{location}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{errors.preferredLocation && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.preferredLocation}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="playerSportHistory"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Football History (Optional)
								</Label>
								<Textarea
									id="playerSportHistory"
									value={formData.playerSportHistory}
									onChange={(e) =>
										handleInputChange(
											"playerSportHistory",
											e.target.value
										)
									}
									placeholder="Tell us about the player's football experience - past or current clubs, school teams, camps, casual play, etc."
									className="font-['Manrope',Helvetica] min-h-[100px]"
									rows={4}
								/>
								<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
									Include any clubs, school teams, camps, or
									other football experiences
								</p>
							</div>
						</CardContent>
					</Card>
				);

			case 4:
				return (
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<Heart className="h-5 w-5" />
								Personal Details
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Additional information about the player
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="hobbiesInterests"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Hobbies & Interests (Optional)
								</Label>
								<Textarea
									id="hobbiesInterests"
									value={formData.hobbiesInterests}
									onChange={(e) =>
										handleInputChange(
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
									htmlFor="ailmentsAllergies"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Ailments/Allergies (Optional)
								</Label>
								<Textarea
									id="ailmentsAllergies"
									value={formData.ailmentsAllergies}
									onChange={(e) =>
										handleInputChange(
											"ailmentsAllergies",
											e.target.value
										)
									}
									placeholder="Please list any medical conditions, allergies, or health concerns we should be aware of"
									className="font-['Manrope',Helvetica] min-h-[80px]"
									rows={3}
								/>
								<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
									This information is kept confidential and
									used only for safety purposes
								</p>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="tshirtSize"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									T-Shirt Size *
								</Label>
								<Select
									value={formData.tshirtSize}
									onValueChange={(value) =>
										handleInputChange("tshirtSize", value)
									}
								>
									<SelectTrigger
										className={`font-['Manrope',Helvetica] ${
											errors.tshirtSize
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
								{errors.tshirtSize && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.tshirtSize}
									</p>
								)}
							</div>
						</CardContent>
					</Card>
				);

			case 5:
				return (
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<Phone className="h-5 w-5" />
								Emergency Contact
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Emergency contact information for the player
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="emergencyContactName"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Emergency Contact Name *
								</Label>
								<Input
									id="emergencyContactName"
									type="text"
									value={formData.emergencyContactName}
									onChange={(e) =>
										handleInputChange(
											"emergencyContactName",
											e.target.value
										)
									}
									placeholder="Enter emergency contact's full name"
									className={`font-['Manrope',Helvetica] ${
										errors.emergencyContactName
											? "border-red-500"
											: ""
									}`}
								/>
								{errors.emergencyContactName && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.emergencyContactName}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="emergencyContactNumber"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Emergency Contact Number *
								</Label>
								<Input
									id="emergencyContactNumber"
									type="tel"
									value={formData.emergencyContactNumber}
									onChange={(e) =>
										handleInputChange(
											"emergencyContactNumber",
											e.target.value
										)
									}
									placeholder="Enter emergency contact's phone number"
									className={`font-['Manrope',Helvetica] ${
										errors.emergencyContactNumber
											? "border-red-500"
											: ""
									}`}
								/>
								{errors.emergencyContactNumber && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.emergencyContactNumber}
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

			default:
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
					</p>
				</div>

				{/* Progress Steps */}
				<div className="flex justify-center mb-8">
					<div className="flex items-center space-x-4">
						{STEPS.map((step, index) => {
							const Icon = step.icon;
							const isActive = currentStep === step.id;
							const isCompleted = currentStep > step.id;

							return (
								<div
									key={step.id}
									className="flex items-center"
								>
									<div
										className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
											isActive
												? "border-[#111416] bg-[#111416] text-white"
												: isCompleted
												? "border-green-500 bg-green-500 text-white"
												: "border-gray-300 bg-white text-gray-400"
										}`}
									>
										<Icon className="h-4 w-4" />
									</div>
									{index < STEPS.length - 1 && (
										<div
											className={`w-12 h-0.5 mx-2 ${
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
