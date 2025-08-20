import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface LoginFormData {
	email: string;
	password: string;
}

export const Login = () => {
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const handleInputChange = (field: keyof LoginFormData, value: string) => {
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

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			// Here you would typically send the data to your backend
			console.log("Login data:", formData);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// For demo purposes - in real app, handle authentication response
			alert("Login successful! Welcome back to Project Pro!");

			// Reset form
			setFormData({
				email: "",
				password: "",
			});
		} catch (error) {
			console.error("Login error:", error);
			setErrors({
				general:
					"Login failed. Please check your credentials and try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleForgotPassword = () => {
		// In a real app, this would navigate to forgot password page or open modal
		alert("Forgot password functionality would be implemented here");
	};

	const handleCreateAccount = () => {
		// In a real app, this would navigate to registration page
		alert("This would navigate to the registration page");
	};

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
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
				</div>

				{/* Login Form */}
				<Card className="shadow-lg bg-white">
					<CardHeader>
						<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] text-center">
							Sign In
						</CardTitle>
						<CardDescription className="font-['Manrope',Helvetica] text-[#607589] text-center">
							Enter your credentials to access your account
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* General Error Message */}
						{errors.general && (
							<div className="p-3 rounded-md bg-red-50 border border-red-200">
								<p className="text-sm text-red-600 font-['Manrope',Helvetica]">
									{errors.general}
								</p>
							</div>
						)}

						{/* Email Field */}
						<div className="space-y-2">
							<Label
								htmlFor="email"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Email Address
							</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#60758a]" />
								<Input
									id="email"
									type="email"
									value={formData.email}
									onChange={(e) =>
										handleInputChange(
											"email",
											e.target.value
										)
									}
									placeholder="Enter your email address"
									className={`font-['Manrope',Helvetica] pl-10 ${
										errors.email
											? "border-red-500 focus:border-red-500"
											: ""
									}`}
									disabled={isSubmitting}
								/>
							</div>
							{errors.email && (
								<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
									{errors.email}
								</p>
							)}
						</div>

						{/* Password Field */}
						<div className="space-y-2">
							<Label
								htmlFor="password"
								className="font-['Manrope',Helvetica] font-medium text-[#111416]"
							>
								Password
							</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#60758a]" />
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={(e) =>
										handleInputChange(
											"password",
											e.target.value
										)
									}
									placeholder="Enter your password"
									className={`font-['Manrope',Helvetica] pl-10 pr-10 ${
										errors.password
											? "border-red-500 focus:border-red-500"
											: ""
									}`}
									disabled={isSubmitting}
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#60758a] hover:text-[#111416] transition-colors"
									disabled={isSubmitting}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="text-sm text-red-500 font-['Manrope',Helvetica]">
									{errors.password}
								</p>
							)}
						</div>

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="rememberMe"
									type="checkbox"
									checked={rememberMe}
									onChange={(e) =>
										setRememberMe(e.target.checked)
									}
									className="h-4 w-4 text-[#111416] focus:ring-[#111416] border-gray-300 rounded"
									disabled={isSubmitting}
								/>
								<label
									htmlFor="rememberMe"
									className="ml-2 text-sm text-[#60758a] font-['Manrope',Helvetica] cursor-pointer"
								>
									Remember me
								</label>
							</div>
							<button
								type="button"
								onClick={handleForgotPassword}
								className="text-sm font-medium text-[#111416] hover:text-blue-600 transition-colors font-['Manrope',Helvetica] bg-transparent border-none cursor-pointer"
								disabled={isSubmitting}
							>
								Forgot password?
							</button>
						</div>

						{/* Submit Button */}
						<Button
							onClick={handleSubmit}
							disabled={isSubmitting}
							className="w-full font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white py-2.5"
						>
							{isSubmitting ? (
								<div className="flex items-center justify-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Signing in...
								</div>
							) : (
								"Sign In"
							)}
						</Button>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-[#60758a] font-['Manrope',Helvetica]">
									Don't have an account?
								</span>
							</div>
						</div>

						{/* Create Account Button */}
						<Button
							variant="outline"
							onClick={handleCreateAccount}
							disabled={isSubmitting}
							className="w-full font-['Manrope',Helvetica] font-medium border-[#111416] text-[#111416] hover:bg-[#111416] hover:text-white"
						>
							Create New Account
						</Button>
					</CardContent>
				</Card>

				{/* Footer */}
				<div className="text-center">
					<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
						By signing in, you agree to our{" "}
						<button className="text-[#111416] hover:underline bg-transparent border-none cursor-pointer">
							Terms of Service
						</button>{" "}
						and{" "}
						<button className="text-[#111416] hover:underline bg-transparent border-none cursor-pointer">
							Privacy Policy
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};
