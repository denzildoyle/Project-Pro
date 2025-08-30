import { useState } from "react";
import { Button } from "../../components/ui/button";

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
}

const mockUsers: User[] = [
	{
		id: 1,
		name: "Denzil Doyle",
		email: "denzil@example.com",
		role: "coach",
		status: "active",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "parent",
		status: "active",
	},
	{
		id: 3,
		name: "Admin User",
		email: "admin@example.com",
		role: "admin",
		status: "inactive",
	},
];

export const UserManagement = (): JSX.Element => {
	const [users, setUsers] = useState<User[]>(mockUsers);

	const handleActivate = (id: number) => {
		setUsers(
			users.map((user) =>
				user.id === id ? { ...user, status: "active" } : user
			)
		);
	};

	const handleDeactivate = (id: number) => {
		setUsers(
			users.map((user) =>
				user.id === id ? { ...user, status: "inactive" } : user
			)
		);
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
			</div>
			<div className="bg-white rounded-lg border border-[#dbe0e5] overflow-x-auto">
				<Table className="min-w-[600px]">
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<span
										className={
											user.status === "active"
												? "text-green-600"
												: "text-gray-400"
										}
									>
										{user.status}
									</span>
								</TableCell>
								<TableCell>
									{user.status === "active" ? (
										<Button
											variant="outline"
											size="sm"
											onClick={() =>
												handleDeactivate(user.id)
											}
										>
											Deactivate
										</Button>
									) : (
										<Button
											variant="secondary"
											size="sm"
											onClick={() =>
												handleActivate(user.id)
											}
										>
											Activate
										</Button>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
