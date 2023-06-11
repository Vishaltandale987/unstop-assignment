import './App.css';
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";

function App() {

  const [array, setarray] = useState([]);

  const [getseat, setgetseat] = useState([]);

  const [seatcounts, setseatcounts] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const finalRef = React.useRef(null)

  const toast = useToast()

  const [status, setstatus] = useState()

  let bookedSeats = [];

  const bookSeats = (seatcount) => {
    seatcount = parseInt(seatcount);
    for (let i = 0; i <= 80 - seatcount; i++) {
      if (status.slice(i, i + seatcount).every((seat) => seat === "available")) {
        for (let j = 0; j < seatcount; j++) {
          const seatIndex = i + j;
          bookedSeats.push(seatIndex + 1);
          array.push(seatIndex);
        }
        const updatedSeats = [...status];
        for (let j = i; j < i + seatcount; j++) {
          updatedSeats[j] = 'booked';
        }        break;
      }
    }
  }







  useEffect(() => {
    get_data_handle();
  }, []);


  const get_data_handle = async () => {
    try {
      let res = await axios(`https://unstop-server-git-main-vishaltandale987.vercel.app/seat`);

      setgetseat(res.data);

      let ddd = res.data

      let arr = []

      for (let i = 0; i < ddd.length; i++) {
        arr.push(ddd[i].status)
      }

      setstatus(arr)

    } catch (error) {
      console.log(error);
    }
  };

  const update_seat_handle = async () => {
    try {
      let data = {
        bookseat: array,
      };
      let res = await axios.post(`https://unstop-server-git-main-vishaltandale987.vercel.app/seat/book`, data);
      toast({
        title: `${res.data}`,

        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',

      })

      setarray([]);
      get_data_handle(); //check
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookSeat = () => {
    bookSeats(seatcounts);
    update_seat_handle();
  };

  const handleCancelbooking = async () => {

    let seat_id = localStorage.getItem("seatid")
    let index = localStorage.getItem("index")
    const id = {
      seatid: seat_id
    }

    try {

      const res = await axios.put(`https://unstop-server-git-main-vishaltandale987.vercel.app/seat/cancel`, id);
      // console.log(res.data)

      onClose()
      localStorage.removeItem("seatid")


      

      toast({
        title: 'Booking Successfully cancel',
        // description: "Booking Successfully cancel.",
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top-right',

      })


      get_data_handle(); //check
    } catch (error) {
      console.log(error)
    }
  };




  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h2>
        {" "}
        <b> Seat Booking</b>{" "}
      </h2>


      <div className="input">
        <div
          style={{
            display: "flex",
            margin: "auto",
            width: "30%",
          }}
        >
          <FormLabel>Select Seats</FormLabel>
          <Input
            id="seatCount"
            type="range"
            min="1"
            max="7"
            defaultValue="1"
            onChange={(e) => setseatcounts(e.target.value)}
            w={400}
            border="1px"
            borderColor="gray.800"
          />
          <p className="seatstext">No seat book {seatcounts}</p>
        </div>

        <Button
          onClick={handleBookSeat}
          size="md"
          colorScheme="facebook"
          mt={5}
          mb={5}
        >
          Bookss
        </Button>
      </div>

      <div id="coach" className="coach">
        {getseat.map((seat, index) => (
          <div
            key={index}
            className={`seat ${seat.status}`}
            onClick={() => {

              if (seat.status === "booked") {

                localStorage.setItem("seatid", seat._id)
                localStorage.setItem("index", seat.id)
                onOpen()
              }
            }}
          >
            <p className="name">{seat.seatNumber}</p>
          </div>
        ))}
      </div>



      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You want to cancel booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handleCancelbooking}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



    


    </div>

  );
}

export default App;
