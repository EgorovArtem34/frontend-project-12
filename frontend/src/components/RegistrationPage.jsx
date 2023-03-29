import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Row, Card,
} from 'react-bootstrap';
import * as yup from 'yup';
import logo from '../assets/registration.jpg';
import routes from '../hooks/routes.js';
import hooks from '../hooks/index.jsx';

const RegistrationPage = () => {
  const inputEl = useRef(null);
  const [RegFailed, setRegFailed] = useState(false);
  const { useAuth } = hooks;
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const signUpSchema = yup.object().shape({
    username: yup.string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Не менее 6 символов')
      .trim()
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        setRegFailed(false);
        const response = await axios.post(routes.signup(), values);
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setRegFailed(true);
          inputEl.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={logo} className="rounded-circle" alt="Регистрация" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      value={formik.values.username}
                      placeholder="От 3 до 20 символов"
                      name="username"
                      id="username"
                      autoComplete="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={(formik.touched.username && formik.errors.username) || RegFailed}
                      type="text"
                      required
                      ref={inputEl}
                    />
                    <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      aria-describedby="passwordHelpBlock"
                      placeholder="Не менее 6 символов"
                      autoComplete="new-password"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={(formik.touched.password && formik.errors.passwor) || RegFailed}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      aria-describedby="passwordHelpBlock"
                      placeholder="Пароли должны совпадать"
                      autoComplete="new-password"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword)
                        || RegFailed}
                    />
                    <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {RegFailed ? 'Такой пользователь уже существует' : formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
};
export default RegistrationPage;
