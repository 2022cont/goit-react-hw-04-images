import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {

    useEffect(() => {
        window.addEventListener('keydown', hendelModalClose);
    })

    const hendelModalClose = event => {
        if (event.code === 'Escape' || event.currentTarget === event.target) {
            onClose();
        }
    };

    return createPortal(<div className={css.overlay} onClick={hendelModalClose}>
        <div className={css.modal}>
            {children}
        </div>
    </div>, modalRoot);

};

Modal.propTypes = {
    onClose: PropTypes.func,
}


