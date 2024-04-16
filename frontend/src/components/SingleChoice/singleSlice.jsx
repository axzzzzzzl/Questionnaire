import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: generateId(),
    title: "",
    type: 0,
    remarks: null,
    isNecessary: false,
    options: [
        { id: "1", text: "选项1" },
        { id: "2", text: "选项2" },
    ],
}
let nextId = 3;

function generateId() {
    return Number(Math.random().toString().slice(3, 8) + Date.now()).toString(36);
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const singleChoiceSlice = createSlice({ // 使用了Immer库
    name: 'singleChoice',
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
        optionUpdated: (state, action) => {
            state.options = state.options.map(option => option.id === action.payload.id ? action.payload : option)
        },
        optionAdded: (state) => {
            state.options.push({ id: (nextId++).toString(), text: "" })
        },
        optionOtherAdded: (state) => {
            state.options.push({ id: (nextId++).toString(), text: "其他" })
        },
        optionDeleted: (state, action) => {
            state.options = state.options.filter(option => option.id !== action.payload)
        },
        optionReordered: (state, action) => {
            state.options = reorder(state.options, action.payload.startIndex, action.payload.endIndex)
        },
        singleOptionBatchSetted: (state, action) => {
            state.options = action.payload.split('\n').map(option => ({ id: (nextId++).toString(), text: option }))
        },
        singleChoiceSetted: (state, action) => {
            return {
                ...action.payload
            }
        },
        singleChoiceCleared: () => {
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
    optionAdded, 
    optionUpdated, 
    optionDeleted, 
    optionReordered, 
    singleChoiceSetted, 
    singleChoiceCleared,
    optionOtherAdded,
    singleOptionBatchSetted
 } = singleChoiceSlice.actions
  
  export default singleChoiceSlice.reducer