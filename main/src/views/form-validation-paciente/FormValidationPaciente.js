import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, FormGroup, Label, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import axios from 'axios';
import ComponentCard from '../../components/ComponentCard';

const getIdToken = () => {
  return sessionStorage.getItem('IdToken');
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getIdToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const FormValidationPaciente = () => {
  useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/dev/pacientes', {
        nombres: data.firstname,
        apellidos: data.lastname,
        email: data.email,
        documento_identidad: data.mobile,
        edad: parseInt(data.age, 10),
        compañia: data.compañia
      });
      console.log(response.data);
      setSubmitStatus({ type: 'success', message: 'Paciente registrado exitosamente' });
      reset();
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      setSubmitStatus({ type: 'error', message: 'Error al registrar paciente' });
    }
  };
  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Registrar Paciente">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className="control-Label" htmlFor="firstname">
                  Nombres
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('firstname', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.firstname && 'First name is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="lastname">
                  Apellidos
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('lastname', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.lastname && 'Last name is required.'}</span>
              </FormGroup>
              {/* <FormGroup>
                <Label className="control-Label" htmlFor="title">
                  Especialidad
                </Label>
                <div className="mb-2">
                  <select
                    className="form-control"
                    {...register('title', { required: true })}
                  >
                    <option value="">Select Option</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                  </select>
                </div>
                <span className="text-danger">{errors.title && 'Please select value.'}</span>
              </FormGroup> */}
              <FormGroup>
                <Label className="control-Label" htmlFor="email">
                  Email
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.email && 'Email es requerido.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="mobile">
                  Nro Dni
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('mobile', { required: true, maxLength: 8, minLength: 8 })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">
                  {errors.mobile && 'Ingresar DNI correcto de 8 dígitos.'}
                </span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="age">
                  Edad
                </Label>
                <div className="mb-2">
                  <input
                    type="number"
                    {...register('age', { required: true, pattern: /\d+/ })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.age && 'Por favor, ingrese un número para la edad.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="compañia">
                  Compañía
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('compañia', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.compañia && 'La compañía es requerida.'}</span>
              </FormGroup>
              <FormGroup>
                <Button className="btn" color="primary" size="lg" block type="submit">
                  Registrar Paciente
                </Button>
              </FormGroup>
            </Form>
            {submitStatus && (
              <Alert color={submitStatus.type === 'success' ? 'success' : 'danger'}>
                {submitStatus.message}
              </Alert>
            )}
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default FormValidationPaciente;
