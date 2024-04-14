import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    editorStatus: "NotEdit", // 题目编辑状态
    editorType: null,        // 题目编辑类型
}

const editStatusSlice = createSlice({
    name: 'editStatus',
    initialState,
    reducers: {
        editorStatusUpdated: (state, action) => {
            state.editorStatus = action.payload
        },
        editorTypeUpdated: (state, action) => {
            state.editorType = action.payload
        },
    }
})

export const { 
    editorStatusUpdated, 
    editorTypeUpdated,
 } = editStatusSlice.actions
  
export default editStatusSlice.reducer