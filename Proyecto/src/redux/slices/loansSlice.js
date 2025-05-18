import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loanService from '../../services/loanService';

/**
 * Loans async thunks for handling loan operations
 */
export const fetchLoansAsync = createAsyncThunk(
  'loans/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      return await loanService.getAllLoans(filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch loans');
    }
  }
);

export const fetchLoanByIdAsync = createAsyncThunk(
  'loans/fetchOne',
  async (loanId, { rejectWithValue }) => {
    try {
      return await loanService.getLoanById(loanId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch loan');
    }
  }
);

export const createLoanAsync = createAsyncThunk(
  'loans/create',
  async (loanData, { rejectWithValue }) => {
    try {
      return await loanService.createLoan(loanData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create loan');
    }
  }
);

export const updateLoanAsync = createAsyncThunk(
  'loans/update',
  async ({ loanId, loanData }, { rejectWithValue }) => {
    try {
      return await loanService.updateLoan(loanId, loanData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update loan');
    }
  }
);

export const updateLoanStatusAsync = createAsyncThunk(
  'loans/updateStatus',
  async ({ loanId, status }, { rejectWithValue }) => {
    try {
      return await loanService.updateLoanStatus(loanId, status);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update loan status');
    }
  }
);

export const fetchLoanAmortizationAsync = createAsyncThunk(
  'loans/fetchAmortization',
  async (loanId, { rejectWithValue }) => {
    try {
      return await loanService.getLoanAmortization(loanId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch loan amortization');
    }
  }
);

export const simulateLoanAsync = createAsyncThunk(
  'loans/simulate',
  async (simulationData, { rejectWithValue }) => {
    try {
      return await loanService.simulateLoan(simulationData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to simulate loan');
    }
  }
);

/**
 * Initial loans state
 */
const initialState = {
  loans: [],
  currentLoan: null,
  loading: false,
  error: null,
  amortization: null,
  simulation: null
};

/**
 * Loans slice for managing loans state
 */
const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    clearLoansError: (state) => {
      state.error = null;
    },
    clearCurrentLoan: (state) => {
      state.currentLoan = null;
      state.amortization = null;
    },
    clearSimulation: (state) => {
      state.simulation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all loans cases
      .addCase(fetchLoansAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoansAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(fetchLoansAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch one loan cases
      .addCase(fetchLoanByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLoan = action.payload;
      })
      .addCase(fetchLoanByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create loan cases
      .addCase(createLoanAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLoanAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = [...state.loans, action.payload];
        state.currentLoan = action.payload;
      })
      .addCase(createLoanAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update loan cases
      .addCase(updateLoanAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoanAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = state.loans.map(loan => 
          loan.id === action.payload.id ? action.payload : loan
        );
        state.currentLoan = action.payload;
      })
      .addCase(updateLoanAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update loan status cases
      .addCase(updateLoanStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoanStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = state.loans.map(loan => 
          loan.id === action.payload.id ? action.payload : loan
        );
        if (state.currentLoan && state.currentLoan.id === action.payload.id) {
          state.currentLoan = action.payload;
        }
      })
      .addCase(updateLoanStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch loan amortization cases
      .addCase(fetchLoanAmortizationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanAmortizationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.amortization = action.payload;
      })
      .addCase(fetchLoanAmortizationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Simulate loan cases
      .addCase(simulateLoanAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(simulateLoanAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.simulation = action.payload;
      })
      .addCase(simulateLoanAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearLoansError, clearCurrentLoan, clearSimulation } = loansSlice.actions;
export default loansSlice.reducer;