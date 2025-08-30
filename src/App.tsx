import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Players } from "./screens/Players";
import { PlayerAssessment } from "./screens/PlayerAssessment";
import { AssessmentDetail } from "./screens/AssessmentDetail";
import { PlayerReport } from "./screens/PlayerReport";
import { Training } from "./screens/Training";
import { Registration } from "./screens/Registration";
import { Matches } from "./screens/Matches";
import { Drills } from "./screens/Drills";
import { NotFound } from "./screens/NotFound";
import { Login } from "./screens/Login";
import { ForgotPassword } from "./screens/ForgotPassword";
import { Account } from "./screens/Account";
import { Notifications } from "./screens/Notifications";
import { UserManagement } from "./screens/UserManagement";
import { Header } from "./components/ui/header";

const getPageTitle = (pathname: string): string => {
	if (pathname.startsWith("/training")) return "Training | Project Pro";
	if (pathname.startsWith("/matches")) return "Matches | Project Pro";
	if (pathname.startsWith("/drills")) return "Drills | Project Pro";
	if (pathname.startsWith("/register")) return "Register | Project Pro";
	if (pathname.startsWith("/player")) return "Player | Project Pro";
	return "Project Pro";
};

// Define routes that should not show the header
const noHeaderRoutes = ["/login", "/register", "/forgot-password"];

// Function to check if current path should show header
const shouldShowHeader = (pathname: string): boolean => {
	return !noHeaderRoutes.some((route) => pathname.startsWith(route));
};

function AppRoutes() {
	const location = useLocation();
	const showHeader = shouldShowHeader(location.pathname);

	useEffect(() => {
		document.title = getPageTitle(location.pathname);
	}, [location.pathname]);

	return (
		<div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
			<div className="layout-container flex h-full grow flex-col">
				{showHeader && <Header role="coach" notificationCount={3} />}

				{/* Main Content */}
				<div className="px-4 sm:px-10 lg:px-40 flex flex-1 justify-center py-5">
					<div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
						<Routes>
							<Route path="/" element={<Players />} />
							<Route
								path="/register"
								element={<Registration />}
							/>
							<Route path="/login" element={<Login />} />
							<Route path="/training" element={<Training />} />
							<Route path="/matches" element={<Matches />} />
							<Route path="/drills" element={<Drills />} />
							<Route
								path="/forgot-password"
								element={<ForgotPassword />}
							/>
							<Route path="/account" element={<Account />} />
							<Route
								path="/notifications"
								element={<Notifications />}
							/>
							<Route
								path="/user-management"
								element={<UserManagement />}
							/>

							<Route
								path="/player/:playerId/assessment"
								element={<PlayerAssessment />}
							/>
							<Route
								path="/player/:playerId/assessment/:assessmentId"
								element={<AssessmentDetail />}
							/>
							<Route
								path="/player/:playerId/report"
								element={<PlayerReport />}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
}

export const App = (): JSX.Element => {
	return (
		<Router>
			<AppRoutes />
		</Router>
	);
};
