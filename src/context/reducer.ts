import { StateType, ActionType } from "../@types/context";

export const reducer = (state: StateType, action: ActionType): StateType => {
	switch (action.type) {
		case "SET_USER_INPUT":
			return { ...state, userInput: action.payload };

		case "SET_SEARCH_COMPLETE":
			return { ...state, isSearchComplete: true };

		case "SET_SEARCH_AGAIN":
			return { ...state, isSearchComplete: false };

		case "SET_GOOGLE_RESULTS":
			// REFACTOR: new action with selectedId
			return { ...state, googleSearchResults: action.payload, selectedId: action.payload[0].value };

		case "SET_SO_RESULTS":
			return { ...state, stackOverflowResults: action.payload };

		case "SET_DETAILS":
			if (action.payload === "open") {
				return { ...state, isDetailsOpen: true };
			}
			return { ...state, isDetailsOpen: false };

		case "SET_SELECTED_ANSWER":
			let newIdx = 0;
			if (action.payload === "right") {
				newIdx = (state.selectedAnswerIdx + 1) % state.stackOverflowResults.length;
			} else {
				if (state.selectedAnswerIdx - 1 < 0) {
					newIdx = state.stackOverflowResults.length - 1;
				} else {
					newIdx = state.selectedAnswerIdx - 1;
				}
			}
			return { ...state, selectedAnswerIdx: newIdx };

		case "SET_SCREEN_SIZE":
			const { rows, columns } = action.payload;
			return { ...state, screenSize: { rows, columns } };

		case "ERROR":
			return { ...state, error: true };

		default:
			throw new Error("Error occurred, not found action");
	}
};
