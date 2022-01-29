import { createSlice } from '@reduxjs/toolkit';

const shipmentSlice = createSlice({
  name: 'shipment',

  initialState: {
    shipments: [],
    isUpdating: false,
  },

  reducers: {
    SetIsUpdating(state, action) {
      state.isUpdating = action.payload.state;
    },
    UpdateShipment(state, action) {
      state.shipments = state.shipments.map((el) =>
        el._id !== action.payload.shipment._id ? el : action.payload.shipment
      );
    },
    FetchShipments(state, action) {
      state.shipments = action.payload.shipments;
    },
  },
});

export const shipmentActions = shipmentSlice.actions;
export default shipmentSlice;
