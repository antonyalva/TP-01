import React, { useState } from 'react';
import { Row, Col, Button, FormGroup, Label, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import ComponentCard from '../../components/ComponentCard';
import axios from 'axios';

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

const FormValidate = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/dev/doctores', {
        nombres: data.firstname,
        apellidos: data.lastname,
        email: data.email,
        documento_identidad: data.mobile,
        edad: parseInt(data.age),
        especialidad: data.especialidad
      });
      console.log(response.data);
      setSubmitStatus({ type: 'success', message: 'Doctor registrado exitosamente' });
      reset();
    } catch (error) {
      console.error('Error al registrar doctor:', error);
      setSubmitStatus({ type: 'error', message: 'Error al registrar doctor' });
    }
  };
  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Registrar Doctor">
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
                email
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.email && 'Email is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="mobile">
                  Nro Dni
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('mobile', { required: true, maxLength: 11, minLength: 8 })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">
                  {errors.mobile && 'Ingrese un número de DNI válido.'}
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
                <Label className="control-Label" htmlFor="especialidad">
                  Especialidad
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('especialidad', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.especialidad && 'La especialidad es requerida.'}</span>
              </FormGroup>
              <FormGroup>
                <Button className="btn" color="primary" size="lg" block type="submit">
                  Registrar
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

export default FormValidate;
