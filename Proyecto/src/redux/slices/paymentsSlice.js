import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from '../../services/paymentService';

/**
 * Payments async thunks for handling payment operations
 */
export const fetchPaymentsAsync = createAsyncThunk(
  'payments/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      return await paymentService.getAllPayments(filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch payments');
    }
  }
);

export const fetchPaymentByIdAsync = createAsyncThunk(
  'payments/fetchOne',
  async (paymentId, { rejectWithValue }) => {
    try {
      return await paymentService.getPaymentById(paymentId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch payment');
    }
  }
);

export const createPaymentAsync = createAsyncThunk(
  'payments/create',
  async (paymentData, { rejectWithValue }) => {
    try {
      return await paymentService.createPayment(paymentData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create payment');
    }
  }
);

export const updatePaymentAsync = createAsyncThunk(
  'payments/update',
  async ({ paymentId, paymentData }, { rejectWithValue }) => {
    try {
      return await paymentService.updatePayment(paymentId, paymentData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update payment');
    }
  }
);

export const updatePaymentStatusAsync = createAsyncThunk(
  'payments/updateStatus',
  async ({ paymentId, status }, { rejectWithValue }) => {
    try {
      return await paymentService.updatePaymentStatus(paymentId, status);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update payment status');
    }
  }
);

export const fetchCalendarPaymentsAsync = createAsyncThunk(
  'payments/fetchCalendar',
  async ({ startDate, endDate, filters }, { rejectWithValue }) => {
    try {
      return await paymentService.getCalendarPayments(startDate, endDate, filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch calendar payments');
    }
  }
);

export const fetchUpcomingPaymentsAsync = createAsyncThunk(
  'payments/fetchUpcoming',
  async (filters, { rejectWithValue }) => {
    try {
      return await paymentService.getUpcomingPayments(filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch upcoming payments');
    }
  }
);

export const fetchOverduePaymentsAsync = createAsyncThunk(
  'payments/fetchOverdue',
  async (filters, { rejectWithValue }) => {
    try {
      return await paymentService.getOverduePayments(filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch overdue payments');
    }
  }
);

/**
 * Initial payments state
 */
const initialState = {
  payments: [],
  currentPayment: null,
  calendarEvents: [],
  loading: false,
  error: null,
  upcoming: [],
  overdue: []
};

/**
 * Payments slice for managing payments state
 */
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearPaymentsError: (state) => {
      state.error = null;
    },
    clearCurrentPayment: (state) => {
      state.currentPayment = null;
    },
    clearCalendarEvents: (state) => {
      state.calendarEvents = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all payments cases
      .addCase(fetchPaymentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPaymentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch one payment cases
      .addCase(fetchPaymentByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(fetchPaymentByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create payment cases
      .addCase(createPaymentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = [...state.payments, action.payload];
        state.currentPayment = action.payload;
      })
      .addCase(createPaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update payment cases
      .addCase(updatePaymentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.map(payment => 
          payment.id === action.payload.id ? action.payload : payment
        );
        state.currentPayment = action.payload;
      })
      .addCase(updatePaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update payment status cases
      .addCase(updatePaymentStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.map(payment => 
          payment.id === action.payload.id ? action.payload : payment
        );
        if (state.currentPayment && state.currentPayment.id === action.payload.id) {
          state.currentPayment = action.payload;
        }
        // Also update in calendar events if present
        state.calendarEvents = state.calendarEvents.map(event => 
          event.paymentId === action.payload.id 
            ? { ...event, status: action.payload.status } 
            : event
        );
      })
      .addCase(updatePaymentStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch calendar payments cases
      .addCase(fetchCalendarPaymentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarPaymentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.calendarEvents = action.payload;
      })
      .addCase(fetchCalendarPaymentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch upcoming payments cases
      .addCase(fetchUpcomingPaymentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingPaymentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.upcoming = action.payload;
      })
      .addCase(fetchUpcomingPaymentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch overdue payments cases
      .addCase(fetchOverduePaymentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverduePaymentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.overdue = action.payload;
      })
      .addCase(fetchOverduePaymentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearPaymentsError, clearCurrentPayment, clearCalendarEvents } = paymentsSlice.actions;
export default paymentsSlice.reducer;