import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "./navigation-menu";
import { Button } from "../../components/ui/button";
import { Bell } from "lucide-react";

interface HeaderProps {
	role: "coach" | "parent" | "public";
}

export const Header = ({ role }: HeaderProps): JSX.Element => {
	const coachMenu = [
		{ label: "Players", href: "#" },
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

	return (
		<header className="flex items-center justify-between px-10 py-3 border-b border-[#e5e8ea] w-full">
			{/* Logo and Brand Name */}
			<div className="flex items-center gap-4">
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
			</div>

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
					<Button
						variant="secondary"
						className="flex max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f5] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#e4e7ea]"
					>
						<Bell className="w-5 h-5" />
					</Button>
					{/* User Avatar */}
					<Avatar className="h-10 w-10">
						<AvatarImage
							src="..//depth-4--frame-2.png"
							alt="User profile"
						/>
						<AvatarFallback></AvatarFallback>
					</Avatar>
				</div>
			</div>
		</header>
	);
};
