import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

// Define the interface for a Card
interface Card {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

// Define the interface for the state managed by this slice
interface CardState {
  cardDetails: Card;
}

// Define the initial state for this slice
const initialState: CardState = {
  cardDetails: {
    activity: "",
    type: "",
    participants: 0,
    price: 0,
    link: "",
    key: "",
    accessibility: 0,
  },
};

// Create a Redux slice for managing card data
const cardSlice = createSlice({
  name: "cards", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Define a reducer for a successful resource fetch
    getResourcesSuccess(state, action) {
      const resources = action.payload;
      state.cardDetails = resources;
    },
  },
});

// Export the action creator for getResourcesSuccess
export const { getResourcesSuccess } = cardSlice.actions;

// Export the reducer
export default cardSlice.reducer;

// Define an asynchronous action creator to fetch card resources from an API
export function getResources() {
  return async (dispatch: Dispatch) => {
    try {
      // Make an HTTP GET request to the API
      const response = await axios.get(
        "https://www.boredapi.com/api/activity",
      );

      // Extract card resources from the API response
      const resources: Card = response.data;

      // Dispatch the getResourcesSuccess action to update the Redux state
      dispatch(getResourcesSuccess(resources));
    } catch (error) {
      console.log(error);
    }
  };
}
