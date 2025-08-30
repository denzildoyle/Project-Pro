import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StitchDesign } from "./screens/StitchDesign";
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

const getPageTitle = (pathname: string): string => {
	if (pathname.startsWith("/training")) return "Training | Project Pro";
	if (pathname.startsWith("/matches")) return "Matches | Project Pro";
	if (pathname.startsWith("/drills")) return "Drills | Project Pro";
	if (pathname.startsWith("/register")) return "Register | Project Pro";
	if (pathname.startsWith("/player")) return "Player | Project Pro";
	return "Project Pro";
};

function AppRoutes() {
	const location = useLocation();
	console.log(location);
	useEffect(() => {
		document.title = getPageTitle(location.pathname);
	}, [location.pathname]);

	return (
		<Routes>
			<Route path="/" element={<StitchDesign />} />
			<Route path="/register" element={<Registration />} />
			<Route path="/login" element={<Login />} />
			<Route path="/training" element={<Training />} />
			<Route path="/matches" element={<Matches />} />
			<Route path="/drills" element={<Drills />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/account" element={<Account />} />
			<Route path="/notifications" element={<Notifications />} />
			<Route path="/notifications" element={<Notifications />} />
			<Route path="/user-management" element={<UserManagement />} />

			<Route
				path="/player/:playerId/assessment"
				element={<PlayerAssessment />}
			/>
			<Route
				path="/player/:playerId/assessment/:assessmentId"
				element={<AssessmentDetail />}
			/>
			<Route path="/player/:playerId/report" element={<PlayerReport />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export const App = (): JSX.Element => {
	return (
		<Router>
			<AppRoutes />
		</Router>
	);
};
