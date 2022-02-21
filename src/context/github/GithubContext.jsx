import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

// Create Context
const GithubContext = createContext()

// Process .env data
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Provider Function
export const GithubProvider = ({ children }) => {

    // Users initial state
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get initial users (testing purposes)
    const fetchUsers = async () => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })

        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    // Set Loading
    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext