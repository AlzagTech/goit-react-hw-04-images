import { useState, useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { GlobalStyle } from './GlobalStyle';
import { Wrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import * as API from '../services/image-api';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus('pending');

    API.fetchImages(searchQuery.trim(), page)
      .then(data => {
        if (data.hits.length === 0) {
          setStatus('rejected');
          setImages([]);
          return;
        }

        setImages(images => [...images, ...data.hits]);
        setTotalPages(Math.ceil(data.totalHits / 12));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(setStatus('resolved'));
  }, [searchQuery, page]);

  const handleSubmit = searchQuery => {
    if (!searchQuery) {
      toast.error('Please, enter some text', {
        position: 'top-right',
        duration: 2000,
      });
      return;
    }

    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);

    pageScrollToTop();
  };

  const handleLoad = () => {
    setPage(page + 1);
  };

  const handleModalOpen = id => {
    const image = images.find(image => image.id === Number(id));

    setImage(image);
    onModalOpen();
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const pageScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Toaster />
        <Searchbar onSubmit={handleSubmit} />

        {images.length > 0 && (
          <ImageGallery items={images} onClick={handleModalOpen} />
        )}

        {page < totalPages && images.length > 0 && status === 'resolved' && (
          <Button onClick={handleLoad} />
        )}

        {status === 'pending' && <Loader />}

        {status === 'rejected' && <ErrorMessage />}

        {isModalOpen && <Modal item={image} onClose={onModalClose} />}
      </Wrapper>
    </>
  );
};
