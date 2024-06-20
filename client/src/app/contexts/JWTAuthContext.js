import React, { createContext, useEffect, useReducer } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios.js'
import { MatxLoading } from 'app/components'


const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
}

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false
  }

  const decodedToken = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000
  return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload

      return {
        ...state,
        isAuthenticated: true,
        user,
      }
    }

    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }

    case "REGISTER": {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => { },
  logout: () => { },
  register: () => { }
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await axios.post('/login', {
      email,
      password,
    })
    const decodedToken = jwtDecode(response.data.access_token)
    const accessToken = response.data.access_token
    var user = decodedToken.user;
    setSession(accessToken)

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    })
  }

  const register = async (name, surname, email, role, password) => {
    const response = await axios.post("/register", { name, surname, email, role, password });
    const { user } = response.data;

    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    axios.post('/logout')
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  const checkAuth = () => {
    const accessToken = window.localStorage.getItem('accessToken')

    if (accessToken && isValidToken(accessToken)) {
      setSession(accessToken)
      const decodedToken = jwtDecode(accessToken)
      var user = decodedToken.user;

      dispatch({
        type: 'INIT',
        payload: {
          isAuthenticated: true,
          user,
        },
      })
    } else {
      dispatch({
        type: 'INIT',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      })
    }
  }

  useEffect(() => {
    ; (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken)
          const decodedToken = jwtDecode(accessToken)
          var user = decodedToken.user;

          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user,
            },
          })
        } else {
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    })()
  }, [])

  // SHOW LOADER
  if (!state.isInitialized) return <MatxLoading />;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
