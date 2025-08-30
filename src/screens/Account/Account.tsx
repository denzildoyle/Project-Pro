import { useState } from "react";
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
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";
import {
	User,
	Lock,
	Mail,
	Phone,
	Trophy,
	Heart,
	Eye,
	EyeOff,
	Check,
	AlertCircle,
} from "lucide-react";
import POSITIONS from "../../consts/positions";
import COUNTRIES from "../../consts/countries";

interface UserAccountData {
	// Parent information (editable)
	parentEmail: string;

	// Player basic information (some read-only)
	playerDateOfBirth: string; // Read-only
	playerPhoto: string;
	playerCity: string;
	playerSchool: string;
	playerCountry: string;

	// Player sports information (editable)
	playerPosition: string;
	playerStrongFoot: string;
	preferredLocation: string;

	// Personal details (editable)
	hobbiesInterests: string;
	ailmentsAllergies: string;
	tshirtSize: string;

	// Emergency contact (editable)
	emergencyContactName: string;
	emergencyContactNumber: string;
}

interface PasswordChangeData {
	currentPassword: string;
	newPassword: string;
	confirmNewPassword: string;
}

export const Account = (): JSX.Element => {
	// Mock initial data - in real app, this would come from API
	const [accountData, setAccountData] = useState<UserAccountData>({
		parentEmail: "john.smith@email.com",
		playerDateOfBirth: "2010-05-15", // Read-only
		playerPhoto: "",
		playerCity: "Port of Spain",
		playerSchool: "St. Mary's College",
		playerCountry: "Trinidad and Tobago",
		playerPosition: "Midfielder",
		playerStrongFoot: "Right",
		preferredLocation: "Nelson Mandela Park Port of Spain",
		hobbiesInterests: "Video games, reading, music",
		ailmentsAllergies: "Mild asthma",
		tshirtSize: "M",
		emergencyContactName: "Jane Smith",
		emergencyContactNumber: "+1-868-555-0123",
	});

	const [passwordData, setPasswordData] = useState<PasswordChangeData>({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [successMessage, setSuccessMessage] = useState("");
	const strongFootOptions = ["Left", "Right", "Both"];
	const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];
	const preferredLocations = [
		"Nelson Mandela Park Port of Spain",
		"Stalagnite Park Cunupia",
	];

	const handleAccountDataChange = (
		field: keyof UserAccountData,
		value: string
	) => {
		setAccountData((prev) => ({
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

	const handlePasswordChange = (
		field: keyof PasswordChangeData,
		value: string
	) => {
		setPasswordData((prev) => ({
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

	const validateAccountInfo = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!accountData.parentEmail.trim()) {
			newErrors.parentEmail = "Parent email is required";
		} else if (
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountData.parentEmail)
		) {
			newErrors.parentEmail = "Please enter a valid email address";
		}

		if (!accountData.playerCity.trim()) {
			newErrors.playerCity = "Player city is required";
		}

		if (!accountData.playerSchool.trim()) {
			newErrors.playerSchool = "Player school is required";
		}

		if (!accountData.playerCountry) {
			newErrors.playerCountry = "Player country is required";
		}

		if (!accountData.playerStrongFoot) {
			newErrors.playerStrongFoot = "Strong foot is required";
		}

		if (!accountData.preferredLocation) {
			newErrors.preferredLocation = "Preferred location is required";
		}

		if (!accountData.tshirtSize) {
			newErrors.tshirtSize = "T-shirt size is required";
		}

		if (!accountData.emergencyContactName.trim()) {
			newErrors.emergencyContactName =
				"Emergency contact name is required";
		}

		if (!accountData.emergencyContactNumber.trim()) {
			newErrors.emergencyContactNumber =
				"Emergency contact number is required";
		} else if (
			!/^\+?[\d\s\-\(\)]+$/.test(accountData.emergencyContactNumber)
		) {
			newErrors.emergencyContactNumber =
				"Please enter a valid phone number";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validatePasswordChange = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!passwordData.currentPassword) {
			newErrors.currentPassword = "Current password is required";
		}

		if (!passwordData.newPassword) {
			newErrors.newPassword = "New password is required";
		} else if (passwordData.newPassword.length < 8) {
			newErrors.newPassword =
				"New password must be at least 8 characters";
		}

		if (passwordData.newPassword !== passwordData.confirmNewPassword) {
			newErrors.confirmNewPassword = "Passwords do not match";
		}

		if (passwordData.currentPassword === passwordData.newPassword) {
			newErrors.newPassword =
				"New password must be different from current password";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSaveAccountInfo = async () => {
		if (!validateAccountInfo()) {
			return;
		}

		setIsSubmitting(true);

		try {
			console.log("Saving account info:", accountData);
			await new Promise((resolve) => setTimeout(resolve, 1500));

			setSuccessMessage("Account information updated successfully!");
			setTimeout(() => setSuccessMessage(""), 3000);
		} catch (error) {
			console.error("Save error:", error);
			setErrors({
				general:
					"Failed to update account information. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChangePassword = async () => {
		if (!validatePasswordChange()) {
			return;
		}

		setIsSubmitting(true);

		try {
			console.log("Changing password");
			await new Promise((resolve) => setTimeout(resolve, 1500));

			setSuccessMessage("Password changed successfully!");
			setPasswordData({
				currentPassword: "",
				newPassword: "",
				confirmNewPassword: "",
			});
			setTimeout(() => setSuccessMessage(""), 3000);
		} catch (error) {
			console.error("Password change error:", error);
			setErrors({
				general: "Failed to change password. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
		setShowPasswords((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const calculateAge = (birthDate: string) => {
		const birth = new Date(birthDate);
		const today = new Date();
		let age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birth.getDate())
		) {
			age--;
		}
		return age;
	};

	return (
		<div>
			{/* Header */}
			<div className="flex flex-wrap justify-between gap-3 p-4">
				<div className="flex min-w-72 flex-col gap-3">
					<p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight font-['Manrope',Helvetica]">
						Account Settings
					</p>
					<p className="text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
						Manage your account information and preferences
					</p>
				</div>
			</div>

			{/* Success Message */}
			{successMessage && (
				<div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200 flex items-center gap-3">
					<Check className="h-5 w-5 text-green-600" />
					<p className="text-sm text-green-800 font-['Manrope',Helvetica]">
						{successMessage}
					</p>
				</div>
			)}

			{/* General Error Message */}
			{errors.general && (
				<div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-center gap-3">
					<AlertCircle className="h-5 w-5 text-red-600" />
					<p className="text-sm text-red-600 font-['Manrope',Helvetica]">
						{errors.general}
					</p>
				</div>
			)}

			<Tabs defaultValue="account" className="space-y-6">
				<TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
					<TabsTrigger
						value="account"
						className="font-['Manrope',Helvetica] data-[state=active]:bg-[#111416] data-[state=active]:text-white"
					>
						<User className="h-4 w-4 mr-2" />
						Account Information
					</TabsTrigger>
					<TabsTrigger
						value="password"
						className="font-['Manrope',Helvetica] data-[state=active]:bg-[#111416] data-[state=active]:text-white"
					>
						<Lock className="h-4 w-4 mr-2" />
						Change Password
					</TabsTrigger>
				</TabsList>

				<TabsContent value="account" className="space-y-6">
					{/* Parent Information */}
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<User className="h-5 w-5" />
								Parent Information
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Update your contact information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1">
								<div className="space-y-2">
									<Label
										htmlFor="parentEmail"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Parent Email *
									</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#60758a]" />
										<Input
											id="parentEmail"
											type="email"
											value={accountData.parentEmail}
											onChange={(e) =>
												handleAccountDataChange(
													"parentEmail",
													e.target.value
												)
											}
											className={`font-['Manrope',Helvetica] pl-10 ${
												errors.parentEmail
													? "border-red-500"
													: ""
											}`}
										/>
									</div>
									{errors.parentEmail && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.parentEmail}
										</p>
									)}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Player Information */}
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<Trophy className="h-5 w-5" />
								Player Information
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Player details and sports information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* Read-only Player Info */}
							<div className="p-4 bg-gray-50 rounded-md border">
								<h4 className="font-medium text-[#111416] mb-3 font-['Manrope',Helvetica]">
									Player Identity (Cannot be changed)
								</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label className="font-['Manrope',Helvetica] font-medium text-[#111416] text-sm">
											Date of Birth (Age:{" "}
											{calculateAge(
												accountData.playerDateOfBirth
											)}
											)
										</Label>
										<p className="mt-1 text-[#60758a] font-['Manrope',Helvetica]">
											{new Date(
												accountData.playerDateOfBirth
											).toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>

							{/* Editable Player Info */}
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
										value={accountData.playerCity}
										onChange={(e) =>
											handleAccountDataChange(
												"playerCity",
												e.target.value
											)
										}
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
										value={accountData.playerCountry}
										onValueChange={(value) =>
											handleAccountDataChange(
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
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{COUNTRIES.map((country) => (
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
									value={accountData.playerSchool}
									onChange={(e) =>
										handleAccountDataChange(
											"playerSchool",
											e.target.value
										)
									}
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
									value={accountData.playerPhoto}
									onChange={(e) =>
										handleAccountDataChange(
											"playerPhoto",
											e.target.value
										)
									}
									placeholder="Enter photo URL or leave blank"
									className="font-['Manrope',Helvetica]"
								/>
							</div>

							{/* Sports Information */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label
										htmlFor="playerStrongFoot"
										className="font-['Manrope',Helvetica] font-medium text-[#111416]"
									>
										Strong Foot *
									</Label>
									<Select
										value={accountData.playerStrongFoot}
										onValueChange={(value) =>
											handleAccountDataChange(
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
											<SelectValue />
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
										value={accountData.playerPosition}
										onValueChange={(value) =>
											handleAccountDataChange(
												"playerPosition",
												value
											)
										}
									>
										<SelectTrigger className="font-['Manrope',Helvetica]">
											<SelectValue placeholder="Select position" />
										</SelectTrigger>
										<SelectContent>
											{POSITIONS.map((position) => (
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
									value={accountData.preferredLocation}
									onValueChange={(value) =>
										handleAccountDataChange(
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
										<SelectValue />
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
						</CardContent>
					</Card>

					{/* Personal Details */}
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<Heart className="h-5 w-5" />
								Personal Details
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Personal information and preferences
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
									value={accountData.hobbiesInterests}
									onChange={(e) =>
										handleAccountDataChange(
											"hobbiesInterests",
											e.target.value
										)
									}
									placeholder="What does the player enjoy doing besides football?"
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
									value={accountData.ailmentsAllergies}
									onChange={(e) =>
										handleAccountDataChange(
											"ailmentsAllergies",
											e.target.value
										)
									}
									placeholder="Please list any medical conditions, allergies, or health concerns"
									className="font-['Manrope',Helvetica] min-h-[80px]"
									rows={3}
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="tshirtSize"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									T-Shirt Size *
								</Label>
								<Select
									value={accountData.tshirtSize}
									onValueChange={(value) =>
										handleAccountDataChange(
											"tshirtSize",
											value
										)
									}
								>
									<SelectTrigger
										className={`font-['Manrope',Helvetica] ${
											errors.tshirtSize
												? "border-red-500"
												: ""
										}`}
									>
										<SelectValue />
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

					{/* Emergency Contact */}
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<Phone className="h-5 w-5" />
								Emergency Contact
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Emergency contact information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
										value={accountData.emergencyContactName}
										onChange={(e) =>
											handleAccountDataChange(
												"emergencyContactName",
												e.target.value
											)
										}
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
									<div className="relative">
										<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#60758a]" />
										<Input
											id="emergencyContactNumber"
											type="tel"
											value={
												accountData.emergencyContactNumber
											}
											onChange={(e) =>
												handleAccountDataChange(
													"emergencyContactNumber",
													e.target.value
												)
											}
											className={`font-['Manrope',Helvetica] pl-10 ${
												errors.emergencyContactNumber
													? "border-red-500"
													: ""
											}`}
										/>
									</div>
									{errors.emergencyContactNumber && (
										<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
											{errors.emergencyContactNumber}
										</p>
									)}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Save Button */}
					<div className="flex justify-end">
						<Button
							onClick={handleSaveAccountInfo}
							disabled={isSubmitting}
							className="min-w-[200px] font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
						>
							{isSubmitting ? (
								<div className="flex items-center justify-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Saving Changes...
								</div>
							) : (
								"Save Changes"
							)}
						</Button>
					</div>
				</TabsContent>

				<TabsContent value="password">
					<Card>
						<CardHeader>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] flex items-center gap-2">
								<Lock className="h-5 w-5" />
								Change Password
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589]">
								Update your account password for security
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<Label
									htmlFor="currentPassword"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Current Password *
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#60758a]" />
									<Input
										id="currentPassword"
										type={
											showPasswords.current
												? "text"
												: "password"
										}
										value={passwordData.currentPassword}
										onChange={(e) =>
											handlePasswordChange(
												"currentPassword",
												e.target.value
											)
										}
										placeholder="Enter current password"
										className={`font-['Manrope',Helvetica] pl-10 pr-10 ${
											errors.currentPassword
												? "border-red-500"
												: ""
										}`}
									/>
									<button
										type="button"
										onClick={() =>
											togglePasswordVisibility("current")
										}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#60758a] hover:text-[#111416] transition-colors"
									>
										{showPasswords.current ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
								{errors.currentPassword && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.currentPassword}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="newPassword"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									New Password *
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#60758a]" />
									<Input
										id="newPassword"
										type={
											showPasswords.new
												? "text"
												: "password"
										}
										value={passwordData.newPassword}
										onChange={(e) =>
											handlePasswordChange(
												"newPassword",
												e.target.value
											)
										}
										placeholder="Enter new password"
										className={`font-['Manrope',Helvetica] pl-10 pr-10 ${
											errors.newPassword
												? "border-red-500"
												: ""
										}`}
									/>
									<button
										type="button"
										onClick={() =>
											togglePasswordVisibility("new")
										}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#60758a] hover:text-[#111416] transition-colors"
									>
										{showPasswords.new ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
								{errors.newPassword && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.newPassword}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="confirmNewPassword"
									className="font-['Manrope',Helvetica] font-medium text-[#111416]"
								>
									Confirm New Password *
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#60758a]" />
									<Input
										id="confirmNewPassword"
										type={
											showPasswords.confirm
												? "text"
												: "password"
										}
										value={passwordData.confirmNewPassword}
										onChange={(e) =>
											handlePasswordChange(
												"confirmNewPassword",
												e.target.value
											)
										}
										placeholder="Confirm new password"
										className={`font-['Manrope',Helvetica] pl-10 pr-10 ${
											errors.confirmNewPassword
												? "border-red-500"
												: ""
										}`}
									/>
									<button
										type="button"
										onClick={() =>
											togglePasswordVisibility("confirm")
										}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#60758a] hover:text-[#111416] transition-colors"
									>
										{showPasswords.confirm ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
								{errors.confirmNewPassword && (
									<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
										{errors.confirmNewPassword}
									</p>
								)}
							</div>

							<div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
								<p className="text-sm text-blue-800 font-['Manrope',Helvetica]">
									<strong>Password Requirements:</strong>
									<br />
									• At least 8 characters long
									<br />• Must be different from your current
									password
								</p>
							</div>

							<div className="flex justify-end">
								<Button
									onClick={handleChangePassword}
									disabled={isSubmitting}
									className="min-w-[200px] font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
								>
									{isSubmitting ? (
										<div className="flex items-center justify-center">
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
											Changing Password...
										</div>
									) : (
										"Change Password"
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};
