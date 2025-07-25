import Section from '../Section/Section';
import Container from '../Container/Container';
// import Form from '../Form/Form';
import { useEffect, useState } from 'react';
import type { Photo } from '../../types/photo';
import { getPhotos } from '../../services/photos';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
// import Modal from '../Modal/Modal';
import ImageModal from '../ImageModal/ImageModal';
import Button from '../Button/Button';
import FormSelect from '../FormSelect/FormSelect';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleSelectPhoto = (photo: Photo | null) => {
    setIsOpen(true);
    setSelectedPhoto(photo);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          toast.error('No photos found for this query');
          return;
        }

        setPhotos((prevPhotos) => [...prevPhotos, ...photos]);
        setIsVisible(page * per_page < total_results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [query, page]);

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPhoto(null);
  };

  const handleSubmit = (query: string) => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsVisible(false);
  };
  return (
    <>
      <Section>
        <Container>
          {/* <Form onSubmit={handleSubmit} /> */}
          <FormSelect query={query} onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {error && <Text>Something went wrong. Please try again.</Text>}
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={handleSelectPhoto} />
          )}
          {isVisible && photos.length > 0 && (
            <Button onClick={loadMore} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load more'}
            </Button>
          )}
          {/* Uncomment the Modal component if needed */}
          {/* <Modal onClose={() => setSelectedPhoto(null)}>
            <div
              style={{
                backgroundColor: selectedPhoto?.avg_color,
                borderColor: selectedPhoto?.avg_color,
              }}
            >
              <img src={selectedPhoto?.src.large} alt={selectedPhoto?.alt} />
            </div>
          {/* {selectedPhoto && (
            <Modal onClose={() => setSelectedPhoto(null)}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )} */}
          <ImageModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            photo={selectedPhoto}
          />
        </Container>
      </Section>
      <Toaster />
    </>
  );
}
