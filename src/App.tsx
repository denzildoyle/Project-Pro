import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StitchDesign } from "./screens/StitchDesign";
import { PlayerAssessment } from "./screens/PlayerAssessment";
import { AssessmentDetail } from "./screens/AssessmentDetail";
import { PlayerReport } from "./screens/PlayerReport";
import { Training } from "./screens/Training";

export const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StitchDesign />} />
        <Route path="/training" element={<Training />} />
        <Route path="/player/:playerId/assessment" element={<PlayerAssessment />} />
        <Route path="/player/:playerId/assessment/:assessmentId" element={<AssessmentDetail />} />
        <Route path="/player/:playerId/report" element={<PlayerReport />} />
      </Routes>
    </Router>
  );
};