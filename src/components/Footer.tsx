import { Box, Text, useInput, useApp } from "ink";
import React from "react";

const Footer: React.FC = () => {
	const { exit } = useApp();
	useInput((_, key) => {
		if (key.escape) {
			exit();
		}
	});
	const footer = "Press Enter to open in browser, use arrow keys or HJKL to navigate, q to go back, ESC to exit.";
	return (
		<Box marginBottom={1} marginTop={1}>
			<Text bold color={"gray"}>
				{footer}
			</Text>
		</Box>
	);
};

export default Footer;
