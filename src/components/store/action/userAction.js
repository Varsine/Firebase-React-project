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
