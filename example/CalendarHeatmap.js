import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import Svg, { G, Line, Rect, Text } from "react-native-svg";
import { SQUARE_SIZE, HOURS_IN_DAY } from "./utils/constants";
import {
  getMonthLabelCoordinates,
  getTransformForDay,
  getSquareCoordinates,
  getTitleForIndex,
  getFillColor,
  getTooltipDataAttrsForIndex,
  getHeight,
  getWidth,
  getDateCount,
  getLabelDay,
  getFillStroke,
} from "./utils/utils";

const CalendarHeatmap = (props) => {
  const {
    values,
    gutterSize,
    horizontal,
    endDate,
    startDate,
    titleForValue,
    tooltipDataAttrs,
    onPress,
    showMonthLabels,
    monthLabelsStyle,
    startLeafWetness,
    squareColor,
    squareColorStroke,
    keyCountValue,
  } = props;

  getValueCache = (values) => {
    const valuesFormatted = {};
    values.map((value) => {
      let currentDate = new Date(value.date * 1000);
      let currentHour = currentDate.getHours();
      let index =
        (getDateCount(startDate, currentDate) - 1) * HOURS_IN_DAY + currentHour;
      valuesFormatted[index] = { content: true, start: true };

      _.range(value[keyCountValue]).map((itter) => {
        const updatedIndex = index + itter + 1;
        valuesFormatted[updatedIndex] = { content: true, start: false };
      });
    });

    return valuesFormatted;
  };

  useEffect(() => {
    setValueCache(getValueCache(values));
  }, [values]);

  const [valueCache, setValueCache] = useState(getValueCache(values));

  handleClick = (value) => {
    if (onPress) {
      onPress(value);
    }
  };

  renderSquare = (dayIndex, index) => {
    const [x, y] = getSquareCoordinates(dayIndex, horizontal, gutterSize);
    const fillColor = getFillColor(index, valueCache, squareColor);
    const fillColorStroke = getFillStroke(index, valueCache, squareColorStroke);
    return (
      <React.Fragment key={index}>
        {valueCache[index] && valueCache[index].start && (
          <Line
            x1={x + 30}
            y1={y + 12}
            x2={x + 40}
            y2={y + 12}
            stroke={startLeafWetness}
            strokeWidth="8"
          />
        )}
        <Rect
          width={SQUARE_SIZE}
          height={SQUARE_SIZE}
          x={x + 30}
          y={y + 11}
          title={getTitleForIndex(index, valueCache, titleForValue)}
          onPress={() => handleClick(index)}
          fill={fillColor}
          stroke={fillColorStroke}
          {...getTooltipDataAttrsForIndex(index, valueCache, tooltipDataAttrs)}
        />
      </React.Fragment>
    );
  };

  renderWeek = (weekIndex) => {
    const [x, y] = getTransformForDay(
      weekIndex,
      horizontal,
      gutterSize,
      showMonthLabels
    );
    return (
      <G key={weekIndex} x={x} y={y}>
        {_.range(HOURS_IN_DAY).map((dayIndex) =>
          renderSquare(dayIndex, weekIndex * HOURS_IN_DAY + dayIndex)
        )}
      </G>
    );
  };

  renderAllWeeks = () => {
    return _.range(getDateCount(startDate, endDate)).map((weekIndex) =>
      renderWeek(weekIndex)
    );
  };

  renderDaysLabels = () => {
    if (!showMonthLabels) {
      return null;
    }
    const dayRange = _.range(getDateCount(startDate, endDate));
    return dayRange.map((weekIndex) => {
      const [x, y] = getMonthLabelCoordinates(
        weekIndex,
        horizontal,
        gutterSize
      );
      return weekIndex % 5 === 0 ? (
        <Text
          {...monthLabelsStyle}
          key={weekIndex}
          x={x + 21}
          y={y + 16}
          stroke="gray"
          fill="gray"
        >
          {getLabelDay(startDate, weekIndex)}
        </Text>
      ) : null;
    });
  };

  renderHourLabels = () => {
    if (!showMonthLabels) {
      return null;
    }
    const hourRange = _.range(HOURS_IN_DAY);
    return hourRange.map((hourIndex) => {
      const [x, y] = getMonthLabelCoordinates(hourIndex, false, gutterSize);
      return hourIndex % 4 === 0 ? (
        <Text
          {...monthLabelsStyle}
          key={hourIndex}
          x={x}
          y={y + 30}
          stroke="gray"
          fill="gray"
        >
          {`${hourIndex < 10 ? `0${hourIndex}` : hourIndex}h`}
        </Text>
      ) : null;
    });
  };

  return (
    <ScrollView horizontal={true}>
      <Svg
        height={getHeight(gutterSize + 2, showMonthLabels, horizontal) + 20}
        width={getWidth(startDate, endDate, gutterSize) + 5}
        style={{ overflow: "scroll" }}
      >
        <G>{renderDaysLabels()}</G>
        <G>{renderHourLabels()}</G>
        <G>{renderAllWeeks()}</G>
      </Svg>
    </ScrollView>
  );
};

CalendarHeatmap.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]).isRequired,
    }).isRequired
  ).isRequired,
  numDays: PropTypes.number, // number of days back from endDate to show
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]), // end of date range
  gutterSize: PropTypes.number, // size of space between squares
  horizontal: PropTypes.bool, // whether to orient horizontally or vertically
  showMonthLabels: PropTypes.bool, // whether to show month labels
  monthLabelsColor: PropTypes.string,
  showOutOfRangeDays: PropTypes.bool, // whether to render squares for extra days in week after endDate, and before start date
  tooltipDataAttrs: PropTypes.oneOfType([PropTypes.object, PropTypes.func]), // data attributes to add to square for setting 3rd party tooltips, e.g. { 'data-toggle': 'tooltip' } for bootstrap tooltips
  titleForValue: PropTypes.func, // function which returns title text for value
  classForValue: PropTypes.func, // function which returns html class for value
  onPress: PropTypes.func, // callback function when a square is clicked
  startLeafWetness: PropTypes.string,
  fillColor: PropTypes.string,
  fillColorStroke: PropTypes.string,
};

CalendarHeatmap.defaultProps = {
  numDays: 200,
  endDate: new Date(),
  gutterSize: 2,
  horizontal: true,
  showMonthLabels: true,
  monthLabelsColor: "black",
  showOutOfRangeDays: false,
  startLeafWetness: "#00FF",
  squareColor: "#16C559",
  squareColorStroke: "#008633",
  classForValue: (value) => (value ? "black" : "#8cc665"),
  onPress: () => console.log("change onPress prop"),
};

export default CalendarHeatmap;
