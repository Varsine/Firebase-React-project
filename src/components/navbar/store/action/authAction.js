export const removeUser = current => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    const user = firebase.auth()

    user.delete(current).then(() => {
      dispatch({type: "DELETE_USER"})
    })
  }
}

export const singIn = credentials => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({type: "LOGIN_SUCCESS"})
      })
      .catch(err => {
        dispatch({type: "LOGIN_ERROR", err})
      })
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({type: "SIGNOUT_SUCCESS"})
      })
  }
}

export const singUp = newUser => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore()

    firebase
      .auth()
      .signInWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          })
      })
      .then(() => {
        dispatch({type: "SINGUP_SUCCESS"})
      })
      .catch(err => {
        dispatch({type: "SINGUP_ERROR", err})
      })
  }
}
