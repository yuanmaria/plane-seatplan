import "./App.css";
import { useContext, useEffect } from "react";
import { SeatPlanContext } from "./SeatPlanContext";
import { SeatPlanComponent } from "./components/SeatPlanComponent";

function App() {
  const { getSeatPlan, getSeatPlanApi, loading } = useContext(SeatPlanContext);

  useEffect(() => {
    // getSeatPlan();
    getSeatPlanApi();
  }, []);

  return (
    <div className="app">
      <header className="header">
        - Plane Seat Plan -
        <div className="header-sub">Select your desired seat</div>
      </header>
      <div className="content">
        {loading ? "Loading..." : <SeatPlanComponent />}
      </div>
    </div>
  );
}

export default App;
