import React from 'react';
import css from './ImageGallery.module.css';


export const ImageGallery = ({gallery, onSelectImg}) => {

    return (
        <ul className={css.imageGallery}>
            {gallery.map((item,index) => (
              <li className={css.imageGalleryItem} key={index} onClick={()=>onSelectImg(item.largeImageURL)}>
            <img src={item.webformatURL} alt={item.tags} className={css.imageGalleryItemImage}/>
        </li>
          ))}  
    </ul>
)
 }
