import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { FiXCircle } from 'react-icons/fi';

import { Overlay, ModalBox, ModalCloseBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ item, onClose }) => {
  const { largeImageURL, tags } = item;

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  const handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackDropClick}>
      <ModalCloseBtn type="button" onClick={onClose}>
        <FiXCircle size={40} color="#ffffff" />
      </ModalCloseBtn>

      <ModalBox>
        <img src={largeImageURL} alt={tags} />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
