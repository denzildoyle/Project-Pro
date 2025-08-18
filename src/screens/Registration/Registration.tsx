import React, { useState } from "react";
import { Link } from "react-router-dom";
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
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { School } from "lucide-react";

interface RegistrationFormData {
	// Parent information
	parentName: string;
	parentEmail: string;
	parentPassword: string;
	confirmPassword: string;

	// Player information
	playerName: string;
	playerSchool: string;
	playerDateOfBirth: string;
	playerPhoto: string;
	playerPosition: string;
	playerStrongFoot: string;
	playerCountry: string;
}

export const Registration = (): JSX.Element => {
	const [formData, setFormData] = useState<RegistrationFormData>({
		parentName: "",
		parentEmail: "",
		parentPassword: "",
		confirmPassword: "",
		playerName: "",
		playerSchool: "",
		playerDateOfBirth: "",
		playerPhoto: "",
		playerPosition: "",
		playerStrongFoot: "",
		playerCountry: "",
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

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		// Parent validation
		if (!formData.parentName.trim()) {
			newErrors.parentName = "Parent name is required";
		}

		if (!formData.parentEmail.trim()) {
			newErrors.parentEmail = "Parent email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
			newErrors.parentEmail = "Please enter a valid email address";
		}

		if (!formData.parentPassword) {
			newErrors.parentPassword = "Password is required";
		} else if (formData.parentPassword.length < 8) {
			newErrors.parentPassword = "Password must be at least 8 characters";
		}

		if (formData.parentPassword !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		// Player validation
		if (!formData.playerName.trim()) {
			newErrors.playerName = "Player name is required";
		}

		if (!formData.playerSchool.trim()) {
			newErrors.playerSchool = "Player school is required";
		}

		if (!formData.playerDateOfBirth) {
			newErrors.playerDateOfBirth = "Player date of birth is required";
		} else {
			const birthDate = new Date(formData.playerDateOfBirth);
			const today = new Date();
			const age = today.getFullYear() - birthDate.getFullYear();
			if (age < 5 || age > 25) {
				newErrors.playerDateOfBirth =
					"Player must be between 5 and 25 years old";
			}
		}

		if (!formData.playerStrongFoot) {
			newErrors.playerStrongFoot = "Player strong foot is required";
		}

		if (!formData.playerCountry) {
			newErrors.playerCountry = "Player country is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			// Here you would typically send the data to your backend
			console.log("Registration data:", formData);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			alert("Registration successful! Welcome to Project Pro!");

			// Reset form
			setFormData({
				parentName: "",
				parentEmail: "",
				parentPassword: "",
				confirmPassword: "",
				playerName: "",
				playerSchool: "",
				playerDateOfBirth: "",
				playerPhoto: "",
				playerPosition: "",
				playerStrongFoot: "",
				playerCountry: "",
			});
		} catch (error) {
			console.error("Registration error:", error);
			alert("Registration failed. Please try again.");
		} finally {
			setIsSubmitting(false);
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
						Register your player and start their football journey
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Parent Information */}
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416]">
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

					{/* Player Information */}
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416]">
								Player Information
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Please provide details about the player
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
								<Label
									htmlFor="playerSchool"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Player School *
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
									placeholder="Enter player's full name"
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

					{/* Submit Button */}
					<div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
						<Link
							to="/"
							className="text-[#60758a] text-sm font-medium hover:text-blue-600 transition-colors font-['Manrope',Helvetica]"
						>
							Already have an account? Sign in
						</Link>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full sm:w-auto min-w-[200px] font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
						>
							{isSubmitting
								? "Creating Account..."
								: "Create Account"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
