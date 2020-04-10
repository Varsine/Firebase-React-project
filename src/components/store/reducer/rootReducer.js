import {combineReducers} from "redux"
import {firestoreReducer} from "redux-firestore"
import {firebaseReducer} from "react-redux-firebase"
import authReducer from "./authReducer"
import userReducer from "./UserReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
