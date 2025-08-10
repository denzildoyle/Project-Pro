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
  ];

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 border-b border-[#e5e8ea] w-full">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-2 sm:gap-4">
        <img
          className="h-6 w-6"
          alt="Project Pro Logo"
          src="/depth-4--frame-0.svg"
        />
        <h1 className="font-bold text-base sm:text-lg text-[#111416] font-['Manrope',Helvetica] leading-[23px]">
          Project Pro
        </h1>
      </div>

      {/* Navigation and User Section */}
      <div className="flex items-center justify-end gap-4 sm:gap-6 md:gap-8 flex-1">
        {/* Mobile Menu Button - shown only on mobile */}
        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-[#111416]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Navigation Menu */}
        <NavigationMenu className="max-w-none hidden md:block">
          <NavigationMenuList className="flex gap-6 lg:gap-9">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.href}
                  className="font-['Manrope',Helvetica] font-medium text-sm text-[#111416] leading-[21px] hover:text-[#607589] transition-colors"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Icon */}
        <img className="h-8 sm:h-10 cursor-pointer hover:opacity-70 transition-opacity" alt="Search" src="/depth-4--frame-1.svg" />

        {/* User Avatar */}
        <Avatar className="h-10 w-10">
          <AvatarImage src="..//depth-4--frame-2.png" alt="User profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};