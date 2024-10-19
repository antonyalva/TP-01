import React from 'react';
//import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link , useNavigate  } from 'react-router-dom';
//import AuthLogo from "../../layouts/logo/AuthLogo";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

const LoginFormik = () => {
  const navigate = useNavigate();

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



  const loginUsuario = async (emailValue,passwordValue) => {
    try {
      console.log(emailValue)
      console.log(passwordValue)
      // Establecemos la base URL global para Axios
      axios.defaults.baseURL = 'http://localhost:4000';

      // Llamada al servicio
      console.log('ingresó',);

      const response = await axios.post('api/auth', {
        // Datos del paciente
        email: emailValue,
        password: passwordValue
        // ... otros campos
      });

      console.log('paciente logeado:', response.data);
      navigate('/dashboards/minimal');
      // Aquí puedes agregar más lógica después de registrar el paciente
    } catch (error) {
      console.error('Error al logear:', error);
      // Manejo de errores
    } finally {
      // setLoading(false);
    }
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
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={() => {
                    // eslint-disable-next-line no-alert
                    //alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    //navigate('/dashboards/minimal');
                  }}
                  render={({ values, errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          value={values.email} // Asegúrate de que el valor se actualice correctamente
                          className={`form-control${errors.email && touched.email ? ' is-invalid' : ''
                            }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          value={values.password} // Asegúrate de que el valor se actualice correctamente
                          className={`form-control${errors.password && touched.password ? ' is-invalid' : ''
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
                        <Button onClick={() => {
                          const emailValue = values.email;
                          const passwordValue = values.password;
                          loginUsuario(emailValue,passwordValue);
                        }}
                          type="submit" color="primary" className="me-2">
                          Ingresar
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
