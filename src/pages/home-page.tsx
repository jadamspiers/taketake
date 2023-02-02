
import React from 'react';
import { Navbar } from '../components/navbar';
import { useAuth0 } from '@auth0/auth0-react';

export const HomePage: React.FC = () => {

  const { user } = useAuth0();

  return (
    <div className="flex flex-col">
      {user 
        ? <Navbar loggedIn={false} />
        : <Navbar loggedIn={true} />
      }
      <div className="grid h-screen place-items-center">
        <button className="h-12 w-24 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Play</button>
      </div>
      {user
        ? <div>Logged In as {user.name}</div>
        : <div>Not logged in</div>
      }
    </div>
  );
};
