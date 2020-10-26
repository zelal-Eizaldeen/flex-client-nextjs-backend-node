import axios from 'axios';

const clientBuild = ({ req }) => {
  
  if (typeof window === 'undefined') {
console.log('in server')
    // We are on the server
    return axios.create({
      baseURL:
        'http://localhost:5000',
      headers: req.headers,
     
    });
  } else {
    console.log('in browser')

    // We must be on the browser
    return axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
     
    });
  }
}
export default clientBuild;



