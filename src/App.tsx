import type React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { App as RemoveBGApp } from "./remove_bg/src/App.tsx";

const App: React.FC = () => {
	return (
		<HelmetProvider>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/remove_bg" element={<RemoveBGApp />} />
				</Routes>
			</Router>
		</HelmetProvider>
	);
};

export default App;
