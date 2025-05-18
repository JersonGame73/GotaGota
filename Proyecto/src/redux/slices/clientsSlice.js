import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import clientService from '../../services/clientService';

/**
 * Clients async thunks for handling client operations
 */
export const fetchClientsAsync = createAsyncThunk(
  'clients/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      return await clientService.getAllClients(filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch clients');
    }
  }
);

export const fetchClientByIdAsync = createAsyncThunk(
  'clients/fetchOne',
  async (clientId, { rejectWithValue }) => {
    try {
      return await clientService.getClientById(clientId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch client');
    }
  }
);

export const createClientAsync = createAsyncThunk(
  'clients/create',
  async (clientData, { rejectWithValue }) => {
    try {
      return await clientService.createClient(clientData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create client');
    }
  }
);

export const updateClientAsync = createAsyncThunk(
  'clients/update',
  async ({ clientId, clientData }, { rejectWithValue }) => {
    try {
      return await clientService.updateClient(clientId, clientData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update client');
    }
  }
);

export const fetchClientLoansAsync = createAsyncThunk(
  'clients/fetchLoans',
  async (clientId, { rejectWithValue }) => {
    try {
      return await clientService.getClientLoans(clientId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch client loans');
    }
  }
);

export const fetchClientPaymentsAsync = createAsyncThunk(
  'clients/fetchPayments',
  async (clientId, { rejectWithValue }) => {
    try {
      return await clientService.getClientPayments(clientId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch client payments');
    }
  }
);

export const fetchClientHistoryAsync = createAsyncThunk(
  'clients/fetchHistory',
  async (clientId, { rejectWithValue }) => {
    try {
      return await clientService.getClientHistory(clientId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch client history');
    }
  }
);

/**
 * Initial clients state
 */
const initialState = {
  clients: [],
  currentClient: null,
  clientLoans: [],
  clientPayments: [],
  clientHistory: [],
  loading: false,
  error: null
};

/**
 * Clients slice for managing clients state
 */
const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearClientsError: (state) => {
      state.error = null;
    },
    clearCurrentClient: (state) => {
      state.currentClient = null;
      state.clientLoans = [];
      state.clientPayments = [];
      state.clientHistory = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all clients cases
      .addCase(fetchClientsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClientsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch one client cases
      .addCase(fetchClientByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentClient = action.payload;
      })
      .addCase(fetchClientByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create client cases
      .addCase(createClientAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClientAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = [...state.clients, action.payload];
        state.currentClient = action.payload;
      })
      .addCase(createClientAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update client cases
      .addCase(updateClientAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClientAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.map(client => 
          client.id === action.payload.id ? action.payload : client
        );
        state.currentClient = action.payload;
      })
      .addCase(updateClientAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch client loans cases
      .addCase(fetchClientLoansAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientLoansAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clientLoans = action.payload;
      })
      .addCase(fetchClientLoansAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch client payments cases
      .addCase(fetchClientPaymentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientPaymentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clientPayments = action.payload;
      })
      .addCase(fetchClientPaymentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch client history cases
      .addCase(fetchClientHistoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientHistoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clientHistory = action.payload;
      })
      .addCase(fetchClientHistoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearClientsError, clearCurrentClient } = clientsSlice.actions;
export default clientsSlice.reducer;