import React, { useState, createContext, useContext } from "react";

// Context for managing tab state
interface TabsContextType {
	activeTab: string;
	setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

// Main Tabs container component
interface TabsProps {
	defaultValue: string;
	children: React.ReactNode;
	className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
	defaultValue,
	children,
	className = "",
}) => {
	const [activeTab, setActiveTab] = useState(defaultValue);

	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div className={className}>{children}</div>
		</TabsContext.Provider>
	);
};

// TabsList component - renders the tab navigation
interface TabsListProps {
	children: React.ReactNode;
	className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({
	children,
	className = "",
}) => {
	return (
		<div
			className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
			role="tablist"
		>
			{children}
		</div>
	);
};

// TabsTrigger component - individual tab button
interface TabsTriggerProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
	value,
	children,
	className = "",
}) => {
	const context = useContext(TabsContext);

	if (!context) {
		throw new Error("TabsTrigger must be used within a Tabs component");
	}

	const { activeTab, setActiveTab } = context;
	const isActive = activeTab === value;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isActive}
			data-state={isActive ? "active" : "inactive"}
			className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
			onClick={() => setActiveTab(value)}
		>
			{children}
		</button>
	);
};

// TabsContent component - renders content for active tab
interface TabsContentProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
	value,
	children,
	className = "",
}) => {
	const context = useContext(TabsContext);

	if (!context) {
		throw new Error("TabsContent must be used within a Tabs component");
	}

	const { activeTab } = context;

	if (activeTab !== value) {
		return null;
	}

	return (
		<div
			role="tabpanel"
			data-state={activeTab === value ? "active" : "inactive"}
			className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
			tabIndex={0}
		>
			{children}
		</div>
	);
};

// Export all components as named exports
export { Tabs as default };
