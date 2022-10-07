#!/usr/bin/env node
import React from "react";
import { render } from "ink";
// import meow from "meow";
import Index from "./index";

// const cli = meow(`
// 	Usage
// 	  $ so

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ so --name=Jane
// 	  Hello, Jane
// `, {
// 	flags: {
// 		name: {
// 			type: 'string'
// 		}
// 	}
// });

// Display the app in new screen buffer, leave the old one intact
const enterAltScreenCommand = "\x1b[?1049h";
const leaveAltScreenCommand = "\x1b[?1049l";
process.stdout.write(enterAltScreenCommand);
process.on("exit", () => {
  process.stdout.write(leaveAltScreenCommand);
});

render(<Index />);
