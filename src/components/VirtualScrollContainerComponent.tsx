import { ListValue, ListWidgetValue, ValueStatus } from "mendix";
import { ReactElement, ReactNode, useRef, useEffect, useMemo } from "react";

export interface VirtualScrollContainerComponentProps {
    widgetName: string;
    widgetClass: string;
    data: ListValue;
    content: ListWidgetValue;
    pageSize: number;
    dataChangeDate: Date | null | undefined;
    widgetAction: string | null | undefined;
    logToConsole: boolean;
}

interface refDataType {
    currentScrollPosition: number;
    currentDataSourceOffset: number;
    itemsLoadedCount: number;
    listRows: ReactNode[] | undefined;
    hasMoreItems: boolean;
    previousDataChangeDateMillis: number;
    previousDatasourceValueStatus: ValueStatus | undefined;
}

const WIDGET_ACTION_RELOAD = "Reload";
const WIDGET_ACTION_REFRESH = "Refresh";

export function VirtualScrollContainerComponent(props: VirtualScrollContainerComponentProps): ReactElement {
    // Prevent the datasource from loading automatically
    // The code must run only at initialization so empty dependency array
    useMemo(() => {
        props.data.setLimit(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // The ref to access the outer Div
    const layoutRef = useRef<HTMLDivElement>(null);

    // Store all datasource related data
    // useRef i.s.o. useState as useRef will not trigger a render after the value is updated
    const dataRef = useRef<refDataType>({
        currentScrollPosition: 0,
        currentDataSourceOffset: 0,
        itemsLoadedCount: 0,
        listRows: undefined,
        hasMoreItems: false,
        previousDataChangeDateMillis: 0,
        previousDatasourceValueStatus: undefined
    });

    const { data, pageSize, dataChangeDate, widgetAction, logToConsole } = props;

    useEffect(() => {
        if (!widgetAction) {
            if (logToConsole) {
                console.info("VirtualScrollContainerComponent: skip empty widget action ");
            }
            return;
        }
        if (!dataChangeDate) {
            if (logToConsole) {
                console.info("VirtualScrollContainerComponent: skip empty data changed date ");
            }
            return;
        }
        if (dataChangeDate.getTime() === dataRef.current.previousDataChangeDateMillis) {
            if (logToConsole) {
                console.info("VirtualScrollContainerComponent: Skip, data changed date not changed");
            }
            return;
        }
        if (logToConsole) {
            console.info("VirtualScrollContainerComponent: process widget action " + widgetAction);
        }
        dataRef.current.previousDataChangeDateMillis = dataChangeDate.getTime();
        switch (widgetAction) {
            case WIDGET_ACTION_RELOAD:
                // Reset datasource info, datasource may skip loading state if it is really fast so set previous value to undefined
                dataRef.current.currentScrollPosition = 0;
                dataRef.current.currentDataSourceOffset = 0;
                dataRef.current.itemsLoadedCount = 0;
                dataRef.current.previousDatasourceValueStatus = undefined;
                // Set to load one page
                data.setLimit(pageSize);
                // Trigger reload
                data.reload();
                break;

            case WIDGET_ACTION_REFRESH:
                // Set to load all data previously loaded
                data.setOffset(0);
                data.setLimit(dataRef.current.itemsLoadedCount);
                dataRef.current.previousDatasourceValueStatus = undefined;
                // Trigger reload
                data.reload();
                break;

            default:
                console.error("VirtualScrollContainerComponent: unsupported widget action " + widgetAction);
                break;
        }
    }, [data, dataChangeDate, widgetAction, logToConsole, pageSize]);

    let className = props.widgetClass + " virtual-scroll-container ";

    useEffect(() => {
        const container = layoutRef.current;
        if (!container) {
            return;
        }

        const frameId = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (logToConsole) {
                    console.info("Scroll to:", dataRef.current.currentScrollPosition);
                }
                container.scrollTop = dataRef.current.currentScrollPosition;
            });
        });

        return (): void => {
            cancelAnimationFrame(frameId);
        };
    }, [data.items, logToConsole]);

    const { content } = props;

    useEffect(() => {
        if (data.status !== dataRef.current.previousDatasourceValueStatus) {
            if (logToConsole) {
                console.info(
                    "VirtualScrollContainerComponent: Datasource status change from " +
                        dataRef.current.previousDatasourceValueStatus +
                        " to " +
                        data.status
                );
            }
            if (data.status === ValueStatus.Available) {
                if (data.items) {
                    if (logToConsole) {
                        console.info("VirtualScrollContainerComponent: Load data");
                    }
                    dataRef.current.itemsLoadedCount = data.items.length;
                    dataRef.current.listRows = data.items.map((item, index) => (
                        <div key={item.id} className={`virtual-scroll-container-item item-${index}`}>
                            {content.get(item)}
                        </div>
                    ));
                    // Turn off auto refresh of the datasource
                    data.setLimit(0);
                } else {
                    if (logToConsole) {
                        console.info("VirtualScrollContainerComponent: No data");
                    }
                    dataRef.current.itemsLoadedCount = 0;
                }
            }
            dataRef.current.previousDatasourceValueStatus = data.status;
        }
    }, [content, data, data.status, logToConsole]);

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

    return (
        <div className={className} ref={layoutRef} onScroll={handleScroll}>
            {dataRef.current.listRows}
        </div>
    );
}
