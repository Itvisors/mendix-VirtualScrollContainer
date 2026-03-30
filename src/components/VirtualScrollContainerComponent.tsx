import { ListValue, ListWidgetValue } from "mendix";
import { ReactElement, useRef, useEffect } from "react";

export interface VirtualScrollContainerComponentProps {
    widgetName: string;
    widgetClass: string;
    data: ListValue;
    content: ListWidgetValue;
}

export function VirtualScrollContainerComponent(props: VirtualScrollContainerComponentProps): ReactElement {
    const layoutRef = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef<number>(0);

    let className = props.widgetClass + " virtual-scroll-container ";
    const { data, content } = props;

    useEffect(() => {
        const container = layoutRef.current;
        if (!container) {
            return;
        }

        const frameId = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // console.info("Scroll herstellen naar:", scrollPositionRef.current);
                container.scrollTop = scrollPositionRef.current;
            });
        });

        return (): void => {
            cancelAnimationFrame(frameId);
        };
    }, [data.items]);

    const handleScroll = (): void => {
        const container = layoutRef.current;
        if (!container) {
            return;
        }
        // console.info("Scroll positie opgeslagen:", container.scrollTop);
        scrollPositionRef.current = container.scrollTop;
    };

    if (!data.items) {
        className += " empty-list";
        return <div className={className}></div>;
    }

    return (
        <div className={className} ref={layoutRef} onScroll={handleScroll}>
            {data.items.map((item, index) => (
                <div key={item.id} className={`virtual-scroll-container-item item-${index}`}>
                    {content.get(item)}
                </div>
            ))}
        </div>
    );
}
