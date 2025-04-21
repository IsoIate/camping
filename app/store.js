import { configureStore, createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
    name: 'temp',
    initialState: { img: '', te: ''},
    reducers: {
        setImg: (state, action) => {
            state.img = action.payload;
        },
        setTe: (state, action) => {
            state.te = action.payload;
        }
    }
})

export const {setImg, setTe} = imageSlice.actions;
export default configureStore({

  reducer: { }
}) 