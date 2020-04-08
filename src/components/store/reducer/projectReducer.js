const initState = {
  projects: [
    {
      firdtName: "mari",
      lastName: "Sargsyan",
      email: "mari@gmail.com",
      balance: 120
    }
  ]
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return state

    case "CREATE_PROJECT_ERROR":
      return state

    default:
      return state
  }
}
export default projectReducer
