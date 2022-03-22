import React, { Fragment } from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
// import CalendarHeatmap from "@freakycoder/react-native-calendar-heatmap";
import CalendarHeatmap from './CalendarHeatmap';
import { staticData } from "./staticData/staticData";

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ margin: 16 }}>
            <CalendarHeatmap
              startDate={new Date("2019-01-01")}
              endDate={new Date("2019-02-05")}
              colorArray={["#fff", "#16C559", "#6B1928", "#9F3251", "#360000"]}
              values={staticData}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
