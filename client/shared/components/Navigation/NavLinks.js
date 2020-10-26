import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import Link from 'next/link';


const NavLinks = ({currentUser}) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <Link href="/" exact>
          HOME
        </Link>
      </li>
      {currentUser && (
        <li>
          <Link href="/programs">MY PROGRAMS</Link>
        </li>
      )}
      {currentUser && (
        <li>
          <Link href="/programs/new">ADD PROGRAM</Link>
        </li>
      )}
      {!currentUser&& (
        <li>
          <Link href="/auth/signup">AUTHENTICATE</Link>
        </li>
      )}
      {currentUser && (
        <li>
          {/* <button onClick={auth.logout}>LOGOUT</button> */}
          <Link href="/auth/signout">LOGOUT</Link>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
