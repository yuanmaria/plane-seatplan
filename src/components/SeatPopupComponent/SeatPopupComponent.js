import { useContext } from 'react';
import './SeatPopupComponent.css';
import { SeatPlanContext } from '../../contexts/SeatPlanContext';

export const SeatPopupComponent = (props) => {
    const {onClosePopup, selectedSeat} = props
    const {updateItemApi} = useContext(SeatPlanContext);

    const handleInnerClick = (e) => {
        e.stopPropagation();
    }

    const handleOuterClick = (e) => {
        onClosePopup(e);
    }

    const currencyFormat = () => {
        return 'Rp ' + selectedSeat.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const handleBookSeat = () => {
      updateItemApi(selectedSeat.id);
    }

    return (
        <div className="popup-container" onClick={handleOuterClick}>
            <div className="popup-content" onClick={handleInnerClick}>
                <div className='popup-header'>
                    Seat Detail
                    <button className="close" onClick={onClosePopup}>X</button>
                </div>
                <div className="seat-content">
                    <div className='seat-detail'><div className='title'>Seat Number</div> <div className='desc'>{selectedSeat.seat_number}</div></div>
                    <div className='seat-detail'><div className='title'>Class</div> <div className='desc uppercase'>{selectedSeat.class} Class</div></div>
                    <div className='seat-detail'><div className='title'>Price</div> <div className='desc'>{currencyFormat()}</div></div>
                    <div className='seat-detail'><div className='title'>Occupied </div><div className={`desc ${selectedSeat.occupied ? 'occupied' : 'unoccupied'}`}>{selectedSeat.occupied ? 'TRUE' : 'FALSE'}</div></div>
                </div>
                {!selectedSeat.occupied && <button className="book" onClick={handleBookSeat}>Book Seat</button>}
            </div>
        </div>
    ); 
}
