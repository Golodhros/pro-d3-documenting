## Modules

<dl>
<dt><a href="#module_Bar">Bar</a></dt>
<dd><p>Bar Chart Reusable API component that renders a
simple and configurable bar chart.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#BarData">BarData</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
</dl>

<a name="module_Bar"></a>

## Bar
Bar Chart Reusable API component that renders a
simple and configurable bar chart.

**Requires**: <code>module:d3</code>  
**Example**  
```js
const barChart = bar();

barChart
    .height(500)
    .width(800);

d3Selection.select('.css-selector')
    .datum(dataset)
    .call(barChart);
```

* [Bar](#module_Bar)
    * [exports(_selection, _data)](#exp_module_Bar--exports) ⏏
        * [.height([_x])](#module_Bar--exports.height) ⇒ <code>Number</code> \| <code>Module</code>
        * [.margin(_x)](#module_Bar--exports.margin) ⇒ <code>Object</code> \| <code>Module</code>
        * [.on()](#module_Bar--exports.on) ⇒ <code>Module</code>
        * [.width([_x])](#module_Bar--exports.width) ⇒ <code>Number</code> \| <code>Module</code>

<a name="exp_module_Bar--exports"></a>

### exports(_selection, _data) ⏏
This function creates the chart using the selection as container

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| _selection | <code>D3Selection</code> | A d3 selection that represents                                      the container(s) where the chart(s) will be rendered |
| _data | [<code>BarData</code>](#BarData) | The data to attach and generate the chart |

<a name="module_Bar--exports.height"></a>

#### exports.height([_x]) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the height of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current height or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>500</code> | Desired height for the chart |

<a name="module_Bar--exports.margin"></a>

#### exports.margin(_x) ⇒ <code>Object</code> \| <code>Module</code>
Gets or Sets the margin of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Object</code> \| <code>Module</code> - Current margin or Chart module to chain calls  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| _x | <code>Object</code> | Margin object to get/set, either complete of containing one direction |

<a name="module_Bar--exports.on"></a>

#### exports.on() ⇒ <code>Module</code>
Exposes an 'on' method that acts as a bridge with the event dispatcher
We are going to expose this events:
customMouseOver, customMouseMove, customMouseOut, and customMouseClick

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Module</code> - Bar Chart  
**Access**: public  
<a name="module_Bar--exports.width"></a>

#### exports.width([_x]) ⇒ <code>Number</code> \| <code>Module</code>
Gets or Sets the width of the chart

**Kind**: static method of [<code>exports</code>](#exp_module_Bar--exports)  
**Returns**: <code>Number</code> \| <code>Module</code> - Current width or Chart module to chain calls  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [_x] | <code>Number</code> | <code>960</code> | Desired width for the graph |

<a name="BarData"></a>

## BarData : <code>Array.&lt;Object&gt;</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| letter | <code>String</code> | Name of the letter (required) |
| frequency | <code>Number</code> | Value of its frequency (required) |

**Example**  
```js
[
    {
        letter: 'A',
        frequency: 0.08167
    },
    {
        letter: 'B',
        frequency: 0.01492
    }
]
```
