import axios from 'axios'

const PROXY = 'http://localhost:8080'
const API_URL = PROXY + '/api/entries/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
  }
  
  // Login user
  const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
  }
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('user')
  }
  
  const authService = {
    register,
    logout,
    login,
  }
  
  export default authService