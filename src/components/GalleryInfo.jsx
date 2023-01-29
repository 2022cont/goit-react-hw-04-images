import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import ErrorMessage from './service/ErrorMessage';
import * as API from './service/GalleryFetchAPI';

import { ImageGallery } from './gallery/ImageGallery';

import ImSpeenerWait from './gallery/ImSpeenerWait';

import css from './App.module.css';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
};

export default function GalleryInfo({ imgSearch, onSelectImg }) {

    const [firstRender, setFirstRender] = useState(true);

    const [images, setImages] = useState(null);
    const [error, setError] = useState('');
    const [status, setStatus] = useState(Status.IDLE);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!imgSearch) {
            return;
        }

        if (firstRender) {
            setFirstRender(false);
            return;
        };

        setStatus(Status.PENDING);
        setPage(1);
        setImages(null);

        API.galleryFetchAPI(imgSearch, page)
            .then(data => {
                if (data.hits.length === 0) {
                    setError('Sorry, there are no images matching your search query. Please try again.');
                    setStatus(Status.REJECTED);
                    return;
                } else {
                    setImages(data.hits);
                    setStatus(Status.RESOLVED);
                }
            })
            .catch(error => {
                setError(error);
                setStatus(Status.REJECTED)
            })


    }, [imgSearch, firstRender]);


    const loadMore = () => {
        setPage(prevState => prevState + 1);
        addGallery();
    };

    const addGallery = () => {
        API.galleryFetchAPI(imgSearch, page)
            .then(data => setImages([...images, ...data.hits]))
    }

    if (status === 'pending') {
        return (<ImSpeenerWait />)
    };

    if (status === 'rejected') {
        return (<ErrorMessage message={error} />)
    };

    if (status === 'resolved') {

        return (
            <>
                <ImageGallery gallery={images} onSelectImg={onSelectImg} />
                <button type='button' className={css.button} onClick={loadMore} >
                    Load more</button>
            </>

        )
    };

};


GalleryInfo.propTypes = {
    onSelectImg: PropTypes.func,
    imgSearch: PropTypes.string,
};

