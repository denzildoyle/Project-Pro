import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
	User as UserIcon,
	Building as BuildingOfficeIcon,
	Users as UsersIcon,
	LogOut as ArrowRightOnRectangleIcon,
} from "lucide-react";

interface UserDropdownProps {
	avatarSrc?: string;
	avatarAlt?: string;
	avatarFallback?: string;
	onLogout?: () => void;
	className?: string;
}

export const UserDropdown = ({
	avatarSrc = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	avatarAlt = "User profile",
	avatarFallback = "SA",
	onLogout,
	className = "",
}: UserDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		setIsOpen(false);
		onLogout?.();
	};

	const closeDropdown = () => {
		setIsOpen(false);
	};

	return (
		<div className={`relative ${className}`}>
			{/* Avatar Trigger */}
			<div
				className="cursor-pointer"
				onMouseEnter={() => setIsOpen(true)}
			>
				<Avatar className="h-10 w-10">
					<AvatarImage src={avatarSrc} alt={avatarAlt} />
					<AvatarFallback>{avatarFallback}</AvatarFallback>
				</Avatar>
			</div>

			{/* Dropdown Menu */}
			{isOpen && (
				<div
					className="absolute z-50 top-full right-0 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 py-1 animate-in fade-in-0 zoom-in-95"
					onMouseEnter={() => setIsOpen(true)}
					onMouseLeave={() => setIsOpen(false)}
				>
					<a
						className="flex items-center w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
						href="/account"
						onClick={closeDropdown}
					>
						<UserIcon className="w-4 h-4 mr-3" />
						Account
					</a>

					<a
						className="flex items-center w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
						href="/user-management"
						onClick={closeDropdown}
					>
						<UsersIcon className="w-4 h-4 mr-3" />
						User Management
					</a>

					<div className="border-t border-gray-100 dark:border-gray-600 my-1"></div>

					<button
						className="flex items-center w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
						onClick={handleLogout}
					>
						<ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
						Log Out
					</button>
				</div>
			)}
		</div>
	);
};
