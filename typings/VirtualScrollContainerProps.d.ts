/**
 * This file was generated from VirtualScrollContainer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { EditableValue, ListValue, ListWidgetValue } from "mendix";

export interface VirtualScrollContainerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data: ListValue;
    content: ListWidgetValue;
    pageSize: number;
    dataChangeDateAttr: EditableValue<Date>;
    widgetActionAttr: EditableValue<string>;
    logToConsole: boolean;
}

export interface VirtualScrollContainerPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    data: {} | { caption: string } | { type: string } | null;
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    pageSize: number | null;
    dataChangeDateAttr: string;
    widgetActionAttr: string;
    logToConsole: boolean;
}
