import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch the logged-in user
export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async (token) => {
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();
    return users.find((user) => user.token === token); // Find user by token
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null, // Holds the logged-in user's details
        status: "idle",    // Status for loading, success, or error
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("token"); // Clear token on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentUser = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
