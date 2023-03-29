import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import hooks from '../../hooks/index.jsx';
import { closeModal } from '../../slices/modalsSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const { useSocket } = hooks;
  const socket = useSocket();
  const dispatch = useDispatch();
  const makeRemoveChannel = (id) => socket.removeChannel({ id });
  const removeId = useSelector(({ modalsSlice }) => modalsSlice.id);
  const setCloseModal = () => dispatch(closeModal());
  const handleSubmit = (e) => {
    e.preventDefault();
    makeRemoveChannel(removeId);
    setCloseModal();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={setCloseModal}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p className="lead">{t('modals.areYouSure')}</p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={setCloseModal}>
              {t('modals.cancel')}
            </Button>
            <Button type="submit" variant="danger">
              {t('modals.delete')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
