import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import {Provider} from "react-redux"
import {reactReduxFirebase, getFirebase} from "react-redux-firebase"
import {reduxFirestore, getFirestore} from "redux-firestore"
import thunk from "redux-thunk"
import {createStore, applyMiddleware, compose} from "redux"
import firebaseConfig from "./components/config/firebaseConfig"
import rootReducer from "./components/store/reducer/rootReducer"

//const initialState = {}
const store = createStore(
  rootReducer,
  // initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    })
  )
)
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  )
})
