import Axios from 'axios'
const PROXY = 'http://localhost:8080'
const API_URL = PROXY + '/api/'

export default login = async (req, res) => {

    if (req.method === 'POST') {

        console.log(req.body);

        const { user_id, title, schedule, color, schedule, frequency, description } = req.body;
        
        const headers = {
          "Authorization": "Bearer " + token,
          "Content-Type": 'application/json'
        }
        const habitData = {
            user_id,
            title,
            schedule,
            color,
            schedule,
            frequency,
            description 
        }

        const response = await Axios.post(API_URL + 'habits', habitData, {
          headers: headers
        })

        console.log('API RESPONSE: ', response)

        // if(response.data){
        //     res.status(201).send(response);
        // } else {
        //     res.status(400).send('Unexpected error. Please try again!')
        // }
        
    } else {
      // Handle any other HTTP method
    }
  }