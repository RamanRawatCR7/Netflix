import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import './Nav.css';

function Nav() {

  const [show, handleShow] = useState(false);
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      }
      else {
        handleShow(false);
      }
    });
    return window.removeEventListener("scroll", {});
  }, []);


  const handleClick = (e) => {
    setExpand(!expand)
  }

  return (
    <div className={`nav ${show && 'nav_black'}`}>
      <img
        onClick={() => navigate("/")}
        className='nav_logo'
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt='Netflix Logo'
      />
      {expand ?
        <div className='nav_search'>
          <img
            onClick={handleClick}
            className='search_logo'
            src="https://www.queryly.com/images/whitesearchicon.png"
            alt='Search Logo'
          />

          <input
            className='search_input'
            type='text'
            placeholder='Search'
          />
          <span className='clear' onClick={document.getElementsByClassName('search_input').value = ''} />
        </div>
        :
        <div className='nav_search'><img
        onClick={handleClick}
        className='search_logo'
        src="https://www.queryly.com/images/whitesearchicon.png"
        alt='Search Logo'
      /></div>}
      <img
        onClick={() => navigate("/profile")}
        className='nav_avatar'
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt='Netflix Avatar'
      />
    </div>
  )
}

export default Nav