import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: generateId(),
    title: "",
    type: 1,
    remarks: null,
    isNecessary: false,
    options: [
        { id: "1", text: "选项1" },
        { id: "2", text: "选项2" },
    ],
    nextId: 3,
}

function generateId() {
    return Number(Math.random().toString().slice(3, 8) + Date.now()).toString(36);
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const multipleChoiceSlice = createSlice({
    name: 'multipleChoice',
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
            state.options.push({ id: (state.nextId++).toString(), text: "" })
        },
        optionOtherAdded: (state) => {
            state.options.push({ id: (state.nextId++).toString(), text: "其他" })
        },
        optionDeleted: (state, action) => {
            state.options = state.options.filter(option => option.id !== action.payload)
            state.nextId--
        },
        optionReordered: (state, action) => {
            state.options = reorder(state.options, action.payload.startIndex, action.payload.endIndex)
        },
        multipleOptionBatchSetted: (state, action) => {
            state.options = action.payload.split('\n').map(option => ({ id: (state.nextId++).toString(), text: option }))
        },
        multipleChoiceSetted: (state, action) => {
            return {
                ...action.payload
            }
        },
        multipleChoiceCleared: () => {
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
    multipleChoiceSetted, 
    multipleChoiceCleared,
    optionOtherAdded,
    multipleOptionBatchSetted
 } = multipleChoiceSlice.actions
  
  export default multipleChoiceSlice.reducer