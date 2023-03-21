import { shiftDate, getBeginningTimeForDate, convertToDate } from "./helpers";
import {
  SQUARE_SIZE,
  HOURS_IN_DAY,
  DAY_LABEL_GUTTER_SIZE,
  MILLISECONDS_IN_ONE_DAY,
} from "./constants";

function getHourWidth(gutterSize) {
  return HOURS_IN_DAY * getSquareSizeWithGutter(gutterSize);
}

function getWidth(startDate, endDate, gutterSize) {
  return (
    getDateCount(startDate, endDate) * getSquareSizeWithGutter(gutterSize) -
    gutterSize +
    30
  );
}

function getHeight(gutterSize, showDaysLabels, horizontal) {
  return (
    getHourWidth(gutterSize) +
    (getMonthLabelSize(showDaysLabels, horizontal) - gutterSize)
  );
}

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

function getCountByDuplicateValues(array) {
  let hashMap = {};

  for (var item of array) {
    //if that date exists
    if (item.date in hashMap) {
      //up the prev count
      hashMap[item.date] = hashMap[item.date] + 1;
    } else {
      hashMap[item.date] = 1;
    }
  }

  //now we will iterate through those keys of the Map and format it for Array 2
  let outputArray = [];
  Object.keys(hashMap).forEach((key) => {
    outputArray.push({
      key,
      count: hashMap[key],
    });
  });
  return outputArray;
}

function getFillColor(index, valueCache, fillColor) {
  if (valueCache[index]) {
    return fillColor;
  }
  return "#FFFFFF";
}

function getFillStroke(index, valueCache, fillColor) {
  if (valueCache[index]) {
    return fillColor;
  }
  return "#999999";
}

function getTitleForIndex(index, valueCache, titleForValue) {
  if (valueCache[index]) return valueCache[index].title;
  return titleForValue ? titleForValue(null) : null;
}

function getSquareCoordinates(dayIndex, horizontal, gutterSize) {
  if (horizontal) return [0, dayIndex * getSquareSizeWithGutter(gutterSize)];
  return [dayIndex * getSquareSizeWithGutter(gutterSize), 0];
}

function getTransformForDay(dayIndex, horizontal, gutterSize, showDaysLabels) {
  if (horizontal) {
    return [
      dayIndex * getSquareSizeWithGutter(gutterSize),
      getMonthLabelSize(showDaysLabels, horizontal),
    ];
  }
  if (horizontal && !showDaysLabels) {
    return [dayIndex * getSquareSizeWithGutter(gutterSize), 0];
  }
  return [0, dayIndex * getSquareSizeWithGutter(gutterSize)];
}

function getMonthLabelSize(showDaysLabels, horizontal) {
  if (!showDaysLabels) {
    return 0;
  } else if (horizontal) {
    return SQUARE_SIZE + DAY_LABEL_GUTTER_SIZE;
  }
  return 2 * (SQUARE_SIZE + DAY_LABEL_GUTTER_SIZE);
}

function getSquareSizeWithGutter(gutterSize) {
  return SQUARE_SIZE;
}

function getMonthLabelCoordinates(dayIndex, horizontal, gutterSize) {
  if (horizontal) {
    return [dayIndex * getSquareSizeWithGutter(gutterSize), 0];
  }
  const verticalOffset = -2;
  return [
    0,
    (dayIndex + 1) * getSquareSizeWithGutter(gutterSize) + verticalOffset,
  ];
}

function getStartDateWithEmptyHours(numHours, endDate) {
  return shiftDate(
    getStartDate(numHours, endDate),
    -getNumEmptyHoursAtStart(numHours, endDate)
  );
}

function getEndDate(endDate) {
  return getBeginningTimeForDate(convertToDate(endDate));
}

function getStartDate(numHours, endDate) {
  return shiftDate(getEndDate(endDate), -numHours + 1); // +1 because endDate is inclusive
}

function getNumEmptyHoursAtEnd(endDate) {
  return HOURS_IN_DAY - 1 - getEndDate(endDate).getHour();
}

function getNumEmptyHoursAtStart(numHours, endDate) {
  return getStartDate(numHours, endDate).getHour();
}

function getHourCount(numHours, endDate) {
  const numHoursRoundedToHour =
    numHours +
    getNumEmptyHoursAtStart(numHours, endDate) +
    getNumEmptyHoursAtEnd(endDate);
  return Math.ceil(numHoursRoundedToHour / HOURS_IN_DAY);
}

function getDateCount(startDate, endDate) {
  const startDateFormatted = new Date(
    `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`
  );
  const endDateFormatted = new Date(
    `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`
  );
  return Math.round(
    Math.abs(endDateFormatted.getTime() - startDateFormatted.getTime()) /
      MILLISECONDS_IN_ONE_DAY
  );
}

function getLabelDay(startDate, index) {
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + index + 1);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;

  return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}`;
}

export {
  getHourCount,
  getStartDateWithEmptyHours,
  getMonthLabelCoordinates,
  getTransformForDay,
  getNumEmptyHoursAtStart,
  getSquareCoordinates,
  getTitleForIndex,
  getFillColor,
  getCountByDuplicateValues,
  getTooltipDataAttrsForIndex,
  getTooltipDataAttrsForValue,
  getHeight,
  getWidth,
  getDateCount,
  getLabelDay,
  getFillStroke,
};

export default {
  getHourCount,
  getStartDateWithEmptyHours,
  getMonthLabelCoordinates,
  getTransformForDay,
  getNumEmptyHoursAtStart,
  getSquareCoordinates,
  getTitleForIndex,
  getFillColor,
  getCountByDuplicateValues,
  getTooltipDataAttrsForIndex,
  getTooltipDataAttrsForValue,
  getHeight,
  getWidth,
  getDateCount,
  getLabelDay,
  getFillStroke,
};
