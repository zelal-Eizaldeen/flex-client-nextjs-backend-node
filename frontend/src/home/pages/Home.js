import React, {useEffect, useState} from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useAuth } from '../../shared/hooks/auth-hook';


import  './Home.css';

const Home = () => {
  const { token } = useAuth();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const responseData = await sendRequest(
           process.env.REACT_APP_BACKEND_URL+'/users/currentuser'
        );
         setLoadedUser(responseData.currentUser);
      } catch (err) {}
    };
    fetchCurrentUser();
  }, [sendRequest]);
  return (
    <div className="container">
      <div>
        <title>Flex - Health Club</title>
        <link rel="icon" href="/favicon.ico" />
      </div>

      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">FLEX!</a>
        </h1>

        <p className="description">
          Get started by FLEX{'  '}
          <code className="code">
            Shape Your Body
           {/* {token ? 'You are signed in' : 'You are not signed in'}  */}
          </code>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Flex &rarr;</h3>
            <p>Find in-depth information about FLEX HEALTH CLUB features.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>TAKE APPOINMENT &rarr;</h3>
            <p>Take appoinment for your class.</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Cardio &rarr;</h3>
            <p>Add your cardio program.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Resistance &rarr;</h3>
            <p>Add your Resistance program.</p>
          </a>
        </div>
      </main>

      <footer className="footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '} FLEX
          {/* <img src="/vercel.svg" alt="FLEX" className="logo" /> */}
        </a>
      </footer>
    </div>
  );
};
export default Home;

// export async function getServerSideProps({req}) {
//   if(req) {
//     const {data} = await axios.get( process.env.NEXT_PUBLIC_BACKEND_URL +'/users/currentuser', {
//       headers: req.headers,
//       withCredentials: true
//     });
// //Pass data to the page via props
// return { props: { data } }
//   }
    
// }
// Home.getInitialProps = async (context, client, currentUser)  => {
//   console.log('From index', currentUser)
//  return {}
// };
