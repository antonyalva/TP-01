import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, UncontrolledTooltip, Input, Alert } from 'reactstrap';
import axios from 'axios';
import { fetchTickets, SearchTicket } from '../../../store/apps/ticket/TicketSlice';

// Función para obtener el token de autorización
const getIdToken = () => {
  return sessionStorage.getItem('IdToken');
};

// Configuración de axios con el token de autorización
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const TicketListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/dev/doctores');
      setDoctors(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los doctores');
      setLoading(false);
    }
  }, []);

  const deleteDoctor = useCallback(async (id) => {
    try {
      await axiosInstance.delete(`/dev/doctores/${id}`);
      setDeleteMessage({ type: 'success', text: 'Doctor eliminado exitosamente.' });
      fetchDoctors(); // Recargar la lista de doctores
    } catch (err) {
      setDeleteMessage({ type: 'danger', text: 'Error al eliminar el doctor.' });
    }
  }, [fetchDoctors]);


  useEffect(() => {
    dispatch(fetchTickets());
    fetchDoctors();
  }, [dispatch, fetchDoctors]);

  return (
    <div>
      <div className="row">
        <div className="col-3 ">
          <Input
            type="text"
            onChange={(e) => dispatch(SearchTicket(e.target.value))}
            placeholder="Search Ticket..."
          />
        </div>
        <div className="col-6 ">
          
        </div>
        <div className="col-3 ">
        <span
                        className="btn btn-info text-white"
                        onClick={() => {
                          navigate('/form-validation-paciente');
                        }}
                      >
                        REGISTRAR PACIENTE
                      </span>
        </div>
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table className="align-middle">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Email</th>
              <th>Documento de Identidad</th>
              <th>Edad</th>
              <th>Especialidad</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.nombres}</td>
                <td>{doctor.apellidos}</td>
                <td>{doctor.email}</td>
                <td>{doctor.documento_identidad}</td>
                <td>{doctor.edad}</td>
                <td>{doctor.especialidad}</td>
                <td>
                  <i
                    className="bi bi-pencil cursor-pointer me-2"
                    id={`EditTooltip-${doctor.id}`}
                    onClick={() => {/* Implementar edición */}}
                  />
                  <UncontrolledTooltip placement="top" target={`EditTooltip-${doctor.id}`}>
                    Editar
                  </UncontrolledTooltip>
                  <i
                    className="bi bi-trash cursor-pointer"
                    id={`DeleteTooltip-${doctor.id}`}
                    onClick={() => deleteDoctor(doctor.id)}
                  />
                  <UncontrolledTooltip placement="top" target={`DeleteTooltip-${doctor.id}`}>
                    Eliminar
                  </UncontrolledTooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {deleteMessage && (
        <Alert color={deleteMessage.type} className="mt-3">
          {deleteMessage.text}
        </Alert>
      )}
    </div>
  );
};

export default TicketListing;
