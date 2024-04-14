import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: generateId(),
    title: "",
    type: 2,
    remarks: null,
    isNecessary: false,
    lineHeight: 1
}

function generateId() {
    return Number(Math.random().toString().slice(3, 8) + Date.now()).toString(36);
}

const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        titleUpdated: (state, action) => {
            state.title = action.payload
        },
        remarksUpdated: (state, action) => {
            state.remarks = action.payload
        },
        isNecessaryUpdated: (state, action) => {
            state.isNecessary = action.payload
        },
        lineHeightUpdated: (state, action) => {
            state.lineHeight = action.payload
        },
        textSetted: (state, action) => {
            return {
                ...action.payload
            }
        },
        textCleared: () => {
            return {
                ...initialState,
                id: generateId()
            }
        }
    }
  })

export const { 
  titleUpdated, 
  remarksUpdated, 
  isNecessaryUpdated, 
  lineHeightUpdated,
  textSetted, 
  textCleared,
} = textSlice.actions
  
  export default textSlice.reducer