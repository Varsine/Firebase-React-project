import {auth} from "firebase"

const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error")
      return {
        ...state,
        authError: "login failed"
      }
    case "LOGIN_SUCCESS":
      console.log("login success")
      return {
        ...state,
        authError: null
      }
    case "SIGNOUT_SUCCESS":
      return {
        ...state,
        authError: null
      }
    case "SINGUP_SUCCESS":
      console.log("singup success")
      return {
        ...state,
        authError: null
      }
    case "SINGUP_ERROR":
      console.log("singup error")
      return {
        ...state,
        authError: action.err
      }
    case "DELETE_USER":
      console.log("delet user")
      return {
        ...state,
        authError: null
      }
    default:
      return state
  }
}
export default authReducer
