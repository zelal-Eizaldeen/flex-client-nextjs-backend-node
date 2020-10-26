import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const Home = ({ currentUser}) => {
 console.log(currentUser, 'Home')
  return (
    <div className={styles.container}>
      <Head>
        <title>Flex - Health Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">FLEX!</a>
        </h1>

        <p className={styles.description}>
          Get started by FLEX{' '}
          <code className={styles.code}>
            {currentUser ? 'You are signed in' : 'You are not signed in'}
          </code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Flex &rarr;</h3>
            <p>Find in-depth information about FLEX HEALTH CLUB features.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>TAKE APPOINMENT &rarr;</h3>
            <p>Take appoinment for your class.</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Cardio &rarr;</h3>
            <p>Add your cardio program.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Resistance &rarr;</h3>
            <p>Add your Resistance program.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps({req}) {
       const {data} = await axios.get('http://localhost:5000/api/users/currentuser', {
         headers: req.headers,
       });
   //Pass data to the page via props
   return { props: { data } }
}
// Home.getInitialProps = async (context, client, currentUser)  => {
//   console.log('From index', currentUser)
//  return {}
// };
export default Home;
