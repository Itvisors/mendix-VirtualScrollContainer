import { ListValue, ListWidgetValue } from "mendix";
import { ReactElement } from "react";

export interface VirtualScrollContainerComponentProps {
    widgetName: string;
    widgetClass: string;
    data: ListValue;
    content: ListWidgetValue;
}

export function VirtualScrollContainerComponent(props: VirtualScrollContainerComponentProps): ReactElement {
    let className = props.widgetClass + " virtual-scroll-container ";
    const { data, content } = props;
    if (!data.items) {
        className += " empty-list";
        return <div className={className}></div>;
    }
    return (
        <div className={className}>
            {data.items.map((item, index) => (
                <div key={item.id} className={`virtual-scroll-container-item item-${index}`}>
                    {content.get(item)}
                </div>
            ))}
        </div>
    );
}
