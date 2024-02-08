import { leftExit, rightExit, seatMap } from "../constants/SeatPlanConstant";

export const initSeatPlan = () => {
    //assume seat row 55
    //assume seat column ABC DEFGH IJK
    const first = Array.from(Array(2), () => new Array(10).fill(null));
    const business = Array.from(Array(10), () => new Array(11).fill(null));
    const economy = Array.from(Array(46), () => new Array(12).fill(null));

    //mapping exit
    business[1][0] = leftExit;
    business[1][10] = rightExit;
    economy[3][0] = leftExit;
    economy[3][11] = rightExit;
    economy[18][0] = leftExit;
    economy[18][11] = rightExit;
    economy[29][0] = leftExit;
    economy[29][11] = rightExit;
    economy[45][0] = leftExit;
    economy[45][11] = rightExit;
    return [...first, ...business, ...economy]
}

export const mapSeatPlan = (seatPlan, data) => {
    for(const seat of data) {
       const [,num,code] = seat.seat_number.split(/(\d+)/);
       //add empty row for exit after 30 and 40
       const seatNumber = num > 40 ? Number(num) + 1 : num > 30 ? num : Number(num) - 1; 
       seatPlan[seatNumber][seatMap[seat.class][code]] = seat;
    }
    return seatPlan;
}
