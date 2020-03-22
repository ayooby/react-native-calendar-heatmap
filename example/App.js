import React, { Fragment } from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import CalendarHeatmap from "@freakycoder/react-native-calendar-heatmap";
import { staticData } from "./staticData/staticData";

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ margin: 16 }}>
            <Text style={{ fontWeight: "600", fontSize: 16, color: "#D44B79" }}>
              Red One
            </Text>
            <CalendarHeatmap
              endDate={new Date("2019-03-25")}
              numDays={100}
              colorArray={["#eee", "#D44B79", "#6B1928", "#9F3251", "#360000"]}
              values={staticData}
            />
          </View>
          <View style={{ margin: 16 }}>
            <Text style={{ fontWeight: "600", fontSize: 16, color: "#656ac6" }}>
              Blue One
            </Text>
            <CalendarHeatmap
              endDate={new Date("2019-03-25")}
              numDays={100}
              colorArray={["#eee", "#bcd6f7", "#656ac6", "#393b99", "#191c5c"]}
              values={staticData}
            />
          </View>
          <View style={{ margin: 16 }}>
            <Text style={{ fontWeight: "600", fontSize: 16, color: "#8cc665" }}>
              Default
            </Text>
            <CalendarHeatmap
              endDate={new Date("2019-03-25")}
              numDays={100}
              values={staticData}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
