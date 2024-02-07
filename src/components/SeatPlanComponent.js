import { useContext } from "react";
import { SeatPlanContext } from "../SeatPlanContext";
import "./SeatPlanComponent.css";

export const SeatPlanComponent = () => {
  const { seatPlan, selectSeat, selectedSeat } = useContext(SeatPlanContext);

  console.log(selectedSeat);
  const renderSeatPlan = (row) => {
    return (
      <div className="row">
        {row.map((seat) => {
          return renderSeat(seat);
        })}
      </div>
    );
  };

  const renderSeat = (seat) => {
    if (!seat) return <div className="seat"></div>;
    return (
      <button
        className={`seat ${seat.class} ${seat.occupied ? "occupied" : ""} ${
          seat.id === selectedSeat ? "selected" : ""
        }`}
        disabled={seat.occupied}
        onClick={() => selectSeat(seat.id)}
      >
        {seat.seat_number}
      </button>
    );
  };

  return seatPlan.map((row) => {
    return renderSeatPlan(row);
  });
};
