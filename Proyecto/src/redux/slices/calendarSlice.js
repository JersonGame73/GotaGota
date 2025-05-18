import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from '../../services/paymentService';

/**
 * Calendar async thunks for handling calendar-related operations
 */
export const fetchCalendarEventsAsync = createAsyncThunk(
  'calendar/fetchEvents',
  async ({ startDate, endDate, filters }, { rejectWithValue }) => {
    try {
      return await paymentService.getCalendarPayments(startDate, endDate, filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch calendar events');
    }
  }
);

/**
 * Initial calendar state
 */
const initialState = {
  events: [],
  viewDate: new Date(),
  filters: {
    client: null,
    status: null,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)) // Default to next 30 days
  },
  loading: false,
  error: null,
  selectedEvent: null,
  view: 'month' // 'month', 'week', 'day'
};

/**
 * Calendar slice for managing calendar state
 */
const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    clearCalendarError: (state) => {
      state.error = null;
    },
    setViewDate: (state, action) => {
      state.viewDate = action.payload;
    },
    setCalendarFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    // Helper action to update an event's status without refetching all events
    updateEventStatus: (state, action) => {
      const { paymentId, status } = action.payload;
      state.events = state.events.map(event => 
        event.paymentId === paymentId 
          ? { 
              ...event, 
              status,
              color: paymentService.getPaymentStatusColor(status) 
            } 
          : event
      );
      
      if (state.selectedEvent && state.selectedEvent.paymentId === paymentId) {
        state.selectedEvent = {
          ...state.selectedEvent,
          status,
          color: paymentService.getPaymentStatusColor(status)
        };
      }
    },
    resetFilters: (state) => {
      state.filters = {
        client: null,
        status: null,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30))
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch calendar events cases
      .addCase(fetchCalendarEventsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarEventsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.map(event => ({
          ...event,
          color: paymentService.getPaymentStatusColor(event.status)
        }));
      })
      .addCase(fetchCalendarEventsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  clearCalendarError, 
  setViewDate, 
  setCalendarFilters, 
  selectEvent, 
  clearSelectedEvent, 
  setView,
  updateEventStatus,
  resetFilters
} = calendarSlice.actions;
export default calendarSlice.reducer;