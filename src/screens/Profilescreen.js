import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Nav from '../Nav';
import "./Profilescreen.css";
import Plansscreen from './Plansscreen';

function Profilescreen() {
    const user = useSelector(selectUser);
  return (
    <div className='profilescreen'>
        <Nav />
        <div className='profilescreen_body'>
            <h1>Edit Profile</h1>
            <div className='profilescreen_info'>
                <img 
                    src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' 
                    alt=''
                />
                <div className='profilescreen_details'>
                    <h2>{user.email}</h2>
                    <div className='profilescreen_plans'>
                        <h3>Plans</h3>
                        <Plansscreen />
                        <button
                            onClick={() => signOut(getAuth())}
                            className='profilescreen_signOut'>
                                Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profilescreen