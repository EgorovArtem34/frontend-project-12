import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { closeModal } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks/index.jsx';
import { selectors } from '../../slices/channelsSlice.js';

const Add = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const setCloseModal = () => dispatch(closeModal());
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const channels = useSelector(selectors.selectAll);
  const channelNames = channels.map((channel) => channel.name);
  const signUpSchema = yup.object().shape({
    name: yup.string()
      .trim()
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax'))
      .notOneOf(channelNames, t('errors.uniq'))
      .required(t('errors.required'))
      .test('profanity', (t('errors.profanity')), (value) => !leoProfanity.check(value)),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      const { name } = formik.values;
      socket.addNewChannel({ name, changeable: true });
      setCloseModal();
      toast.success(t('toast.add'));
    },
  });
  return (
    <Modal show centered onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
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
export default Add;
