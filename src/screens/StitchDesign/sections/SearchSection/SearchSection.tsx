import React from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../../components/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const SearchSection = (): JSX.Element => {
	// Navigation menu items data
	const navItems = [
		{ label: "Dashboard", href: "#" },
		{ label: "Players", href: "#" },
		{ label: "Training", href: "#" },
		{ label: "Matches", href: "#" },
		{ label: "Reports", href: "#" },
		{ label: "Drills", href: "#" },
	];

	return (
		<header className="flex items-center justify-between px-10 py-3 border-b border-[#e5e8ea] w-full">
			{/* Logo and Brand Name */}
			<div className="flex items-center gap-4">
				<img
					className="h-6 w-6"
					alt="Project Pro Logo"
					src="/depth-4--frame-0.svg"
				/>
				<h1 className="font-bold text-lg text-[#111416] font-['Manrope',Helvetica] leading-[23px]">
					Project Pro
				</h1>
			</div>

			{/* Navigation and User Section */}
			<div className="flex items-center justify-end gap-8 flex-1">
				{/* Navigation Menu */}
				<NavigationMenu className="max-w-none">
					<NavigationMenuList className="flex gap-9">
						{navItems.map((item, index) => (
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

				{/* User Avatar */}
				<Avatar className="h-10 w-10">
					<AvatarImage
						src="..//depth-4--frame-2.png"
						alt="User profile"
					/>
					<AvatarFallback></AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
};
