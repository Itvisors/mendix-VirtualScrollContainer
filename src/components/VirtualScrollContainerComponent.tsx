import { ListValue, ListWidgetValue } from "mendix";
import { ReactElement, ReactNode, useRef, useEffect } from "react";

export interface VirtualScrollContainerComponentProps {
    widgetName: string;
    widgetClass: string;
    data: ListValue;
    content: ListWidgetValue;
}

interface refDataType {
    currentScrollPosition: number;
    itemsLoadedCount: number;
    listRows: ReactNode[] | undefined;
    hasMoreItems: boolean;
}

export function VirtualScrollContainerComponent(props: VirtualScrollContainerComponentProps): ReactElement {
    const layoutRef = useRef<HTMLDivElement>(null);
    // Store all datasource related data
    // useRef i.s.o. useState as useRef will not trigger a render after the value is updated
    const dataRef = useRef<refDataType>({
        currentScrollPosition: 0,
        itemsLoadedCount: 0,
        listRows: undefined,
        hasMoreItems: false
    });

    let className = props.widgetClass + " virtual-scroll-container ";
    const { data } = props;

    useEffect(() => {
        const container = layoutRef.current;
        if (!container) {
            return;
        }

        const frameId = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // console.info("Scroll to:", scrollPositionRef.current);
                container.scrollTop = dataRef.current.currentScrollPosition;
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
        // console.info("Scroll position stored:", container.scrollTop);
        dataRef.current.currentScrollPosition = container.scrollTop;
    };

    if (!data.items) {
        className += " empty-list";
        return <div className={className}></div>;
    }

    const { content } = props;
    dataRef.current.listRows = data.items.map((item, index) => (
        <div key={item.id} className={`virtual-scroll-container-item item-${index}`}>
            {content.get(item)}
        </div>
    ));
    return (
        <div className={className} ref={layoutRef} onScroll={handleScroll}>
            {dataRef.current.listRows}
        </div>
    );
}
