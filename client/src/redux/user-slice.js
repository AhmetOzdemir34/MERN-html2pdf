import {createSlice} from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        access: false,
    },
    reducers: {
        userPending: (state, action)=>{
            state.loading = true;
        },
        userSuccess: (state, action)=>{
            state.user = action.payload.user;
            state.access = true;
            state.loading = false;
        },
        userRejected: (state, action)=>{
            state.user = null;
            state.access = false;
            state.loading = false;
            state.error = action.payload.message;
        },
        loggedinPending: (state, action)=>{
            state.loading = true;
        },
        loggedinSuccess: (state, action)=>{
            state.user = action.payload.user;
            state.access = action.payload.access;
            state.loading = false;
        },
        loggedinRejected: (state, action)=>{
            state.user = action.payload.user;
            state.access = action.payload.access;
            state.loading = false;
            state.error = action.payload.message;
        },
        logout: (state, action)=>{
            state.user = null;
            state.access = false;
            state.loading = false;
            state.error = null;
        },
        
    },
})

export const {
    userPending, userSuccess, userRejected,
    loggedinPending, loggedinSuccess,loggedinRejected, 
    logout,
} = userSlice.actions;

export default userSlice.reducer;