import { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/iconbutton/IconButton';

import { ImSearch } from 'react-icons/im';

import css from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {
    const [imgSearch, setImgSearch] = useState('');

    const handleInput = event => {
        setImgSearch(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (imgSearch.trim() === '') {
            alert('Please, enter text in the search bar ');
            return
        };
        onSubmit(imgSearch);
        reset();
    }

    const reset = () => {
        setImgSearch('');
    };


    return (
        <header className={css.searchbar}>
            <form className={css.searchform} onSubmit={handleSubmit}>

                <IconButton aria-label='Icon Search' type='submit'>
                    <ImSearch style={{ size: '20px', color: "blue", verticalAlign: 'middle' }} />
                </IconButton>

                <input
                    className={css.searchFormInput}
                    type="text"
                    placeholder={imgSearch ? imgSearch : 'Search images and photos'}

                    value={imgSearch}
                    onChange={handleInput}
                />


            </form>
        </header>
    )

};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}
