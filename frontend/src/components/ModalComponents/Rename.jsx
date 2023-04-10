import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalsSlice.js';
import { useApi } from '../../hooks/index.jsx';
import { selectors } from '../../slices/channelsSlice.js';

const Rename = () => {
  const { t } = useTranslation();
  const api = useApi();
  const dispatch = useDispatch();
  const setCloseModal = () => dispatch(closeModal());
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const channels = useSelector(selectors.selectAll);
  const currentRenameId = useSelector(({ modalsSlice }) => modalsSlice.id);
  const [currentChannel] = channels.filter((channel) => channel.id === currentRenameId);
  const channelNames = channels.map((channel) => channel.name);
  const signUpSchema = yup.object().shape({
    name: yup.string()
      .trim()
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax'))
      .notOneOf(channelNames, t('errors.uniq'))
      .required(t('errors.required')),
  });
  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: signUpSchema,
    onSubmit: async () => {
      const { name } = formik.values;
      try {
        await api.renameChannel({ id: currentRenameId, name });
        toast.success(t('toast.rename'));
        setCloseModal();
      } catch (err) {
        toast.error(t('toast.network'));
      }
    },
  });
  return (
    <Modal show centered onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              value={formik.values.name}
              name="name"
              id="name"
              className="mb-2"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.nameChannel')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={setCloseModal}>
              {t('modals.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modals.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Rename;
