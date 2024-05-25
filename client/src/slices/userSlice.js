import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: ''
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = ''
            localStorage.removeItem('userId')
        }
    }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer;