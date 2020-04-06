import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import {Provider} from "react-redux"
import {reactReduxFirebase, getFirebase} from "react-redux-firebase"
import {reduxFirestore, getFirestore} from "redux-firestore"
import thunk from "redux-thunk"
import {createStore, applyMiddleware, compose} from "redux"
import firebase from "./components/navbar/dashboard/config/firebaseConfig"
import rootReducer from "./components/navbar/store/reducer/rootReducer"

//const initialState = {}
const store = createStore(
  rootReducer,
  // initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase)
  )
)

//store.firestore.get({collection: "client"})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
