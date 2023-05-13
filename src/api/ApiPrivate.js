
import axios from 'axios'


const ApiToken = axios.create({
    
    baseURL: 'http://localhost:8000/api',
    /*headers: {
        'Content-Type': 'application/json',
    }*/
    
})


ApiToken.interceptors.request.use( (config) => {

    config.headers = {
        'Content-Type': 'application/json',
         Authorization: 'Bearer ' +  localStorage.getItem('idToken')
    }

    return config
})

// console.log( process.env.NODE_ENV ) // TEST durante testing, 

export default ApiToken
