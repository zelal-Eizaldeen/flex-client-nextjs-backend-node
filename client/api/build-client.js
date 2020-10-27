import axios from 'axios';

const clientBuild = ({ req }) => {
  
  if (typeof window === 'undefined') {
console.log('in server', req.headers, 'HIIIIIIII')
    // We are on the server
    return axios.create({
      baseURL:
        // 'http://localhost:5000',
        process.env.NEXT_PUBLIC_BACKEND_BUILD_CLIENT,
      headers: req.headers,
      withCredentials: true,
     
     
    });
  } else {
    console.log('in browser')

    // We must be on the browser
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BUILD_CLIENT,
      // baseURL: 'http://localhost:5000',
      withCredentials: true
     
    });
  }
}
export default clientBuild;



