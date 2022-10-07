import { Box } from "ink";
import React, { useState } from "react";
import { useGlobalCtx } from "../context/context";
import Details from "./Details";
import Footer from "./Footer";
import Main from "./Main";

const App: React.FC = () => {
  const { state } = useGlobalCtx();
  return (
    <Box flexDirection="column" width={state.screenSize.columns} height={state.screenSize.rows}>
      {!state.isDetailsOpen ? <Main /> : <Details />}
      <Footer />
    </Box>
  );
};

export default App;
