import React, { createContext, useState } from "react";
import { supabase } from "./supabaseClient";
import { initSeatPlan, mapSeatPlan } from "./utils/SeatPlanUtils";

// Initializing context
export const SeatPlanContext = createContext();

export function SeatPlanContextProvider({ children }) {
  const [seatPlan, setSeatPlan] = useState(initSeatPlan());
  const [selectedSeat, setSelectedSeat] = useState({});
  const [loading, setLoading] = useState(false);

  const getSeatPlanApi = async () => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/rest/v1/seats`, {
        headers: {
          apiKey: process.env.REACT_APP_API_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => setSeatPlan(mapSeatPlan(seatPlan, data)))
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateItemApi = async (id) => {
    setLoading(true);
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/rest/v1/seats?id=eq.${id}`,
        {
          method: "PUT",
          headers: {
            apiKey: process.env.REACT_APP_API_KEY,
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            id: id,
            occupied: true,
          }),
        }
      )
      .then(response => {
          if (response.status === 204) {
            return {};
          } else {
              return response.json();
          }
      })
        // .then((response) => response.json())
        .then(async (data) => {
          if (data.message) {
            alert(data.message);
          } else {
            await getSeatPlan();
            setSelectedSeat({});
            setLoading(false);
            alert("You have successfully book a seat");
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // get all seat plan
  const getSeatPlan = async () => {
    setLoading(true);
    try {
      const { error, data } = await supabase
        .from("seats") //the table you want to work with
        .select()
        .order("seat_number", { ascending: true });

      if (error) throw error;

      if (data) setSeatPlan(mapSeatPlan(seatPlan, data));
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  // update seats status on the database
  const updateItem = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("seats")
        .update({ occupied: true })
        .eq("id", id); //matching id of row to update

      if (error) throw error;

      await getSeatPlan();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setSelectedSeat({});
      alert("You have successfully book a seat");
    }
  };

  const selectSeat = (id) => {
    setSelectedSeat(id);
  };

  return (
    <SeatPlanContext.Provider
      value={{
        seatPlan,
        selectedSeat,
        loading,
        selectSeat,
        setSeatPlan,
        getSeatPlan,
        updateItem,
        getSeatPlanApi,
        updateItemApi,
      }}
    >
      {children}
    </SeatPlanContext.Provider>
  );
}
