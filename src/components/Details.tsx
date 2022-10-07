import React, { useState, useEffect } from "react";
import Markdown from "ink-markdown";
import { Box, Text, Newline, useInput } from "ink";
import { useGlobalCtx } from "../context/context";
import { Scroller } from "./ink-scroller/Scroller";
import { decode } from "html-entities";
const Details = () => {
  const {
    state,
    dispatch,
    state: { stackOverflowResults, selectedAnswerIdx },
    openBrowser,
  } = useGlobalCtx();

  useInput((input, key) => {
    if (input === "q") {
      dispatch({ type: "SET_DETAILS", payload: "close" });
    }
    if (key.leftArrow || input === "h") {
      dispatch({ type: "SET_SELECTED_ANSWER", payload: "left" });
    }
    if (key.rightArrow || input === "l") {
      dispatch({ type: "SET_SELECTED_ANSWER", payload: "right" });
    }
    if (key.return) {
      openBrowser(state.selectedId!);
    }
  });

  return (
    <>
      {/* REFACTOR THIS TO SOMETHING MORE ELEGANT*/}
      {!stackOverflowResults[selectedAnswerIdx] ? <Text>NOT ANSWERED YET</Text> :
        <Box flexDirection={"column"}>
          <Box flexDirection="row" width="100%" justifyContent="space-around" marginY={1}>
            {stackOverflowResults[selectedAnswerIdx]?.is_accepted === true && (
              <Text bold color="green">
                ACCEPTED
              </Text>
            )}
            <Text bold color="blue">
              SCORE: {stackOverflowResults[selectedAnswerIdx]?.score}
            </Text>

            <Text color="gray">
              {stackOverflowResults[selectedAnswerIdx]?.owner.display_name} on{" "}
              {new Date(stackOverflowResults[selectedAnswerIdx]?.creation_date * 1000).toLocaleDateString()}
            </Text>
          </Box>
          <Scroller height={state.screenSize.rows} width={state.screenSize.columns}>
            <Markdown showSectionPrefix={false}>{decode(stackOverflowResults[selectedAnswerIdx]?.body_markdown)}</Markdown>
          </Scroller>
        </Box>
      }
    </>
  );
};

export default Details;
