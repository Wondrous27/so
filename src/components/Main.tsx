import { Box } from "ink";
import React from "react";
import { useGlobalCtx } from "../context/context";
import SearchResults from "./SearchResults";
import UserInput from "./UserInput";

const Main: React.FC = () => {
	const { state } = useGlobalCtx();
	return <Box flexDirection={"column"}>{state.isSearchComplete ? <SearchResults /> : <UserInput />}</Box>;
};

export default Main;
