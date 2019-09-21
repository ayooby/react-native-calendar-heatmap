import React, { Fragment } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import CalendarHeatmap from "./lib/src/CalendarHeatmap";

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CalendarHeatmap
          endDate={new Date("2019-03-25")}
          numDays={100}
          values={[
            { date: "2019-02-01" },
            { date: "2019-02-01" },
            { date: "2019-01-01" },
            { date: "2019-01-01" },
            { date: "2019-01-01" },
            { date: "2019-01-01" },
            { date: "2019-01-02" },
            { date: "2019-01-01" },
            { date: "2019-01-01" },
            { date: "2019-01-21" },
            { date: "2019-01-21" },
            { date: "2019-01-21" },
            { date: "2019-01-21" },
            { date: "2019-01-21" },
            { date: "2019-01-21" },
            { date: "2019-01-21" },
            { date: "2019-01-21" },
            { date: "2019-01-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-02-21" },
            { date: "2019-03-05" }
          ]}
        />
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
