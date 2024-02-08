import { useContext, useState } from "react";
import { SeatPlanContext } from "../SeatPlanContext";
import "./SeatPlanComponent.css";
import { SeatPopupComponent } from "./SeatPopupComponent/SeatPopupComponent";
import { SeatComponent } from "./SeatComponent/SeatComponent";

export const SeatPlanComponent = () => {
  const { seatPlan, selectedSeat , updateItem, updateItemApi} = useContext(SeatPlanContext);
  const [showPopup, setShowPopup] = useState(null);

  const handleClosePopup = (e) => {
    e.stopPropagation();
    setShowPopup(null);
  };

  const handleBookSeat = () => {
    updateItemApi(selectedSeat.id);
  }

  return (
    <>
      <div className="container">
        <div className="seat-plan">
          {seatPlan.map((row, index) => {
            return (
              <div key={`row-${index + 1}`} className="row">
                {row.map((seat, index) => {
                  return (
                    <SeatComponent
                      key={index}
                      seat={seat}
                      setShowPopup={(val) => setShowPopup(val)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="side-panel">
            <div className="legend-container">
                Legend :
                <div className="legend-content"><div className="legend-item seat first"></div>First Class</div>
                <div className="legend-content"><div className="legend-item seat business"></div>Business Class</div>
                <div className="legend-content"><div className="legend-item seat premium-economy"></div>Premium Economy Class</div>
                <div className="legend-content"><div className="legend-item seat economy"></div>Economy Class</div>
                <div className="legend-content"><div className="legend-item seat occupied"></div>Occupied</div>
                <div className="legend-content"><div className="legend-item seat selected"></div>Selected Seat</div>
                <div className="legend-content"><div className="legend-item exit left">{" Exit"}</div>Exit</div>
            </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-container">
        <div className="summary">{`Selected Seat : ${selectedSeat.class || ''} ${selectedSeat.seat_number || '-'}`}</div>
        <button className="book" disabled={!selectedSeat.id} onClick={handleBookSeat}>Book Seat</button>
        </div>
      </div>
      {showPopup && (
        <SeatPopupComponent
          onClosePopup={handleClosePopup}
          selectedSeat={showPopup}
        />
      )}
    </>
  );
};
