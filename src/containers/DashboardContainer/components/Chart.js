import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class ProgressChart extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    gap: PropTypes.number,
    dataset: PropTypes.arrayOf({
      percentage: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  };
  static get defaultProps() {
    return {
      colors: ['#486AF0', '#39BB7A', '#FF4545'],
      width: 440,
      height: 480,
      tau: 2 * Math.PI,
      gap: 5,
      dataset: [
        {
          percentage: 42,
          name: 'Q1'
        },
        {
          percentage: 58,
          name: 'Q2'
        },
        {
          percentage: 89,
          name: 'Q3'
        }
      ]
    };
  }

  renderARC = (percentage = 30, index = 0, gap = 10) =>
    d3.svg
      .arc()
      .innerRadius(100 - index * (25 + gap))
      .outerRadius(120 - index * (25 + gap))
      .startAngle(0)
      .endAngle(percentage / 100 * this.props.tau)
      .cornerRadius(20)();

  renderBackground = (index = 0, gap = 10) =>
    d3.svg
      .arc()
      .startAngle(0)
      .endAngle(this.props.tau)
      .innerRadius(100 - index * (25 + gap))
      .outerRadius(120 - index * (25 + gap))();

  renderElement = (item, index) => {
    const { colors, gap, height, width } = this.props;
    const { percentage } = item;
    const positionStart = 10;
    const positionEnd = -(height / 4.7 - (25 + gap) * index);

    const percentageItem =
      index === 0 ? item.percentage - gap : item.percentage - gap / index;
    return (
      <g>
        <path
          style={{ fill: colors[index] }}
          filter="url(#dropshadow)"
          d={this.renderARC(percentage, index, gap)}
        />
        <path
          d={this.renderBackground(index, gap)}
          style={{ fill: colors[index], opacity: 0.2 }}
        />
        <text
          fill="white"
          style={{ fontSize: 14 }}
          transform={`translate(${positionStart}, ${positionEnd})`}
        >
          {item.name}
        </text>
      </g>
    );
  };
  render() {
    const { dataset, width, height, tau, gap } = this.props;
    const transform = `translate(${width / 2},${height / 2})`;

    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="ChartID"
          width={width}
          height={height}
          onClick={this.updateData}
        >
          <g transform={transform}>
            <defs>
              <filter id="dropshadow">
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation={4}
                  result="blur"
                />
                <feOffset in="blur" dx={1} dy={1} result="offsetBlur" />
                <feMerge>
                  <feMergeNode in="offsetBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              <text
                style={{ fontWeight: '900', fontSize: 24 }}
                fill="white"
                transform="translate(-25, 5)"
              >
                63%
              </text>
            </g>
            {dataset.map((item, index) => this.renderElement(item, index))}
          </g>
        </svg>
      </div>
    );
  }
}

export default ProgressChart;
