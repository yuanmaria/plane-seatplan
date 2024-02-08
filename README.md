# Plane Seat Plan Website

Welcome Plane Seat Plan Website repository! This React application allows users to visualize and interact with the seating layout of a plane, similar to an online booking travel website.

## Demo

You can access the demo of this website from [HERE](https://plane-seatplan-yuanmarias-projects.vercel.app)

## Features

1. **Passenger Seats:**
   - Seats are displayed with three different colors based on the "occupied" flag:
     - Red: Indicates that the seat has been occupied by another passenger (`occupied = true`).
     - Yellow: Indicates that the seat is currently selected (`occupied = false`).
     - Green: Indicates that the seat is still available (`occupied = false`).
   - Clicking on a seat triggers different actions:
     - Red Seat: Opens a popup displaying information about the occupied seat.
     - Green Seat: Turns the seat yellow, displaying popup information about the seat (price, class, seat number), including an action button to book the seat.

2. **Exit Door:** 
   - Visual representation of the exit door.

3. **Aisle:**
   - Provides a clear path for people to pass by.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. Clone this repository:
   `git clone https://github.com/yuanmaria/plane-seatplan.git`

2. Navigate into the project directory:
   `cd plane-seatplan`

3. Install dependencies:
   `npm install`

4. Start the development server:
   `npm start`

5. Open your browser and visit `http://localhost:3000` to view the application.

## Technologies Used

- React
- HTML/CSS
- JavaScript

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/new-feature`).
6. Create a new Pull Request.

---

Feel free to reach out if you have any questions or feedback! Happy coding! 🚀🛫
