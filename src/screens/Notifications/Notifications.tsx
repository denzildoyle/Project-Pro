import React, { useState } from "react";
import { Header } from "../../components/ui/header";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import {
	Search,
	Bell,
	Users,
	Target,
	BookOpen,
	UserPlus,
	Clock,
	CheckCircle,
	Circle,
	TrafficCone,
} from "lucide-react";

interface Notification {
	id: number;
	type: "match" | "training" | "evaluation" | "drill" | "player";
	title: string;
	message: string;
	timestamp: string;
	isRead: boolean;
	actionUrl: string;
	relatedEntity?: string;
}

// Mock notification data
const notificationsData: Notification[] = [
	{
		id: 1,
		type: "match",
		title: "Upcoming Match Tomorrow",
		message:
			"Match against Eagles FC scheduled for tomorrow at 3:00 PM at Home Stadium",
		timestamp: "2024-08-26T14:30:00Z",
		isRead: false,
		actionUrl: "/matches/123",
		relatedEntity: "Eagles FC vs Lions FC",
	},
	{
		id: 2,
		type: "evaluation",
		title: "Player Evaluations Ready",
		message: "Monthly evaluations for 5 players are ready for your review",
		timestamp: "2024-08-26T09:15:00Z",
		isRead: false,
		actionUrl: "/evaluations",
		relatedEntity: "Player Name",
	},
	{
		id: 3,
		type: "training",
		title: "Training Session This Evening",
		message:
			"Reminder: Training session scheduled for today at 6:00 PM - Field A",
		timestamp: "2024-08-26T08:00:00Z",
		isRead: true,
		actionUrl: "/training/456",
		relatedEntity: "Field A Training",
	},
	{
		id: 4,
		type: "drill",
		title: "New Drill Added",
		message:
			"Coach Martinez added a new drill: 'Advanced Passing Combination'",
		timestamp: "2024-08-25T16:45:00Z",
		isRead: false,
		actionUrl: "/drills/789",
		relatedEntity: "Advanced Passing Combination",
	},
	{
		id: 5,
		type: "player",
		title: "New Player Registered",
		message: "Alex Thompson has been added to the U15 squad",
		timestamp: "2024-08-25T11:20:00Z",
		isRead: true,
		actionUrl: "/players/101",
		relatedEntity: "Alex Thompson - U15",
	},
	{
		id: 6,
		type: "match",
		title: "Match Result Updated",
		message:
			"Match result vs Panthers FC has been updated with final scores",
		timestamp: "2025-08-24T20:30:00Z",
		isRead: true,
		actionUrl: "/matches/122",
		relatedEntity: "Panthers FC vs Lions FC",
	},
	{
		id: 7,
		type: "evaluation",
		title: "Evaluation Deadline Approaching",
		message: "3 player evaluations are due by end of week",
		timestamp: "2025-08-24T10:00:00Z",
		isRead: false,
		actionUrl: "/evaluations",
		relatedEntity: "3 pending evaluations",
	},
	{
		id: 8,
		type: "training",
		title: "Training Cancelled",
		message:
			"Tomorrow's training session has been cancelled due to weather conditions",
		timestamp: "2025-08-23T15:30:00Z",
		isRead: true,
		actionUrl: "/training/457",
		relatedEntity: "Weather Cancellation",
	},
];

export const Notifications = (): JSX.Element => {
	const [notifications, setNotifications] =
		useState<Notification[]>(notificationsData);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState<string>("all");
	const [filterStatus, setFilterStatus] = useState<string>("all");

	// Handle notification click
	const handleNotificationClick = (notification: Notification) => {
		// Mark as read when clicked
		setNotifications((prev) =>
			prev.map((n) =>
				n.id === notification.id ? { ...n, isRead: true } : n
			)
		);

		// In a real app, you would navigate to the actionUrl
		console.log(`Navigating to: ${notification.actionUrl}`);
		alert(`Navigating to: ${notification.relatedEntity}`);
	};

	// Toggle read status
	const toggleReadStatus = (id: number, event: React.MouseEvent) => {
		event.stopPropagation();
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
		);
	};

	// Mark all as read
	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
	};

	// Filter notifications
	const filteredNotifications = notifications.filter((notification) => {
		const matchesSearch =
			notification.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			notification.message
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			(notification.relatedEntity
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()) ??
				false);

		const matchesType =
			filterType === "all" || notification.type === filterType;
		const matchesStatus =
			filterStatus === "all" ||
			(filterStatus === "read" && notification.isRead) ||
			(filterStatus === "unread" && !notification.isRead);

		return matchesSearch && matchesType && matchesStatus;
	});

	// Get notification type icon and color
	const getNotificationIcon = (type: string) => {
		switch (type) {
			case "match":
				return <Target className="w-5 h-5" />;
			case "training":
				return <Users className="w-5 h-5" />;
			case "evaluation":
				return <BookOpen className="w-5 h-5" />;
			case "drill":
				return <TrafficCone className="w-5 h-5" />;
			case "player":
				return <UserPlus className="w-5 h-5" />;
			default:
				return <Bell className="w-5 h-5" />;
		}
	};

	const getNotificationColor = (type: string) => {
		switch (type) {
			case "match":
				return "bg-blue-100 text-blue-800";
			case "training":
				return "bg-green-100 text-green-800";
			case "evaluation":
				return "bg-purple-100 text-purple-800";
			case "drill":
				return "bg-orange-100 text-orange-800";
			case "player":
				return "bg-cyan-100 text-cyan-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	// Format timestamp
	const formatTimestamp = (timestamp: string) => {
		const date = new Date(timestamp);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffInMinutes = Math.floor(diffMs / (1000 * 60));
		const diffInHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffInDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		const diffInWeeks = Math.floor(diffInDays / 7);
		const diffInMonths = Math.floor(diffInDays / 30);
		const diffInYears = Math.floor(diffInMonths / 12);

		if (diffInHours < 1) {
			return `${diffInMinutes} min ago`;
		} else if (diffInHours < 24) {
			return `${diffInHours} hr ago`;
		} else if (diffInDays < 7) {
			return `${diffInDays} day ago`;
		} else if (diffInWeeks < 4) {
			return `${diffInWeeks} wks ago`;
		} else if (diffInMonths < 12) {
			return `${diffInMonths} mth ago`;
		} else {
			return `${diffInYears} yr ago`;
		}
	};

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	return (
		<div>
			<div className="flex flex-wrap justify-between gap-3 p-4">
				<div className="flex min-w-72 flex-col gap-3">
					<div className="flex items-center gap-3">
						<p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight font-['Manrope',Helvetica]">
							Notifications
						</p>
						{unreadCount > 0 && (
							<Badge variant="destructive" className="text-sm">
								{unreadCount} unread
							</Badge>
						)}
					</div>
					<p className="text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
						Stay updated with matches, training sessions,
						evaluations, and team updates
					</p>
				</div>
				<Button
					onClick={markAllAsRead}
					variant="outline"
					className="font-['Manrope',Helvetica] font-medium"
					disabled={unreadCount === 0}
				>
					<CheckCircle className="w-4 h-4 mr-2" />
					Mark All Read
				</Button>
			</div>

			{/* Search and Filters */}
			<div className="p-4">
				<div className="bg-white rounded-lg shadow-sm border border-[#dbe0e5] p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						{/* Search */}
						<div className="lg:col-span-3 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#60758a] w-4 h-4" />
							<Input
								placeholder="Search notifications..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10 font-['Manrope',Helvetica]"
							/>
						</div>

						{/* Type Filter */}
						<Select
							value={filterType}
							onValueChange={setFilterType}
						>
							<SelectTrigger className="font-['Manrope',Helvetica]">
								<SelectValue placeholder="Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value="all"
									className="font-['Manrope',Helvetica]"
								>
									All Types
								</SelectItem>
								<SelectItem
									value="match"
									className="font-['Manrope',Helvetica]"
								>
									Matches
								</SelectItem>
								<SelectItem
									value="training"
									className="font-['Manrope',Helvetica]"
								>
									Training
								</SelectItem>
								<SelectItem
									value="evaluation"
									className="font-['Manrope',Helvetica]"
								>
									Evaluations
								</SelectItem>
								<SelectItem
									value="drill"
									className="font-['Manrope',Helvetica]"
								>
									Drills
								</SelectItem>
								<SelectItem
									value="player"
									className="font-['Manrope',Helvetica]"
								>
									Players
								</SelectItem>
							</SelectContent>
						</Select>

						{/* Status Filter */}
						<Select
							value={filterStatus}
							onValueChange={setFilterStatus}
						>
							<SelectTrigger className="font-['Manrope',Helvetica]">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value="all"
									className="font-['Manrope',Helvetica]"
								>
									All Status
								</SelectItem>
								<SelectItem
									value="unread"
									className="font-['Manrope',Helvetica]"
								>
									Unread
								</SelectItem>
								<SelectItem
									value="read"
									className="font-['Manrope',Helvetica]"
								>
									Read
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* Notifications List */}
			<div className="p-4">
				<div className="space-y-3">
					{filteredNotifications.map((notification) => (
						<Card
							key={notification.id}
							onClick={() =>
								handleNotificationClick(notification)
							}
							className={`cursor-pointer hover:shadow-lg transition-all duration-200 border border-[#dbe0e5] ${
								notification.isRead
									? "bg-white"
									: "bg-blue-50 border-blue-200"
							}`}
						>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between gap-4">
									<div className="flex items-start gap-3 flex-1">
										{/* Read/Unread Indicator */}
										<button
											onClick={(e) =>
												toggleReadStatus(
													notification.id,
													e
												)
											}
											className="mt-1 hover:bg-gray-100 rounded-full p-1 transition-colors"
										>
											{notification.isRead ? (
												<Circle className="w-4 h-4 text-gray-400" />
											) : (
												<Circle className="w-4 h-4 text-blue-500 fill-blue-500" />
											)}
										</button>

										{/* Notification Icon */}
										<div
											className={`p-2 rounded-lg ${getNotificationColor(
												notification.type
											)}`}
										>
											{getNotificationIcon(
												notification.type
											)}
										</div>

										{/* Content */}
										<div className="flex-1 min-w-0">
											<div className="flex items-start justify-between gap-2 mb-1">
												<CardTitle
													className={`font-['Manrope',Helvetica] text-lg text-[#111418] line-clamp-1 ${
														!notification.isRead
															? "font-bold"
															: "font-semibold"
													}`}
												>
													{notification.title}
												</CardTitle>
												<div className="flex flex-col items-end gap-1 flex-shrink-0">
													<div className="flex items-center gap-1 text-xs text-[#60758a] font-['Manrope',Helvetica]">
														<Clock className="w-3 h-3" />
														{formatTimestamp(
															notification.timestamp
														)}
													</div>
												</div>
											</div>

											<CardDescription
												className={`font-['Manrope',Helvetica] text-[#607589] line-clamp-2 mb-4 ${
													!notification.isRead
														? "text-[#111418]"
														: ""
												}`}
											>
												{notification.message}
											</CardDescription>

											{/* Type and Entity */}
											<div className="flex items-center gap-2">
												<Badge
													variant="outline"
													className={`text-xs ${getNotificationColor(
														notification.type
													)}`}
												>
													{notification.type
														.charAt(0)
														.toUpperCase() +
														notification.type.slice(
															1
														)}
												</Badge>
												{notification.relatedEntity && (
													<span className="text-xs text-[#60758a] font-['Manrope',Helvetica]">
														{
															notification.relatedEntity
														}
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							</CardHeader>
						</Card>
					))}
				</div>

				{filteredNotifications.length === 0 && (
					<div className="text-center py-12">
						<Bell className="w-16 h-16 text-[#60758a] mx-auto mb-4" />
						<p className="text-[#60758a] text-lg font-['Manrope',Helvetica]">
							No notifications found.
						</p>
						<p className="text-[#60758a] text-sm font-['Manrope',Helvetica] mt-2">
							Try adjusting your search or filters.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
