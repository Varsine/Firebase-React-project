const initState = {
  projects: []
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return state

    case "CREATE_USER_ERROR":
      return state
    case "UPDATE_USER":
      console.log("update user")
      return state

    case "UPDATE_USSER_ERROR":
      console.log("update not user")
      return state

    default:
      return state
  }
}
export default userReducer
