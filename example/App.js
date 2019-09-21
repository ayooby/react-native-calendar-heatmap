import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";
import CalendarHeatmap from "./lib/src/CalendarHeatmap";

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CalendarHeatmap
          endDate={new Date("2016-04-01")}
          numDays={100}
          values={[
            { date: "2016-01-01" },
            { date: "2016-01-22" },
            { date: "2016-01-30" }
          ]}
        />
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
