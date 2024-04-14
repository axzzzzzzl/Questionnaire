import { configureStore } from '@reduxjs/toolkit'

import questionnaireReducer from '../components/QuestionList/quesListSlice'
import singleChoiceReducer from '../components/SingleChoice/singleSlice'
import multipleChoiceReducer from '../components/MultipleChoice/multipleSlice'
import textReducer from '../components/Text/textSlice'
import editStatusReducer from '../components/editStatusSlice'

export default configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    singleChoice: singleChoiceReducer,
    multipleChoice: multipleChoiceReducer,
    text: textReducer,
    editStatus: editStatusReducer
  }
})