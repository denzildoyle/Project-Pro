import { useState } from "react";
import { Button } from "../../components/ui/button";
import { MoreVertical, Plus } from "lucide-react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";

interface User {
	id: number;
	name: string;
	email: string;
	role: "coach" | "parent" | "admin";
	status: "active" | "inactive";
	dateCreated: Date;
	lastUpdated: Date;
}

const mockUsers: User[] = [
	{
		id: 1,
		name: "Denzil Doyle",
		email: "denzil@example.com",
		role: "coach",
		status: "active",
		dateCreated: new Date("2024-01-15"),
		lastUpdated: new Date("2024-08-20"),
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "parent",
		status: "active",
		dateCreated: new Date("2024-02-10"),
		lastUpdated: new Date("2024-07-15"),
	},
	{
		id: 3,
		name: "Admin User",
		email: "admin@example.com",
		role: "admin",
		status: "inactive",
		dateCreated: new Date("2023-12-01"),
		lastUpdated: new Date("2024-06-30"),
	},
];

const formatDate = (date: Date): string => {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const getRoleBadgeClasses = (role: string): string => {
	const baseClasses =
		"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

	switch (role) {
		case "admin":
			return `${baseClasses} bg-purple-100 text-purple-800`;
		case "coach":
			return `${baseClasses} bg-blue-100 text-blue-800`;
		case "parent":
			return `${baseClasses} bg-green-100 text-green-800`;
		default:
			return `${baseClasses} bg-gray-100 text-gray-800`;
	}
};

export const UserManagement = (): JSX.Element => {
	const [users, setUsers] = useState<User[]>(mockUsers);
	const [openDropdown, setOpenDropdown] = useState<number | null>(null);

	const handleActivate = (id: number) => {
		setUsers(
			users.map((user) =>
				user.id === id
					? { ...user, status: "active", lastUpdated: new Date() }
					: user
			)
		);
		setOpenDropdown(null);
	};

	const handleDeactivate = (id: number) => {
		setUsers(
			users.map((user) =>
				user.id === id
					? { ...user, status: "inactive", lastUpdated: new Date() }
					: user
			)
		);
		setOpenDropdown(null);
	};

	const handleChangeEmail = (id: number) => {
		// Placeholder for change email functionality
		const newEmail = prompt("Enter new email address:");
		if (newEmail) {
			setUsers(
				users.map((user) =>
					user.id === id
						? { ...user, email: newEmail, lastUpdated: new Date() }
						: user
				)
			);
		}
		setOpenDropdown(null);
	};

	const handleResendInvite = (id: number) => {
		// Placeholder for resend invite functionality
		alert(`Invite resent to user ID: ${id}`);
		setOpenDropdown(null);
	};

	const handleDeleteUser = (id: number) => {
		// Placeholder for delete user functionality
		if (window.confirm("Are you sure you want to delete this user?")) {
			setUsers(users.filter((user) => user.id !== id));
		}
		setOpenDropdown(null);
	};

	const handleAddCoach = () => {
		// Placeholder for add coach functionality
		alert("Add Coach functionality to be implemented");
	};

	const toggleDropdown = (userId: number) => {
		setOpenDropdown(openDropdown === userId ? null : userId);
	};

	return (
		<div>
			{/* Header */}
			<div className="flex flex-wrap justify-between gap-3 p-4">
				<div className="flex min-w-72 flex-col gap-3">
					<p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight font-['Manrope',Helvetica]">
						User Management
					</p>
					<p className="text-[#60758a] text-sm font-normal leading-normal font-['Manrope',Helvetica]">
						Manage users, roles, and permissions
					</p>
				</div>
				<div className="flex items-start gap-3">
					<Button
						onClick={handleAddCoach}
						className="flex items-center gap-2"
					>
						<Plus className="h-4 w-4" />
						Add Coach
					</Button>
				</div>
			</div>
			<div className="bg-white rounded-lg border border-[#dbe0e5] overflow-x-auto">
				<Table className="min-w-[800px]">
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date Created</TableHead>
							<TableHead>Last Updated</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">
									{user.name}
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<span
										className={getRoleBadgeClasses(
											user.role
										)}
									>
										{user.role.charAt(0).toUpperCase() +
											user.role.slice(1)}
									</span>
								</TableCell>
								<TableCell>
									<span
										className={
											user.status === "active"
												? "text-green-600 font-medium"
												: "text-gray-400"
										}
									>
										{user.status.charAt(0).toUpperCase() +
											user.status.slice(1)}
									</span>
								</TableCell>
								<TableCell className="text-sm text-gray-600">
									{formatDate(user.dateCreated)}
								</TableCell>
								<TableCell className="text-sm text-gray-600">
									{formatDate(user.lastUpdated)}
								</TableCell>
								<TableCell>
									<div className="relative">
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												toggleDropdown(user.id)
											}
											className="h-8 w-8 p-0"
										>
											<MoreVertical className="h-4 w-4" />
										</Button>

										{openDropdown === user.id && (
											<div className="absolute right-0 top-8 z-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
												<div className="py-1">
													{user.status ===
													"active" ? (
														<button
															onClick={() =>
																handleDeactivate(
																	user.id
																)
															}
															className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
														>
															Deactivate User
														</button>
													) : (
														<button
															onClick={() =>
																handleActivate(
																	user.id
																)
															}
															className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
														>
															Activate User
														</button>
													)}
													<button
														onClick={() =>
															handleChangeEmail(
																user.id
															)
														}
														className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
													>
														Change Email
													</button>
													<button
														onClick={() =>
															handleResendInvite(
																user.id
															)
														}
														className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
													>
														Resend Invite
													</button>
													<button
														onClick={() =>
															handleDeleteUser(
																user.id
															)
														}
														className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
													>
														Delete User
													</button>
												</div>
											</div>
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
