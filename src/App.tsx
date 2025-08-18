import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StitchDesign } from "./screens/StitchDesign";
import { PlayerAssessment } from "./screens/PlayerAssessment";
import { AssessmentDetail } from "./screens/AssessmentDetail";
import { PlayerReport } from "./screens/PlayerReport";
import { Training } from "./screens/Training";
import { Registration } from "./screens/Registration";
import { Matches } from "./screens/Matches";
import { Drills } from "./screens/Drills";

export const App = (): JSX.Element => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<StitchDesign />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/training" element={<Training />} />
				<Route path="/matches" element={<Matches />} />
				<Route path="/drills" element={<Drills />} />
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
			</Routes>
		</Router>
	);
};
