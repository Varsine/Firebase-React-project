import {firebaseStateReducer} from "react-redux-firebase"

export const createUser = user => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore
      .collection("client")
      .add({
        ...user,
        photoURL:
          "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
        authorBalance: 0.0,
        authorTime: new Date()
      })
      .then(() => {
        dispatch({type: "CREATE_USER", user})
      })
      .catch(err => {
        dispatch({type: "CREATE_USER_ERROR", err})
      })
  }
}

export const updateUser = user => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    const firebase = getFirebase()

    firestore
      .collection("client")
      .doc(window.match.params.id)
      .update({
        ...user,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        balance: user.balance
      })
      .then(() => {
        dispatch({type: "UPDATE_USER", user})
      })
      .catch(err => {
        dispatch({type: "UPDATE_USER_ERROR", err})
      })
  }
}
