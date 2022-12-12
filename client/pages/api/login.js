import Axios from 'axios'
const PROXY = 'http://localhost:8080'
const API_URL = PROXY + '/api/'
import { authContext } from '../../src/context/auth-context.js'
import React, { useContext } from 'react'

const login = async (req, res) => {
    // const authContext = useContext(AuthContext);

    if (req.method === 'POST') {

        const { email, password } = req.body;

        const userData = { 
            email, 
            password 
        }

        const response = await Axios.post(process.env.API_URL + 'login', userData)

        console.log(response)

        if (response.data) {
            const user = localStorage.setItem('user', response.data)

            // authContext.setAuthState(user).then((res) => {
            //     console.log(res);
            //     return res;
            // });

        }
         else {
            res.status(400).send('Unexpected error. Please try again!')
        }
        
    } else {
      // Handle any other HTTP method
    }
}

export default login