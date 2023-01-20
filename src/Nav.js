import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Heart from "react-heart";

import './Nav.css';
import axios from './axios';

const base_url = "https://image.tmdb.org/t/p/original/";

const genre = new Map([[28, "Action"],
[12, "Adventure"],
[16, "Animation"],
[35, "Comedy"],
[80, "Crime"],
[99, "Documentary"],
[18, "Drama"],
[10751, "Family"],
[14, "Fantasy"],
[36, "History"],
[27, "Horror"],
[10402, "Music"],
[9648, "Mystery"],
[10749, "Romance"],
[878, "Science Fiction"],
[10770, "TV Movie"],
[53, "Thriller"],
[10752, "War"],
[37, "Western"],
[10759, "Action & Adventure"],
[10762, "Kids"],
[10763, "News"],
[10764, "Reality"],
[10765, "Sci-Fi & Fantasy"],
[10766, "Soap"],
[10767, "Talk"],
[10768, "War & Politics"],
]);

const Search = styled('div')(({ theme }) => ({
  position: 'fixed',
  right: '7%',
  borderRadius: theme.shape.borderRadius,
  color: 'floralwhite',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '10ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

function Nav() {
  const [show, handleShow] = useState(false);
  const [input, setInput] = useState('');
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState(null);
  const [active, setActive] = useState(false);


  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return window.removeEventListener('scroll', {});
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    findMovie(e.target.value);
  };

  const findMovie = async (moviename) => {
    try {
      if (moviename) {
        const result = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=3431d986564d45b1963ca5facd45cc21&query=${moviename}&language=en-US&include_adult=false`
        );
        // console.log(result);
        setSearchResult(result.data.results);
      } else setSearchResult(null);
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div className={`nav ${show ? 'nav_black' : ''}`}>
      <img
        onClick={() => navigate('/')}
        className='nav_logo'
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        alt='Netflix Logo'
      />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search...'
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleInputChange}
          onFocus={() => {
            setDrop(true)
          }}
          onBlur={() => {
            setDrop(true)
          }}
        />
        {drop && <div className='drop_down'>
          {searchResult && searchResult.map((res) => {
            if (res.media_type != "person" && res.backdrop_path != null) {
              //   console.log(res);
              const title = res.title ? res.title : res.name;
              const genre_id = res.genre_ids;

              return (
                <div className="search_card" onClick={()=>console.log("unga bunga")}>
                  <img
                    src={base_url + res.poster_path}
                    className="search_img"
                  />
                  <div className='search_context'>
                    <h1 className='search_title'>{title}</h1>
                    <p className='search_genre'>
                      {
                        genre_id.map(element => {
                          return ("• " + genre.get(element) + " ")
                        })
                      }
                    </p>
                    <div style={{ width: "2rem" }}>
                      <Heart isActive={active} onClick={() => setActive(!active)} animationScale={1.2} animationTrigger="both" animationDuration={.2} className={`customHeart${active ? " active" : ""} search_heart`}/>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>}
      </Search>
      <img
        onClick={() => navigate('/profile')}
        className='nav_avatar'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
        alt='Netflix Avatar'
      />
    </div>
  );
}

export default Nav;