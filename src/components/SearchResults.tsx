import React, { useContext, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import { useGlobalCtx } from "../context/context";
import SelectInput from "ink-select-input";
import Spinner from "ink-spinner";
const GoogleResults: React.FC = () => {
	const { state, getDetails, dispatch } = useGlobalCtx();
	const handleSubmit = (item: any) => {
		getDetails(item.value, item.label);
	};
	useInput((input, _) => {
		if (input === "q") {
			dispatch({ type: "SET_SEARCH_AGAIN" });
		}
	});
	return (
		<Box flexDirection={"column"}>
			<SelectInput items={state.googleSearchResults} onSelect={handleSubmit} />
		</Box>
	);
};

export default GoogleResults;
