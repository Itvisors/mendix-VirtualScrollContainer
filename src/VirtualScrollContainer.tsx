import { ReactElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { VirtualScrollContainerContainerProps } from "../typings/VirtualScrollContainerProps";

import "./ui/VirtualScrollContainer.css";

export function VirtualScrollContainer({ sampleText }: VirtualScrollContainerContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
