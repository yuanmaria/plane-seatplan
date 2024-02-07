import React, { createContext, useState } from "react";
import { supabase } from "./supabaseClient";
import { initSeatPlan, mapSeatPlan } from "./utils/SeatPlanUtils";

// Initializing context
export const SeatPlanContext = createContext();

export function SeatPlanContextProvider({ children }) {
  const [seatPlan, setSeatPlan] = useState(initSeatPlan());
  const [selectedSeat, setSelectedSeat] = useState('');
  const [loading, setLoading] = useState(false);

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
  const updateItem = async ({ item, id }) => {
    setLoading(true);
    try {

      const { error } = await supabase
        .from("seats")
        .update({ item })
        .eq("id", id); //matching id of row to update

      if (error) throw error;

      await getSeatPlan();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectSeat = (id) => {
    console.log('selectSeat', id)
    setSelectedSeat(id);
  }


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
      }}
    >
      {children}
    </SeatPlanContext.Provider>
  );
}