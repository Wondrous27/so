import React, { useState, useEffect } from "react";
import { UncontrolledTextInput } from "ink-text-input";
import { useGlobalCtx } from "../context/context";
import { Box, Text } from "ink";

const UserInput: React.FC = () => {
	const { setInput } = useGlobalCtx();
	const handleSubmit = (query: string) => {
		setInput(query);
	};
	return (
		<Box>
			<Box marginRight={1}>
				<Text bold color={"blue"}>
					Enter your search query:
				</Text>
			</Box>
			<UncontrolledTextInput onSubmit={handleSubmit} />
		</Box>
	);
};

export default UserInput;
