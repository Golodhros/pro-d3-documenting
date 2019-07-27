import * as d3 from 'd3';

import './barChart.css';

/**
 * @typedef BarData
 * @type {Object[]}
 * @property {String} letter        Name of the letter (required)
 * @property {Number} frequency     Value of its frequency (required)
 *
 * @example
 * [
 *     {
 *         letter: 'A',
 *         frequency: 0.08167
 *     },
 *     {
 *         letter: 'B',
 *         frequency: 0.01492
 *     }
 * ]
 */

/**
 * Bar Chart reusable API class that renders a
 * simple and configurable bar chart.
 *
 * @module Bar
 * @tutorial bar
 * @requires d3-array
 * @requires d3-axis
 * @requires d3-dispatch
 * @requires d3-scale
 * @requires d3-selection
 *
 * @example
 * var barChart = bar();
 *
 * barChart
 *     .height(500)
 *     .width(800);
 *
 * d3Selection.select('.css-selector')
 *     .datum(dataset)
 *     .call(barChart);
 *
 */
function bar() {
    let data;
    let svg;
    let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };
    let width = 960;
    let height = 500;
    let chartWidth;
    let chartHeight;
    let xScale;
    let yScale;
    let xAxis;
    let yAxis;

    // Dispatcher object to broadcast the mouse events
    const dispatcher = d3.dispatch('customMouseOver', 'customMouseMove', 'customMouseOut', 'customMouseClick');

    // extractors
    const getFrequency = ({frequency}) => frequency;
    const getLetter = ({letter}) => letter;

    /**
     * This function creates the chart using the selection as container
     * @param  {D3Selection} _selection     A d3 selection that represents
     *                                      the container(s) where the chart(s) will be rendered
     * @param {BarData} _data               The data to attach and generate the chart
     * @private
     */
    function exports(_selection){
        _selection.each(function(_data){
            data = _data;
            chartHeight = height - margin.top - margin.bottom;
            chartWidth = width - margin.left - margin.right;

            buildScales();
            buildAxes();
            buildSVG(this);
            drawAxes();
            drawBars();
        });
    }

    /**
     * Creates the d3 x and y axes, setting orientations
     * @private
     */
    function buildAxes(){
        xAxis = d3.axisBottom(xScale);

        yAxis = d3.axisLeft(yScale)
            .ticks(10, '%');
    }

    /**
     * Builds containers for the chart, the axes and a wrapper for all of them
     * Also applies the Margin convention
     * @private
     */
    function buildContainerGroups(){
        let container = svg
          .append('g')
            .classed('container-group', true)
            .attr(
                'transform',
                `translate(${margin.left},${margin.top})`
            );

        container
          .append('g')
            .classed('chart-group', true);
        container
          .append('g')
            .classed('x-axis-group axis', true);
        container
          .append('g')
            .classed('y-axis-group axis', true);
    }

    /**
     * Creates the x and y scales of the graph
     * @private
     */
    function buildScales(){
        xScale = d3.scaleBand()
            .rangeRound([0, chartWidth])
            .padding(0.1)
            .domain(data.map(getLetter));

        yScale = d3.scaleLinear()
            .rangeRound([chartHeight, 0])
            .domain([0, d3.max(data, getFrequency)]);
    }

    /**
     * Builds the SVG element that will contain the chart
     * @param  {HTMLElement} container  DOM element that will work as the container of the graph
     * @private
     */
    function buildSVG(container){
        if (!svg) {
            svg = d3.select(container)
              .append('svg')
                .classed('bar-chart', true);

            buildContainerGroups();
        }
        svg
            .attr('width', width)
            .attr('height', height);
    }

    /**
     * Draws the x and y axis on the svg object within their
     * respective groups
     * @private
     */
    function drawAxes(){
        svg.select('.x-axis-group.axis')
            .attr('transform', `translate(0,${chartHeight})`)
            .call(xAxis);

        svg.select('.y-axis-group.axis')
            .call(yAxis)
              .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end')
                .text('Frequency');
    }

    /**
     * Uses D3.js enter/update/exit patter to draw the bars along the x axis
     * @return {void}
     * @private
     */
    function drawBars(){
        let bars = svg.select('.chart-group').selectAll('.bar')
            .data(data);

        // Enter
        bars.enter()
          .append('rect')
            .classed('bar', true)
            .attr('x', ({letter}) => xScale(letter))
            .attr('y', ({frequency}) => yScale(frequency))
            .attr('width', xScale.bandwidth())
            .attr('height', ({frequency}) => chartHeight - yScale(frequency))
            .on('mouseover', function(d) {
                dispatcher.call('customMouseOver', this, d);
            })
            .on('mousemove', function(d) {
                dispatcher.call('customMouseMove', this, d);
            })
            .on('mouseout', function(d) {
                dispatcher.call('customMouseOut', this, d);
            })
            .on('click', function(d) {
                dispatcher.call('customMouseClick', this, d);
            });

        // Exit
        bars.exit()
            .style('opacity', 0)
            .remove();
    }

    // API
    /**
     * Gets or Sets the height of the chart
     * @param  {Number} [_x=500]    Desired height for the chart
     * @return {Number | Module}    Current height or Chart module to chain calls
     * @public
     */
    exports.height = function(_x) {
        if (!arguments.length) {
            return height;
        }
        height = _x;

        return this;
    };

    /**
     * Gets or Sets the margin of the chart
     * @param  {Object} _x          Margin object to get/set, either complete of containing one direction
     * @return {Object | Module}    Current margin or Chart module to chain calls
     * @public
     */
    exports.margin = function(_x) {
        if (!arguments.length) {
            return margin;
        }
        margin = {
            ...margin,
            ..._x
        };

        return this;
    };

    /**
     * Exposes an 'on' method that acts as a bridge with the event dispatcher
     * We are going to expose this events:
     * customMouseOver, customMouseMove, customMouseOut, and customMouseClick
     *
     * @return {Module} Bar Chart
     * @public
     */
    exports.on = function() {
        let value = dispatcher.on.apply(dispatcher, arguments);

        return value === dispatcher ? exports : value;
    };

    /**
     * Gets or Sets the width of the chart
     * @param  {Number} [_x=960]        Desired width for the graph
     * @return {Number | Module}        Current width or Chart module to chain calls
     * @public
     */
    exports.width = function(_x) {
        if (!arguments.length) {
            return width;
        }
        width = _x;

        return this;
    };

    return exports;
};

export default bar;
