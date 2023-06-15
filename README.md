# unstop-assignment


# Unstop_assignment

This application is a seat booking application. There are 80 seats in total, with 7 seats in a row and 3 in the last row. Users can book at most 7 seats at a time. Initially, if the required number of seats is available in a row then it should book in the same row else it should book the seats with the least difference between the first and the last seat of the required number of seats. Then logic behind how seats are booked is handled from the backend and the display of seats and the user input for booking is handled by the frontend.

[Frontend](https://unstop-assignment-delta.vercel.app/) - Deployed Link <br />
[Backend](https://unstop-backend-npci.onrender.com/) - Deployed Link

## Tech Stack
- Frontend
  - React.Js
  - Chakra-UI
- Backend
  - Node.JS
  - Express.Js
  - Mongoose
  - MongoDB-Atlas

## Backend Routes
- "/seats" : Make a GET request to get all the seat data.
- "/seats/reserve" : Make a POST request with the body-"{ "No_of_Seats" : Value(number of seats to be booked) }". It will book the required number of seats and return an array consisting of seat numbers that are booked.
- "/seats/reset" : Make a PATCH request to change the status of all the seats to available.

## Site Overview
![image](https://github.com/Neerav-Khatri/Unstop_assignment/assets/107555012/249994c2-7075-49f0-ab19-373249fa5c95)
