import React, { useState } from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

const LoginFormik = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://2ewq4qbzqh.execute-api.us-east-1.amazonaws.com/dev/login', {
        email: values.email,
        password: values.password,
      });

      if (response.data && response.data.accessToken) {
        // Almacenar el token en sessionStorage
        sessionStorage.setItem('authToken', response.data.accessToken);
        // Redirigir al dashboard
        navigate('/dashboards/minimal');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            {/* <AuthLogo /> */}
            <Card>
              <CardBody className="p-4 m-1">
                <h5 className="mb-0">Bienvenido!</h5>
                {/* <small className="pb-4 d-block">
                  <Link to="/auth/registerformik">Sign Up</Link>
                </small> */}
                {loginError && <Alert color="danger">{loginError}</Alert>}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        {/* <Label check>
                          <Input type="checkbox" />
                          Remember me
                        </Label> */}
                        <Link className="ms-auto text-decoration-none" to="/auth/forgotPwd">
                          <small>Ha olvidado su contraseña?</small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2" disabled={isSubmitting}>
                          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormik;
