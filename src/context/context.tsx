import React, { createContext, useReducer, useContext, Dispatch, useEffect } from "react";

import { ActionType, StateType, Props, ContextType } from "../@types/context";
import { reducer } from "./reducer";
import { getGoogleResults, getSOAnswers } from "../api";
import open from "open";
const initialState: StateType = {
	selectedId: null,
	googleSearchResults: [],
	userInput: null,
	isSearchComplete: false,
	isDetailsOpen: false,
	selectedAnswerIdx: 0,
	stackOverflowResults: [],
	error: false,
	screenSize: { columns: process.stdout.columns, rows: process.stdout.rows },
};

const AppCtx = createContext<ContextType>({} as ContextType);

const AppProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState);

	// Set the dimensions on resize of the terminal
	useEffect(() => {
		function onResize() {
			dispatch({ type: "SET_SCREEN_SIZE", payload: { columns: process.stdout.columns, rows: process.stdout.rows } });
		}
		process.stdout.on("resize", onResize);
		return () => {
			process.stdout.off("resize", onResize);
		};
	}, []);

	const openBrowser = async (id: string) => {
		await open(`https://stackoverflow.com/questions/${id}`);
	};

	const googleSearch = async (searchTerm: string) => {
		try {
			const items = await getGoogleResults(searchTerm);
			dispatch({ type: "SET_GOOGLE_RESULTS", payload: items });
			dispatch({ type: "SET_SEARCH_COMPLETE" });
		} catch (error) {
			dispatch({ type: "ERROR" });
			console.log(error);
		}
	};
	const getDetails = async (id: string, title: string) => {
		const answers = await getSOAnswers(id);
		dispatch({ type: "SET_SO_RESULTS", payload: answers });
		dispatch({ type: "SET_DETAILS", payload: "open" });
	};
	const setInput = async (input: string) => {
		dispatch({ type: "SET_USER_INPUT", payload: input });
		await googleSearch(input);
		dispatch({ type: "SET_SEARCH_COMPLETE" });
	};

	return (
		<AppCtx.Provider value={{ state, googleSearch, setInput, dispatch, getDetails, openBrowser }}>
			{children}
		</AppCtx.Provider>
	);
};

export const useGlobalCtx = () => {
	return useContext(AppCtx);
};

export { AppProvider, AppCtx };

// stackOverflowResults: [
// 	"**Hit** the &lt;kbd&gt;Esc&lt;/kbd&gt; key to enter &quot;Normal mode&quot;. Then you can type `:` to enter &quot;Command-line mode&quot;. A colon (`:`) will appear at the bottom of the screen and you can type in one of the following commands. To execute a command, press the &lt;kbd&gt;Enter&lt;/kbd&gt; key.\r\n\r\n* `:q`  to quit",
// 	"By default, Vim (and at least some other implementations of vi, such as nvi), return 0 if a &quot;normal&quot; error occurs, such as an invalid command or another normal user input error.  It _is_ the behavior of ed to exit nonzero in such a case, and as you&#39;ve found, that behavior is generally undesirable because humans are imperfect and make many mistakes, which is why Vim doesn&#39;t do that.\r\n\r\nVim should exit nonzero if you use `:cq`, which has this behavior intentionally, as well as if certain error conditions are met (e.g., you run `vim -y` but the display cannot be started.\r\n\r\nIt is possible you have a configuration setting or plugin that causes this behavior.  You can try running with `vim -u NONE -U NONE` to verify this, and then isolate the problem by commenting out portions of your `.vimrc`.  It is also possible that your Vim distributor thought this would",
// ],
