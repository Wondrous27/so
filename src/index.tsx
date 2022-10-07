import React from "react";
import { AppProvider } from "./context/context";
import App from "./components/App";

const Index: React.FC<{ name?: string }> = ({ name }) => {
	return (
		<AppProvider>
			<App />
		</AppProvider>
	);
};

export default Index;
