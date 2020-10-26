import { useEffect } from 'react';
import Router from 'next/router';
import { useHttpClient } from '../../shared/hooks/http-hook';

export default  () =>  {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const doRequest = async () => {
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/signout',
        'POST',
        {},
      );
      Router.push('/')
      } catch (err) {}
  }
  useEffect(() => {
    doRequest()
  }, [])
   
    
//    fetch('http://localhost:5000/api/users/signout', {
//     method: "POST", 
//     credentials: 'include',
//     body: {},
//     signal: undefined, 
  
//   });
// }, [])
//    Router.push('/')
  
  return <div>Signing you out...</div>;
};