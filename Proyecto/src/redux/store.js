import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import loansReducer from './slices/loansSlice';
import paymentsReducer from './slices/paymentsSlice';
import clientsReducer from './slices/clientsSlice';
import usersReducer from './slices/usersSlice';
import calendarReducer from './slices/calendarSlice';

/**
 * Redux store configuration for centralized state management
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    loans: loansReducer,
    payments: paymentsReducer,
    clients: clientsReducer,
    users: usersReducer,
    calendar: calendarReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore certain paths for date objects
        ignoredActions: ['payments/fetchCalendarSuccess', 'calendar/setViewDate'],
        ignoredPaths: ['calendar.viewDate', 'payments.calendarEvents']
      }
    })
});

export default store;