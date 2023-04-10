import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks/index.jsx';
import { closeModal } from '../../slices/modalsSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const api = useApi();
  const dispatch = useDispatch();
  const removeId = useSelector(({ modalsSlice }) => modalsSlice.id);
  const setCloseModal = () => dispatch(closeModal());
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.removeChannel({ removeId });
      toast.success(t('toast.delete'));
      setCloseModal();
    } catch (err) {
      toast.error(t('toast.network'));
    }
  };

  return (
    <Modal show centered onHide={setCloseModal}>
      <Modal.Header closeButton>
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
