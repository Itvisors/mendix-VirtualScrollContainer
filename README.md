## VirtualScrollContainer
Virtual Scroll Container

## Features
- Show a list of data
- When the users scrolls down far enough, another page of data is loaded
- Keep scroll position when refreshing data

## Limitations
- Do not place in Layout Grid or Dataview.

## Usage
- Place widget on a blank page, no LayoutGrid or Dataview
- You can place container above and below the widget to create a header and/or footer
- Place content inside the content drop zone
- Set a page size, it should be large enough to show more items than fit in the browser viewport. 50 is usually a good starting point, depending on your row height and reference display size
- Configure the other properties

### Data change date
By default Mendix will reload the datasource, this really happens a lot. So the widget takes control over the datasource.

When you want to reload or refresh the data in the widget, set the `data change date` attribute to `[%CurrentDateTime%]` 

### Widget action
The widget will take the action specified here when the `data change date` attribute receives a new value

Possible values:
- Reload: reload and reset to first page
- Refresh: reload the data loaded earlier, keeping scroll position

The widget does not reset the action attribute value as that would trigger another render
