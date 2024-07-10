import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: "",
    description: "",
    id: generateId(),
    questions: []
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

const questionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState,
    reducers: {
        titleUpdated: (state, action) => {
            state.title = action.payload
        },
        descriptionUpdated: (state, action) => {
            state.description = action.payload
        },
        questionAdded: (state, action) => {
            state.questions.push(action.payload)
        },
        questionUpdated: (state, action) => {
            state.questions = state.questions.map(question => question.id === action.payload.id ? action.payload : question)
        },
        questionDeleted: (state, action) => {
            state.questions = state.questions.filter(question => question.id !== action.payload)
        },
        questionReordered: (state, action) => {
            state.questions = reorder(state.questions, action.payload.startIndex, action.payload.endIndex)
        },
        questionCopyed: (state, action) => {
            state.questions.push({...action.payload, id: generateId()})
        },
        questionnaireSetted: (state, action) => {
            state.title = action.payload.title
            state.description = action.payload.description
            state.id = action.payload.id
            state.questions = action.payload.questions
        },
        questionnaireCleared: (state) => {
            state.title = ""
            state.description = ""
            state.id = generateId()
            state.questions = []
        }
    }
  })
  
  export const { 
    questionAdded, 
    questionUpdated, 
    questionDeleted, 
    questionReordered, 
    questionCopyed,
    titleUpdated,
    descriptionUpdated,
    questionnaireSetted,
    questionnaireCleared
 } = questionnaireSlice.actions
  
  export default questionnaireSlice.reducer