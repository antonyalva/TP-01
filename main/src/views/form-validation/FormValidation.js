import React, { useState, useEffect } from 'react';
import { Row, Col, Button, FormGroup, Label, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
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

const FormValidate = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm(); // Añadido setValue para manejar datos
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { state } = useLocation();
  const [doctor, setDoctor] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    documento_identidad: '',
    edad: '',
    especialidad: ''
  });

  const fetchDoctor = async (id) => {
    try {
      const response = await axiosInstance.get(`/dev/doctores/${id}`);
      const doctorData = response.data;

      // Cargar los datos del doctor en el formulario y en el estado
      setDoctor(doctorData);
      setValue('firstname', doctorData.nombres);
      setValue('lastname', doctorData.apellidos);
      setValue('email', doctorData.email);
      setValue('mobile', doctorData.documento_identidad);
      setValue('age', doctorData.edad);
      setValue('especialidad', doctorData.especialidad);
      
    } catch (err) {
      console.error('Error al cargar el doctor:', err);
    }
  };

  useEffect(() => {
    if (state && state.mode === 'edit' && state.id) {
      // Modo editar: cargar datos del doctor
      setIsEditMode(true);
      fetchDoctor(state.id);
    }
  }, [state]);

  const onSubmit = async (data) => {
    if (isEditMode) {
      try {
        const response = await axiosInstance.put(`/dev/doctores/${state.id}`, {
          nombres: data.firstname,
          apellidos: data.lastname,
          email: data.email,
          documento_identidad: data.mobile,
          edad: parseInt(data.age, 10),
          especialidad: data.especialidad
        });
        console.log(response.data);
        setSubmitStatus({ type: 'success', message: 'Doctor actualizado exitosamente' });
      } catch (err) {
        setSubmitStatus({ type: 'error', message: 'Error al actualizar el doctor' });
      }
    } else {
      try {
        const response = await axiosInstance.post('/dev/doctores', {
          nombres: data.firstname,
          apellidos: data.lastname,
          email: data.email,
          documento_identidad: data.dni,
          edad: parseInt(data.age, 10),
          especialidad: data.especialidad,
          password: data.password
        });
        console.log(response.data);
        setSubmitStatus({ type: 'success', message: 'Doctor registrado exitosamente' });
        reset();
      } catch (error) {
        console.error('Error al registrar doctor:', error);
        setSubmitStatus({ type: 'error', message: 'Error al registrar doctor' });
      }
    }
  };

  return (
    <Row>
      <Col sm="12">
        <ComponentCard title={isEditMode ? 'Editar Doctor' : 'Registrar Doctor'}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label className="control-Label" htmlFor="firstname">Nombres</Label>
              <div className="mb-2">
                <input
                  type="text"
                  {...register('firstname', { required: true })}
                  className="form-control"
                  value={doctor.nombres} // Usando el estado doctor para controlar el valor
                  onChange={(e) => setDoctor({ ...doctor, nombres: e.target.value })} // Actualiza el estado
                />
              </div>
              <span className="text-danger">{errors.firstname && 'El nombre es requerido.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="lastname">Apellidos</Label>
              <div className="mb-2">
                <input
                  type="text"
                  {...register('lastname', { required: true })}
                  className="form-control"
                  value={doctor.apellidos} // Usando el estado doctor para controlar el valor
                  onChange={(e) => setDoctor({ ...doctor, apellidos: e.target.value })} // Actualiza el estado
                />
              </div>
              <span className="text-danger">{errors.lastname && 'El apellido es requerido.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="email">Email</Label>
              <div className="mb-2">
                <input
                  type="text"
                  {...register('email', { required: true })}
                  className="form-control"
                  value={doctor.email} // Usando el estado doctor para controlar el valor
                  onChange={(e) => setDoctor({ ...doctor, email: e.target.value })} // Actualiza el estado
                />
              </div>
              <span className="text-danger">{errors.email && 'El password es requerido.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="password">Password</Label>
              <div className="mb-2">
                <input
                  type="text"
                  {...register('password', { required: true })}
                  className="form-control"
                  value={doctor.password} // Usando el estado doctor para controlar el valor
                  onChange={(e) => setDoctor({ ...doctor, password: e.target.value })} // Actualiza el estado
                />
              </div>
              <span className="text-danger">{errors.lastname && 'El email es requerido.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="dni">DNI</Label>
              <div className="mb-2">
                <input
                  type="text"
                  {...register('dni', { required: true })}
                  className="form-control"
                  value={doctor.dni} // Usando el estado doctor para controlar el valor
                  onChange={(e) => setDoctor({ ...doctor, dni: e.target.value })} // Actualiza el estado
                />
              </div>
              <span className="text-danger">{errors.lastname && 'El DNI es requerido.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="age">Edad</Label>
              <div className="mb-2">
                <input
                  type="text"
                  {...register('age', { required: true })}
                  className="form-control"
                  value={doctor.edad} // Usando el estado doctor para controlar el valor
                  onChange={(e) => setDoctor({ ...doctor, edad: e.target.value })} // Actualiza el estado
                />
              </div>
              <span className="text-danger">{errors.lastname && 'La edad es requerida.'}</span>
            </FormGroup>
            <FormGroup>
              <Label className="control-Label" htmlFor="especialidad">Especialidad</Label>
              <div className="mb-2">
                <input
                  type="text"
                  {...register('especialidad', { required: true })}
                  className="form-control"
                  value={doctor.especialidad} // Usando el estado doctor para controlar el valor
                  onChange={(e) => setDoctor({ ...doctor, especialidad: e.target.value })} // Actualiza el estado
                />
              </div>
              <span className="text-danger">{errors.lastname && 'La edad es requerida.'}</span>
            </FormGroup>
            
            {/* Otras secciones del formulario... */}
            <FormGroup>
              <Button className="btn" color="primary" size="lg" block type="submit">
                {isEditMode ? 'Guardar cambios' : 'Guardar'}
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
  );
};

export default FormValidate;
