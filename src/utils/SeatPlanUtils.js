const seatMap = {'A':0, 'B':1, 'C':2,'D':3, 'E':4, 'F':5,'G':6, 'H':7, 'I':8, 'J':9, 'K': 10};

export const initSeatPlan = () => {
    //assume seat row 55
    //assume seat column ABC DEFGH IJK
    return Array.from(Array(55), () => new Array(11).fill(null))
}

export const mapSeatPlan = (seatPlan, data) => {
    for(const seat of data) {
       const [,num,code] = seat.seat_number.split(/(\d+)/);
       seatPlan[num-1][seatMap[code]] = seat;
    }
    console.log(seatPlan);
    return seatPlan;
}

// {
//     "id": "7a43a1a1-8935-4cce-ac68-71eb632a6e13",
//     "class": "economy",
//     "seat_number": "23A",
//     "price": 5000000,
//     "occupied": false
// }
