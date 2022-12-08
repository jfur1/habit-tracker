import Axios from 'axios'
const PROXY = 'http://localhost:8080'
const API_URL = PROXY + '/api/'

const register = async (req, res) => {
    
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const userData = {
            email, 
            password 
        }

        console.log('userData to register: ', req.body)

        const response = await Axios.post(API_URL + 'register', userData)

        console.log('API RESPONSE: ', response)

        // if (response.data && response.data.token) {
        //   localStorage.setItem('user',response.data.token)
        // }

        if(response.data){
            res.status(201).send(response);
        } else {
            res.status(400).send('Unexpected error. Please try again!')
        }

    } else {
      // Handle any other HTTP method
    }
}

export default register