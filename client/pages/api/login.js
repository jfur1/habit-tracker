import Axios from 'axios'
const PROXY = 'http://localhost:8080'
const API_URL = PROXY + '/api/'

export default login = async (req, res) => {

    if (req.method === 'POST') {

        const { email, password } = req.body;

        const userData = { 
            email, 
            password 
        }

        const response = await Axios.post(API_URL + 'login', userData)

        console.log('API RESPONSE: ', response)

        if(response.data){
            res.status(201).send(response);
        } else {
            res.status(400).send('Unexpected error. Please try again!')
        }
        
    } else {
      // Handle any other HTTP method
    }
  }