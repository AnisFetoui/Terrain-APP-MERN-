import {Link} from 'react-router-dom';
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from './SignOutButton';


const Header = () => {
    const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-green-800 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to="/">Box2Box.com</Link>
            </span>
            <span className='flex space-x-2'>
            {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-green-950"
                to="/my-reservations"
              >
                My Reservations
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-green-950"
                to="/my-stadiums"
              >
                My Stadiums
              </Link>
              { <SignOutButton /> }
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-green-950 px-3 font-bold hover:bg-gray-200"
            >
              Sign In
            </Link>
          )}
            </span>
        </div>
    </div>
  )
}

export default Header
