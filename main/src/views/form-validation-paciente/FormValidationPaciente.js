import React, { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';
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
  //const navigate = useNavigate();
  const { state } = useLocation(); // Obtenemos el estado de la navegación (si estamos en modo edición)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Función para cargar los datos del paciente cuando estamos en modo edición
  const fetchPaciente = async (id) => {
    try {
      const response = await axiosInstance.get(`/dev/pacientes/${id}`);
      const paciente = response.data;

      // Cargamos los valores del paciente en los campos del formulario
      setValue('firstname', paciente.nombres);
      setValue('lastname', paciente.apellidos);
      setValue('email', paciente.email);
      setValue('mobile', paciente.documento_identidad);
      setValue('age', paciente.edad);
      setValue('compañia', paciente.compañia);

      setIsEditMode(true); // Indicamos que estamos en modo edición
    } catch (error) {
      console.error('Error al cargar los datos del paciente:', error);
    }
  };

  useEffect(() => {
    // Si hay un estado (id) pasado desde la navegación, significa que estamos en modo edición
    if (state && state.id) {
      fetchPaciente(state.id);
    }
  }, [state]);

  const onSubmit = async (data) => {
    if (isEditMode) {
      // Modo edición (actualizar paciente)
      try {
        await axiosInstance.put(`/dev/pacientes/${state.id}`, {
          nombres: data.firstname,
          apellidos: data.lastname,
          email: data.email,
          documento_identidad: data.mobile,
          edad: parseInt(data.age, 10),
          compañia: data.compañia
        });
        setSubmitStatus({ type: 'success', message: 'Paciente actualizado exitosamente' });
      } catch (error) {
        console.error('Error al actualizar paciente:', error);
        setSubmitStatus({ type: 'error', message: 'Error al actualizar paciente' });
      }
    } else {
      // Modo registro (nuevo paciente)
      try {
        await axiosInstance.post('/dev/pacientes', {
          nombres: data.firstname,
          apellidos: data.lastname,
          email: data.email,
          documento_identidad: data.mobile,
          edad: parseInt(data.age, 10),
          compañia: data.compañia
        });
        setSubmitStatus({ type: 'success', message: 'Paciente registrado exitosamente' });
        reset();
      } catch (error) {
        console.error('Error al registrar paciente:', error);
        setSubmitStatus({ type: 'error', message: 'Error al registrar paciente' });
      }
    }
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title={isEditMode ? 'Editar Paciente' : 'Registrar Paciente'}>
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
                <span className="text-danger">{errors.firstname && 'El campo Nombres es requerido'}</span>
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
                <span className="text-danger">{errors.lastname && 'El campo Apellidos es requerido'}</span>
              </FormGroup>
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
                <span className="text-danger">{errors.email && 'El campo Email es requerido'}</span>
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
                <span className="text-danger">{errors.compañia && 'El campo Compañía es requerido'}</span>
              </FormGroup>
              <FormGroup>
                <Button className="btn" color="primary" size="lg" block type="submit">
                  {isEditMode ? 'Guardar cambios' : 'Registrar Paciente'}
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
