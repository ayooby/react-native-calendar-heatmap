import React, { Fragment } from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
// import CalendarHeatmap from "@freakycoder/react-native-calendar-heatmap";
import CalendarHeatmap from "./CalendarHeatmap";
import { staticData } from "./staticData/staticData";

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ margin: 16 }}>
            <CalendarHeatmap
              startDate={new Date("2022-03-12")}
              endDate={new Date("2022-03-27")}
              values={staticData}
              keyCountValue="leaf-wetness"
              startColorCountRange="#00FF"
              squareColor="#16C559"
              squareColorStroke="#008633"
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
