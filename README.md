## React-native Calendar Heatmap

<img alt="React Native Calendar Heatmap" src="assets/logo.png" width="1050"/>

[![A calendar heatmap component built on SVG. The component expands to size of container and is super configurable.](https://img.shields.io/badge/-A%20calendar%20heatmap%20component%20built%20on%20SVG.%20The%20component%20expands%20to%20size%20of%20container%20and%20is%20super%20configurable.-lightgrey?style=for-the-badge)](https://github.com/ayooby/react-native-calendar-heatmap)

[![npm version](https://img.shields.io/npm/v/react-native-calendar-heatmap.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-calendar-heatmap)
[![npm](https://img.shields.io/npm/dt/react-native-calendar-heatmap.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-calendar-heatmap)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

<p align="center">
<img alt="React Native Calendar Heatmap" src="https://github.com/ayooby/react-native-calendar-heatmap/blob/master/assets/Screenshots/example.png" width="49.7%"/>
<img alt="React Native Calendar Heatmap" src="https://github.com/ayooby/react-native-calendar-heatmap/blob/master/assets/Screenshots/example-old.png" width="49.7%" />
</p>

## Installation

Add the dependency:

### React Native:

```ruby
npm i react-native-calendar-heatmap
```

## Peer Dependencies

###### IMPORTANT! You need install them.

```
"react": ">= 16.x.x",
"react-native": ">= 0.55.x",
"lodash": ">= 4.17.10",
"react-native-svg": ">= 6.5.2"
```

## Usage


Import the component:

```javascript
import CalendarHeatmap from 'react-native-calendar-heatmap';
```

To show a basic heatmap of 100 days ending on April 1st:

```js
<CalendarHeatmap
  endDate={new Date('2016-04-01')}
  numDays={100}
  values={[
    { date: '2016-01-01' },
    { date: '2016-01-22' },
    { date: '2016-01-30' },
    // ...and so on
  ]}
/>
```

## Custom Colorized Usage

You can check the example for the advanced usage

```js
<CalendarHeatmap
  endDate={new Date("2019-03-25")}
  numDays={100}
  colorArray={["#eee", "#D44B79", "#6B1928", "#9F3251", "#360000"]}
  values={[
    { date: '2016-01-01' },
    { date: '2016-01-22' },
    { date: '2016-01-30' },
    // ...and so on
  ]}
/>
```

## Credits

It inspired by Github's commit calendar graph and [React Calendar Heatmap](https://github.com/patientslikeme/react-calendar-heatmap).

## License

React Native Calendar Heatmap Library is available under the MIT license. See the LICENSE file for more info.
