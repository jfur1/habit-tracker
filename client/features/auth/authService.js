import axios from 'axios'

const PROXY = 'http://localhost:8000'
const API_URL = PROXY + '/api/entries/'

const user = JSON.parse(localStorage.getItem('user'))