import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

/**
 * Users async thunks for handling user operations
 */
export const fetchUsersAsync = createAsyncThunk(
  'users/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      return await userService.getAllUsers(filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

export const fetchUserByIdAsync = createAsyncThunk(
  'users/fetchOne',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.getUserById(userId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);

export const createUserAsync = createAsyncThunk(
  'users/create',
  async (userData, { rejectWithValue }) => {
    try {
      return await userService.createUser(userData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create user');
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/update',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      return await userService.updateUser(userId, userData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update user');
    }
  }
);

export const deactivateUserAsync = createAsyncThunk(
  'users/deactivate',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.deactivateUser(userId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to deactivate user');
    }
  }
);

export const activateUserAsync = createAsyncThunk(
  'users/activate',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.activateUser(userId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to activate user');
    }
  }
);

export const fetchUserNotificationsAsync = createAsyncThunk(
  'users/fetchNotifications',
  async (userId, { rejectWithValue }) => {
    try {
      return await userService.getUserNotifications(userId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch user notifications');
    }
  }
);

export const updateProfileAsync = createAsyncThunk(
  'users/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      return await userService.updateProfile(profileData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update user profile');
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  'users/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      return await userService.changePassword(currentPassword, newPassword);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to change password');
    }
  }
);

/**
 * Initial users state
 */
const initialState = {
  users: [],
  currentUser: null,
  notifications: [],
  loading: false,
  error: null,
  passwordChanged: false
};

/**
 * Users slice for managing users state
 */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    resetPasswordChanged: (state) => {
      state.passwordChanged = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users cases
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch one user cases
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create user cases
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update user cases
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        );
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Deactivate user cases
      .addCase(deactivateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user => 
          user.id === action.payload.id ? { ...user, isActive: false } : user
        );
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = { ...state.currentUser, isActive: false };
        }
      })
      .addCase(deactivateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Activate user cases
      .addCase(activateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user => 
          user.id === action.payload.id ? { ...user, isActive: true } : user
        );
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = { ...state.currentUser, isActive: true };
        }
      })
      .addCase(activateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user notifications cases
      .addCase(fetchUserNotificationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNotificationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchUserNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update profile cases
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentUser) {
          state.currentUser = { ...state.currentUser, ...action.payload };
        }
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change password cases
      .addCase(changePasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordChanged = false;
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.passwordChanged = true;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.passwordChanged = false;
      });
  }
});

export const { clearUsersError, clearCurrentUser, clearNotifications, resetPasswordChanged } = usersSlice.actions;
export default usersSlice.reducer;