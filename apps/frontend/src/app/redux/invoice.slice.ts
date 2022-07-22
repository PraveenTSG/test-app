import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const INVOICE_FEATURE_KEY = 'invoice';

export interface InvoiceState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
  Invoice: any;
}

//Create Invoice
export const createInvoice = createAsyncThunk(
  'invoce/createInvoice',
  async ({ details }: any) => {
    return axios.post(
      process.env['NX_URL'] + 'invoices/createInvoice',
      details,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
);

export const initialInvoiceState: InvoiceState = {
  loadingStatus: 'not loaded',
  error: '',
  Invoice: {},
};

export const invoiceSlice = createSlice({
  name: INVOICE_FEATURE_KEY,
  initialState: initialInvoiceState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /////////////////Create Invoice actions ////////////////////
      .addCase(createInvoice.pending, (state: InvoiceState) => {
        state.loadingStatus = 'loading';
      })
      // .addCase(createInvoice.fulfilled, (state: InvoiceState, action) => {
      //   state.loadingStatus = 'loaded';
      //   state.createInvoice = (action.payload as any).data;
      // })
      .addCase(createInvoice.rejected, (state: InvoiceState, action) => {
        state.loadingStatus = 'error';
      });
  },
});

export const invoiceReducer = invoiceSlice.reducer;

export const invoiceActions = invoiceSlice.actions;

export const getInvoiceState = (rootState: any): InvoiceState =>
  rootState[INVOICE_FEATURE_KEY];

// export const selectAllInvoice = createSelector(getInvoiceState, (state: UserState) => state.allUsers);
