import React, { useState, useRef, useEffect } from "react";
import { Box, useInput, measureElement } from "ink";

import type { Layout } from "./types";

export interface Props {
	height?: number;
	width?: number;
}

export const Scroller: React.FC<Props> = ({ height, width, children }) => {
	const ref = useRef();

	const [layout, setLayout] = useState<Layout>({
		height: 0,
		width: 0,
	});

	useEffect(() => {
		// @ts-ignore
		setLayout(measureElement(ref.current));
	}, []);

	const [top, setTop] = useState(0);
	const [left, setLeft] = useState(0);
	useInput((input, key) => {
		if (input === "j" || key.downArrow) {
			setTop(Math.min(Infinity /* TODO fix */, top + 1));
		} else if (input === "k" || key.upArrow) {
			setTop(Math.max(0, top - 1));
		}
	});

	return (
		<Box
			// @ts-ignore
			ref={ref}
			height={height}
			width={width}
			flexDirection="column"
			borderStyle="round"
		>
			<Box height={layout.height - 2} width={layout.width - 2 /* (for border) */} overflow="hidden">
				<Box marginTop={-top} marginLeft={-left}>
					{children}
				</Box>
			</Box>
		</Box>
	);
};
