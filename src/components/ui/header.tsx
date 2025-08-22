import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "./navigation-menu";
import { Button } from "../../components/ui/button";
import {
	Bell,
	User as UserIcon,
	Users as UsersIcon,
	LogOut as ArrowRightOnRectangleIcon,
} from "lucide-react";

interface HeaderProps {
	role: "coach" | "parent" | "public";
}

export const Header = ({ role }: HeaderProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);

	const coachMenu = [
		{ label: "Players", href: "/" },
		{ label: "Training", href: "/training" },
		{ label: "Matches", href: "/matches" },
		{ label: "Drills", href: "/drills" },
		{ label: "Global Rating", href: "#" },
	];

	const parentMenu = [
		{ label: "Training", href: "/training" },
		{ label: "Matches", href: "/matches" },
		{ label: "Reports", href: "#" },
	];

	const publicMenu = [
		{ label: "Training", href: "/training" },
		{ label: "Matches", href: "/matches" },
	];

	const menu =
		role === "coach"
			? coachMenu
			: role === "parent"
			? parentMenu
			: publicMenu;

	const handleLogout = () => {
		// Add your logout logic here
		console.log("Logging out...");
		setIsOpen(false);
	};

	return (
		<header className="flex items-center justify-between px-10 py-3 border-b border-[#e5e8ea] w-full">
			{/* Logo and Brand Name */}
			<a href="/" className="flex items-center gap-4">
				<div className="size-4">
					<svg
						viewBox="0 0 48 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
							fill="currentColor"
						/>
					</svg>
				</div>
				<h1 className="font-bold text-lg text-[#111416] font-['Manrope',Helvetica] leading-[23px]">
					Project Pro
				</h1>
			</a>

			{/* Navigation and User Section */}
			<div className="flex flex-1 justify-end gap-8">
				<div className="hidden md:flex items-center gap-9">
					{/* Navigation Menu */}
					<NavigationMenu className="max-w-none">
						<NavigationMenuList className="flex gap-9">
							{menu.map((item, index) => (
								<NavigationMenuItem key={index}>
									<NavigationMenuLink
										href={item.href}
										className="font-['Manrope',Helvetica] font-medium text-sm text-[#111416] leading-[21px]"
									>
										{item.label}
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>

					{/* Notification Button */}
					<Button
						variant="secondary"
						className="flex max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f5] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#e4e7ea]"
					>
						<Bell className="w-5 h-5" />
					</Button>

					{/* User Avatar with Dropdown */}
					<div className="relative">
						{/* Avatar Trigger */}
						<div
							className="cursor-pointer"
							onMouseEnter={() => setIsOpen(true)}
						>
							<Avatar className="h-10 w-10">
								<AvatarImage
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt="User profile"
								/>
								<AvatarFallback>SA</AvatarFallback>
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
									onClick={() => setIsOpen(false)}
								>
									<UserIcon className="w-4 h-4 mr-3" />
									Account
								</a>

								<a
									className="flex items-center w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
									href="/user management"
									onClick={() => setIsOpen(false)}
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
				</div>
			</div>
		</header>
	);
};
