import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../context/Context';

function Header(props) {
  const { title } = props;
  const { searchInputText, setSearchInputText } = useContext(Context);
  const [disbleInput, setDisableInput] = React.useState(true);
  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <Link to="/profile">
          <img src={ profileIcon } alt="profile-icon" />
        </Link>
      </button>
      {title !== 'Profile' && title !== 'Done Recipes' && title !== 'Favorite Recipes'
      && (
        <button
          type="button"
          onClick={ () => setDisableInput(!disbleInput) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-icon"
          />
        </button>
      )}
      { !disbleInput
      && (<input
        type="text"
        data-testid="search-input"
        value={ searchInputText }
        onChange={ (e) => setSearchInputText(e.target.value) }
      />)}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
