export const createProject = project => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    // const profile = getState().firebase.profile
    // const authorId = getState().firebase.auth.uid
    firestore
      .collection("client")
      .add({
        ...project,
        // authorFirstName: "Mari",
        // authorLastName: "Martirosyan",
        // authorEmail: "mari@gmail.com",
        authorBalance: 0.0,
        authorTime: new Date()
      })
      .then(() => {
        dispatch({type: "CREATE_PROJECT", project})
      })
      .catch(err => {
        dispatch({type: "CREATE_PROJECT_ERROR", err})
      })
  }
}
