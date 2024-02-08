import { useContext } from "react";
import { SeatPlanContext } from "../../contexts/SeatPlanContext";

export const SeatComponent = (props) => {
  const { seat, setShowPopup } = props;
  const { setSelectedSeat, selectedSeat } = useContext(SeatPlanContext);
  const handleSelectSeat = (seat) => {
    setShowPopup(seat);
    if (!seat.occupied) setSelectedSeat(seat);
  };

  if (!seat) return <div className="seat aley"></div>;
  if (seat.seat_number === "Exit")
    return <div className={seat.class}>{seat.seat_number}</div>;
  return (
    <button
      className={`seat ${seat.class.replace(" ", "-")}${
        seat.occupied ? " occupied" : ""
      }${seat.id === selectedSeat.id && !seat.occupied ? " selected" : ""}`}
      onClick={() => handleSelectSeat(seat)}
    >
      {seat.seat_number}
    </button>
  );
};
