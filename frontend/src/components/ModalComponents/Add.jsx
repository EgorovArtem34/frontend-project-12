import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalsSlice.js';
import hooks from '../../hooks/index.jsx';

const Add = () => {
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
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
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
    },
  });
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={setCloseModal}>
        <Modal.Title>Добавить канал</Modal.Title>
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
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={setCloseModal}>
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Add;
