import { useState } from 'react';

import Searchbar from "./searchBar/Searchbar";
import Modal from "./modal/Modal";
import GalleryInfo from './GalleryInfo';

import css from './App.module.css';

export default function App() {
  const [selectedPicture, setSelectedPicture] = useState('');
  const [imgSearch, setImgSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onSelectImg = (data) => {
    setSelectedPicture(data);
    setShowModal(!showModal);
  }

  const formHandelSubmit = data => {
    setImgSearch(data)
  };

  return (

    <div className={css.App}>

      <Searchbar onSubmit={formHandelSubmit} />

      <GalleryInfo imgSearch={imgSearch} onSelectImg={onSelectImg} />


      {showModal && (
        <Modal onClose={onSelectImg} >
          <img src={selectedPicture} alt='Modal' />
        </Modal>
      )}

    </div>
  );

};







