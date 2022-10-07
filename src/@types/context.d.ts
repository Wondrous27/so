import type { Answer, SearchItemType } from "../api";

export type ScreenType = {
	rows: number;
	columns: number;
};

export type StateType = {
	selectedId: string?;
	googleSearchResults: SearchItemType[];
	userInput: string?;
	isSearchComplete: Boolean;
	isDetailsOpen: Boolean;
	stackOverflowResults: Answer[];
	selectedAnswerIdx: number;
	error: Boolean;
	screenSize: ScreenType;
};

export type ActionType =
	| { type: "SET_SEARCH_COMPLETE" }
	| { type: "SET_SEARCH_AGAIN" }
	| { type: "SET_GOOGLE_RESULTS"; payload: SearchItemType[] }
	| { type: "SET_SO_RESULTS"; payload: Answer[] }
	| { type: "SET_USER_INPUT"; payload: string }
	| { type: "SET_DETAILS"; payload: string }
	| { type: "SET_SELECTED_ANSWER"; payload: string }
	| { type: "SET_SCREEN_SIZE"; payload: ScreenType }
	| { type: "ERROR" };

export type Props = {
	children?: React.ReactNode;
};

export type ContextType = {
	state: StateType;
	googleSearch: (searchTerm: string) => void;
	setInput: (input: string) => void;
	getDetails: (id: string, title: string) => void;
	dispatch: Dispatch<ActionType>;
	openBrowser: (id: string) => void;
};
