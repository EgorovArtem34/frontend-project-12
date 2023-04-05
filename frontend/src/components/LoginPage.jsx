import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Row, Card,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import logo from '../assets/avatar.jpg';
import routes from '../hooks/routes.js';
import { useAuth } from '../hooks/index.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const inputEl = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const signUpSchema = yup.object().shape({
    username: yup.string()
      .trim()
      .required(t('errors.required')),
    password: yup.string()
      .trim()
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputEl.current.select();
          return;
        }
        toast.error(t('toast.network'));
      }
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logo} className="rounded-circle" alt={t('login.signIn')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.signIn')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder={t('login.yourName')}
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      type="text"
                      required
                      ref={inputEl}
                    />
                    <Form.Label htmlFor="username">{t('login.yourName')}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      placeholder={t('login.password')}
                      autoComplete="password"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{t('login.invalid')}</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary">{t('login.signIn')}</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.haveAccount')}</span>
                {' '}
                <a href="/signup">{t('login.signUp')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default LoginPage;
