import { ReactElement } from "react";
import { VirtualScrollContainerContainerProps } from "../typings/VirtualScrollContainerProps";
import { VirtualScrollContainerComponent } from "./components/VirtualScrollContainerComponent";
import "./ui/VirtualScrollContainer.css";

export function VirtualScrollContainer(props: VirtualScrollContainerContainerProps): ReactElement {
    return (
        <VirtualScrollContainerComponent
            widgetName={props.name}
            widgetClass={props.class}
            data={props.data}
            content={props.content}
        ></VirtualScrollContainerComponent>
    );
}
