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
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isEmailSent, setIsEmailSent] = useState(false);

	const handleInputChange = (value: string) => {
		setEmail(value);

		// Clear error when user starts typing
		if (errors.email) {
			setErrors((prev) => ({
				...prev,
				email: "",
			}));
		}
	};

	const validateEmail = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = "Please enter a valid email address";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateEmail()) {
			return;
		}

		setIsSubmitting(true);

		try {
			// Here you would typically send the email to your backend
			console.log("Reset password email sent to:", email);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Show success state
			setIsEmailSent(true);
		} catch (error) {
			console.error("Forgot password error:", error);
			setErrors({
				general: "Failed to send reset email. Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleBackToLogin = () => {
		// In a real app, this would navigate back to login page
		alert("This would navigate back to the login page");
	};

	const handleResendEmail = () => {
		setIsEmailSent(false);
		setEmail("");
		setErrors({});
	};

	// Success state after email is sent
	if (isEmailSent) {
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

					{/* Success Card */}
					<Card className="shadow-lg bg-white">
						<CardHeader className="text-center">
							<div className="flex justify-center mb-4">
								<CheckCircle className="h-16 w-16 text-green-500" />
							</div>
							<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416]">
								Check Your Email
							</CardTitle>
							<CardDescription className="font-['Manrope',Helvetica] text-[#607589] text-center">
								We've sent password reset instructions to{" "}
								<span className="font-medium text-[#111416]">
									{email}
								</span>
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
								<p className="text-sm text-blue-800 font-['Manrope',Helvetica] text-center">
									If you don't see the email in your inbox,
									please check your spam folder.
								</p>
							</div>

							<div className="space-y-3">
								<Button
									onClick={handleBackToLogin}
									className="w-full font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white py-2.5"
								>
									Back to Sign In
								</Button>

								<Button
									variant="outline"
									onClick={handleResendEmail}
									className="w-full font-['Manrope',Helvetica] font-medium border-[#111416] text-[#111416] hover:bg-[#111416] hover:text-white"
								>
									Send Another Email
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	// Main forgot password form
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

				{/* Forgot Password Form */}
				<Card className="shadow-lg bg-white">
					<CardHeader>
						<CardTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416] text-center">
							Reset Password
						</CardTitle>
						<CardDescription className="font-['Manrope',Helvetica] text-[#607589] text-center">
							Enter your email address and we'll send you
							instructions to reset your password
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
									value={email}
									onChange={(e) =>
										handleInputChange(e.target.value)
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

						{/* Submit Button */}
						<Button
							onClick={handleSubmit}
							disabled={isSubmitting || !email.trim()}
							className="w-full font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white py-2.5 disabled:opacity-50"
						>
							{isSubmitting ? (
								<div className="flex items-center justify-center">
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
									Sending Reset Email...
								</div>
							) : (
								"Send Reset Instructions"
							)}
						</Button>

						{/* Back to Login */}
						<Button
							variant="ghost"
							onClick={handleBackToLogin}
							disabled={isSubmitting}
							className="w-full font-['Manrope',Helvetica] font-medium text-[#607589] hover:text-[#111416] hover:bg-gray-50"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Sign In
						</Button>
					</CardContent>
				</Card>

				{/* Footer */}
				<div className="text-center">
					<p className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
						Remember your password?{" "}
						<button
							onClick={handleBackToLogin}
							className="text-[#111416] hover:underline bg-transparent border-none cursor-pointer"
						>
							Sign in here
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};
