import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import Svg, { G, Rect, Text } from "react-native-svg";
import {
  SQUARE_SIZE,
  MONTH_LABELS,
  DAYS_IN_WEEK,
  MONTH_LABEL_GUTTER_SIZE,
  MILLISECONDS_IN_ONE_DAY
} from "./utils/constants";
import {
  shiftDate,
  getBeginningTimeForDate,
  convertToDate
} from "./utils/helpers";
import {
  getWeekCount,
  getStartDateWithEmptyDays,
  getMonthLabelCoordinates,
  getTransformForWeek,
  getNumEmptyDaysAtStart,
  getSquareCoordinates,
  getTitleForIndex,
  getFillColor,
  getCountByDuplicateValues,
  getTooltipDataAttrsForIndex,
  getTooltipDataAttrsForValue,
  getHeight,
  getWidth
} from "./utils/utils";

const rectColor = ["#eeeeee", "#d6e685", "#8cc665", "#44a340", "#1e6823"];

const CalendarHeatmap = props => {
  const {
    values,
    gutterSize,
    horizontal,
    numDays,
    endDate,
    titleForValue,
    tooltipDataAttrs,
    onPress,
    showOutOfRangeDays,
    monthLabelsColor,
    showMonthLabels,
    colorArray
  } = props;

  getValueCache = values => {
    const countedArray = getCountByDuplicateValues(values);
    return _.reduce(
      values,
      (memo, value) => {
        const date = convertToDate(value.date);
        const index = Math.floor(
          (date - getStartDateWithEmptyDays(numDays, endDate)) /
            MILLISECONDS_IN_ONE_DAY
        );
        memo[index] = {
          value: value
        };
        const count = _.find(countedArray, { key: memo[index].value.date });
        memo[index].countedArray = count;

        return memo;
      },
      {}
    );
  };

  useEffect(() => {
    setValueCache(getValueCache(values));
  }, [values]);

  const [valueCache, setValueCache] = useState(getValueCache(values));

  handleClick = value => {
    if (onPress) {
      onPress(value);
    }
  };

  renderSquare = (dayIndex, index) => {
    const indexOutOfRange =
      index < getNumEmptyDaysAtStart(numDays, endDate) ||
      index >= getNumEmptyDaysAtStart(numDays, endDate) + numDays;
    if (indexOutOfRange && !showOutOfRangeDays) {
      return null;
    }
    const [x, y] = getSquareCoordinates(dayIndex, horizontal, gutterSize);
    const fillColor = getFillColor(index, valueCache, colorArray);
    return (
      <Rect
        key={index}
        width={SQUARE_SIZE}
        height={SQUARE_SIZE}
        x={x}
        y={y}
        title={getTitleForIndex(index, valueCache, titleForValue)}
        onPress={() => handleClick(index)}
        fill={fillColor}
        {...getTooltipDataAttrsForIndex(index, valueCache, tooltipDataAttrs)}
      />
    );
  };

  renderWeek = weekIndex => {
    const [x, y] = getTransformForWeek(weekIndex, horizontal, gutterSize, showMonthLabels);
    return (
      <G key={weekIndex} x={x} y={y}>
        {_.range(DAYS_IN_WEEK).map(dayIndex =>
          renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex)
        )}
      </G>
    );
  };

  renderAllWeeks = () => {
    return _.range(getWeekCount(numDays, endDate)).map(weekIndex =>
      renderWeek(weekIndex)
    );
  };

  renderMonthLabels = () => {
    if (!showMonthLabels) {
      return null;
    }
    const weekRange = _.range(getWeekCount(numDays, endDate) - 1); // don't render for last week, because label will be cut off
    return weekRange.map(weekIndex => {
      const endOfWeek = shiftDate(
        getStartDateWithEmptyDays(numDays, endDate),
        (weekIndex + 1) * DAYS_IN_WEEK
      );
      const [x, y] = getMonthLabelCoordinates(
        weekIndex,
        horizontal,
        gutterSize,
      );
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <Text key={weekIndex} x={x} y={y + 16} stroke={monthLabelsColor}>
          {MONTH_LABELS[endOfWeek.getMonth()]}
        </Text>
      ) : null;
    });
  };

  return (
    <ScrollView>
      <Svg
        height={getHeight(gutterSize, showMonthLabels, horizontal)}
        width={getWidth(numDays, endDate, gutterSize)}
      >
        <G>{renderMonthLabels()}</G>
        <G>{renderAllWeeks()}</G>
      </Svg>
    </ScrollView>
  );
};

CalendarHeatmap.propTypes = {
  values: PropTypes.arrayOf(
    // array of objects with date and arbitrary metadata
    PropTypes.shape({
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date)
      ]).isRequired
    }).isRequired
  ).isRequired,
  numDays: PropTypes.number, // number of days back from endDate to show
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
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
  colorArray: PropTypes.array
};

CalendarHeatmap.defaultProps = {
  numDays: 200,
  endDate: new Date(),
  gutterSize: 1,
  horizontal: true,
  showMonthLabels: true,
  monthLabelsColor: 'black',
  showOutOfRangeDays: false,
  colorArray: rectColor,
  classForValue: value => (value ? "black" : "#8cc665"),
  onPress: () => console.log("change onPress prop")
};

export default CalendarHeatmap;
