// import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Row, Card, } from 'react-bootstrap';
import logo from '../assets/avatar.jpg';
import * as yup from 'yup';

const LoginPage = () => {
  const inputEl = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);

  const signUpSchema = yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, "Не менее 3 символов")
      .required("Обязательное поле"),
    password: yup.string()
      .trim()
      .min(3, "Не менее 3 символов")
      .required("Обязательное поле"),
  });

  const generateSubmit = async (e) => {
    console.log('generate!')
    setAuthFailed(false);
    try {
      console.log('success', e);
      // const { username, password } = e;
    } catch (e) {
      console.log('catch error');
      setAuthFailed(true);
      // formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: generateSubmit
  });

  useEffect(() => {
    inputEl.current.focus();
  }, [])

  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logo} className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="Ваш ник"
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      type="text"
                      required
                      ref={inputEl}
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control type="password" name="password" id="password" placeholder="password" autoComplete="password" required
                      onChange={formik.handleChange} value={formik.values.password} isInvalid={authFailed} />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary">Войти</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </div>
  )
};

export default LoginPage;