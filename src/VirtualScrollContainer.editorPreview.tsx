import { ReactElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { VirtualScrollContainerPreviewProps } from "../typings/VirtualScrollContainerProps";

export function preview({ sampleText }: VirtualScrollContainerPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/VirtualScrollContainer.css");
}
