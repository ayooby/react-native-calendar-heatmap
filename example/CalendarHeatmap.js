import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import Svg, { G, Line, Rect, Text } from "react-native-svg";
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
  getWidth,
  getDateCount,
  getLabelDay
} from "./utils/utils";

const rectColor = ["#eeeeee", "#d6e685", "#8cc665", "#44a340", "#1e6823"];

const CalendarHeatmap = props => {
  const {
    values,
    gutterSize,
    horizontal,
    numDays,
    endDate,
    startDate,
    titleForValue,
    tooltipDataAttrs,
    onPress,
    showOutOfRangeDays,
    monthLabelsColor,
    showMonthLabels,
    monthLabelsStyle,
    monthLabelForIndex,
    colorArray,
  } = props;

  // getValueCache = values => {
  //   const countedArray = getCountByDuplicateValues(values);
  //   return _.reduce(
  //     values,
  //     (memo, value) => {
  //       const date = convertToDate(value.date);
  //       const index = Math.floor(
  //         (date - getStartDateWithEmptyDays(numDays, endDate)) /
  //           MILLISECONDS_IN_ONE_DAY
  //       );
  //       memo[index] = {
  //         value: value
  //       };
  //       if (memo[index].value.count) {
  //         memo[index].countedArray = memo[index].value;
  //       } else {
  //         const count = _.find(countedArray, { key: memo[index].value.date });
  //         memo[index].countedArray = count;
  //       }

  //       return memo;
  //     },
  //     {}
  //   );
  // };

  getValueCache = values => {
    const valuesFormatted = {}
    // const getRangeDate = getDateCount(startDate, endDate);
    values.map(value => {
      let currentDate = new Date(value.datetime);
      let currentHour = currentDate.getHours();
      console.log('current', currentHour);
      let index = (getDateCount(startDate, currentDate) + 1) * 24 + currentHour;
      console.log(index);
      valuesFormatted[index] = { content: true, start: true }
      
      _.range(value['molhamento-foliar']).map(itter => {
        const updatedIndex = index + itter + 1;
        valuesFormatted[updatedIndex] = { content: true, start: false }
      });
    });

    return valuesFormatted;
  }

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
    // const indexOutOfRange =
    //   index < getNumEmptyDaysAtStart(numDays, endDate) ||
    //   index >= getNumEmptyDaysAtStart(numDays, endDate) + numDays;
    // if (indexOutOfRange && !showOutOfRangeDays) {
    //   return null;
    // }
    const [x, y] = getSquareCoordinates(dayIndex, horizontal, gutterSize);
    const fillColor = getFillColor(index, valueCache, colorArray);
    return (
      <React.Fragment key={index}>
        {valueCache[index] && valueCache[index].start && (
          <Line 
            x1={x + 25} 
            y1={y + 12} 
            x2={x + 35} 
            y2 ={y + 12}
            stroke="#FFEE02" 
            strokeWidth="3"
          />
        )}
        <Rect
          width={SQUARE_SIZE}
          height={SQUARE_SIZE}
          x={x + 25}
          y={y + 12}
          title={getTitleForIndex(index, valueCache, titleForValue)}
          onPress={() => handleClick(index)}
          fill={fillColor}
          {...getTooltipDataAttrsForIndex(index, valueCache, tooltipDataAttrs)}
        />
      </React.Fragment>
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
    return _.range(getDateCount(startDate, endDate)).map(weekIndex =>
      renderWeek(weekIndex)
    );
  };

  // renderDaysLabels = () => {
  //   if (!showMonthLabels) {
  //     return null;
  //   }
  //   const weekRange = _.range(getWeekCount(numDays, endDate) - 1); // don't render for last week, because label will be cut off
  //   return weekRange.map(weekIndex => {
  //     console.log('week index', weekIndex);
  //     const endOfWeek = shiftDate(
  //       getStartDateWithEmptyDays(numDays, endDate),
  //       (weekIndex + 1) * DAYS_IN_WEEK
  //     );
  //     const [x, y] = getMonthLabelCoordinates(
  //       weekIndex,
  //       horizontal,
  //       gutterSize,
  //     );
  //     // return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
  //     return weekIndex % 3 === 0 ? (
  //       <Text
  //         {...monthLabelsStyle}
  //         key={weekIndex}
  //         x={x}
  //         y={y + 16}
  //         stroke={monthLabelsColor}
  //       >
  //         {monthLabelForIndex
  //           ? monthLabelForIndex(endOfWeek.getMonth())
  //           : MONTH_LABELS[endOfWeek.getMonth()]}
  //       </Text>
  //     ) : null;
  //   });
  // };

  renderDaysLabels = () => {
    if (!showMonthLabels) {
      return null;
    }
    const dayRange = _.range(getDateCount(startDate, endDate)); 
    return dayRange.map(weekIndex => {
      const [x, y] = getMonthLabelCoordinates(
        weekIndex,
        horizontal,
        gutterSize,
      );
      // return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
      return weekIndex % 5 === 0 ? (
        <Text
          {...monthLabelsStyle}
          key={weekIndex}
          x={x + 22}
          y={y + 16}
          stroke={monthLabelsColor}
        >
          {/* {monthLabelForIndex
            ? monthLabelForIndex(endOfWeek.getMonth())
            : MONTH_LABELS[endOfWeek.getMonth()]} */}
          {getLabelDay(startDate, weekIndex)}
        </Text>
      ) : null;
    });
  };

  renderHourLabels = () => {
    if (!showMonthLabels) {
      return null;
    }
    const hourRange = _.range(DAYS_IN_WEEK); 
    return hourRange.map(hourIndex => {
      const [x, y] = getMonthLabelCoordinates(
        hourIndex,
        false,
        gutterSize,
      );
      // return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
      return hourIndex % 4 === 0 ? (
        <Text
          {...monthLabelsStyle}
          key={hourIndex}
          x={x}
          y={y + 30}
          stroke={monthLabelsColor}
        >
          {/* {monthLabelForIndex
            ? monthLabelForIndex(endOfWeek.getMonth())
            : MONTH_LABELS[endOfWeek.getMonth()]} */}
          {`${hourIndex}h`}
        </Text>
      ) : null;
    });
  };

  return (
    <ScrollView horizontal={true}>
      <Svg
        height={getHeight(gutterSize + 2, showMonthLabels, horizontal)}
        width={getWidth(startDate, endDate, gutterSize)}
        style={{overflow:"scroll"}}
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
    // array of objects with date and arbitrary metadata
    PropTypes.shape({
      datetime: PropTypes.oneOfType([
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
  gutterSize: 2,
  horizontal: true,
  showMonthLabels: true,
  monthLabelsColor: 'black',
  showOutOfRangeDays: false,
  colorArray: rectColor,
  classForValue: value => (value ? "black" : "#8cc665"),
  onPress: () => console.log("change onPress prop")
};

export default CalendarHeatmap;
