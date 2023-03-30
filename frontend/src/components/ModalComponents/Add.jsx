import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalsSlice.js';
import hooks from '../../hooks/index.jsx';

const Add = () => {
  const { t } = useTranslation();
  const { useSocket } = hooks;
  const socket = useSocket();
  const dispatch = useDispatch();
  const setCloseModal = () => dispatch(closeModal());
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const { channels } = useSelector(({ channelsSlice }) => channelsSlice.channelsData);
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
      name: '',
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      const { name } = formik.values;

      socket.addNewChannel({ name, changeable: true });
      toast.success(t('toast.add'));
      setCloseModal();
    },
  });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={setCloseModal}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              data-testid="input-body"
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
export default Add;
