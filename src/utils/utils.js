import { shiftDate, getBeginningTimeForDate, convertToDate } from "./helpers";
import {
  SQUARE_SIZE,
  MONTH_LABELS,
  DAYS_IN_WEEK,
  MONTH_LABEL_GUTTER_SIZE,
  MILLISECONDS_IN_ONE_DAY
} from "./utils/constants";

function getTooltipDataAttrsForValue(value, tooltipDataAttrs) {
  if (typeof tooltipDataAttrs === "function") return tooltipDataAttrs(value);
  return tooltipDataAttrs;
}

function getTooltipDataAttrsForIndex(index, valueCache, tooltipDataAttrs) {
  if (valueCache[index]) {
    return valueCache[index].tooltipDataAttrs;
  }
  return getTooltipDataAttrsForValue(
    { date: null, count: null },
    tooltipDataAttrs
  );
}

function getClassNameForIndex(index, valueCache, rectColor) {
  if (valueCache[index]) return rectColor[valueCache[index].value.count];
  return rectColor[0];
}

function getTitleForIndex(index, valueCache, titleForValue) {
  if (valueCache[index]) return valueCache[index].title;
  return titleForValue ? titleForValue(null) : null;
}

function getSquareCoordinates(dayIndex, horizontal, gutterSize) {
  if (horizontal) return [0, dayIndex * getSquareSizeWithGutter(gutterSize)];
  return [dayIndex * getSquareSizeWithGutter(gutterSize), 0];
}

function getTransformForWeek(weekIndex, horizontal, gutterSize) {
  if (horizontal) {
    return [weekIndex * getSquareSizeWithGutter(gutterSize), 50];
  }
  return [10, weekIndex * getSquareSizeWithGutter(gutterSize)];
}

function getMonthLabelSize(showMonthLabels, horizontal) {
  if (!showMonthLabels) {
    return 0;
  } else if (horizontal) {
    return SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE;
  }
  return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE);
}

function getSquareSizeWithGutter(gutterSize) {
  return SQUARE_SIZE + gutterSize;
}

function getMonthLabelCoordinates(
  weekIndex,
  horizontal,
  gutterSize,
  showMonthLabels,
  horizontal
) {
  if (horizontal) {
    return [
      weekIndex * getSquareSizeWithGutter(gutterSize),
      getMonthLabelSize(showMonthLabels, horizontal) - MONTH_LABEL_GUTTER_SIZE
    ];
  }
  const verticalOffset = -2;
  return [
    0,
    (weekIndex + 1) * getSquareSizeWithGutter(gutterSize) + verticalOffset
  ];
}

function getStartDateWithEmptyDays(numDays, endDate) {
  return shiftDate(
    getStartDate(numDays, endDate),
    -getNumEmptyDaysAtStart(numDays, endDate)
  );
}

function getEndDate(endDate) {
  return getBeginningTimeForDate(convertToDate(endDate));
}

function getStartDate(numDays, endDate) {
  return shiftDate(getEndDate(endDate), -numDays + 1); // +1 because endDate is inclusive
}

function getNumEmptyDaysAtEnd(endDate) {
  return DAYS_IN_WEEK - 1 - getEndDate(endDate).getDay();
}

function getNumEmptyDaysAtStart(numDays, endDate) {
  return getStartDate(numDays, endDate).getDay();
}

function getWeekCount(numDays, endDate) {
  const numDaysRoundedToWeek =
    numDays +
    getNumEmptyDaysAtStart(numDays, endDate) +
    getNumEmptyDaysAtEnd(endDate);
  return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
}

export default {
  getWeekCount,
  getStartDateWithEmptyDays,
  getMonthLabelCoordinates,
  getTransformForWeek,
  getNumEmptyDaysAtStart,
  getSquareCoordinates,
  getTitleForIndex,
  getClassNameForIndex,
  getTooltipDataAttrsForIndex
};
