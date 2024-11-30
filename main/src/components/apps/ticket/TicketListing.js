import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, UncontrolledTooltip, Input, Alert } from 'reactstrap';
import axios from 'axios';
//import { fetchTickets, SearchTicket } from '../../../store/apps/ticket/TicketSlice';

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
      config.headers.Authorization = token;
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
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredDoctors, setFilteredDoctors] = useState([]); 
  const [deleteMessage, setDeleteMessage] = useState(null);
  
  const fetchDoctors = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/dev/doctores');
      setDoctors(response.data);
      setFilteredDoctors(response.data); // Inicialmente, los doctores filtrados son los mismos
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los doctores');
      setLoading(false);
    }
  }, []);

  const deleteDoctor = useCallback(async (id) => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este doctor?'); // Mensaje de confirmación
    if (isConfirmed) {
      try {
        await axiosInstance.delete(`/dev/doctores/${id}`);
        setDeleteMessage({ type: 'success', text: 'Doctor eliminado exitosamente.' });
        fetchDoctors(); // Recargar la lista de doctores
      } catch (err) {
        setDeleteMessage({ type: 'danger', text: 'Error al eliminar el doctor.' });
      }
    }
  }, [fetchDoctors]);

  // Función para manejar la edición y redirigir a la vista de editar con el ID del doctor
  const handleEditDoctor = (doctorId) => {
    navigate(`/form-validation`, { state: { id: doctorId, mode: 'edit' } });
  };

  // Función para manejar la búsqueda de doctores
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    
    const filtered = doctors.filter((doctor) =>
      doctor.nombres.toLowerCase().includes(searchValue) ||
      doctor.apellidos.toLowerCase().includes(searchValue) ||
      doctor.email.toLowerCase().includes(searchValue) ||
      doctor.documento_identidad.includes(searchValue)
    );
    
    setFilteredDoctors(filtered); // Actualizar los doctores filtrados
  };
  useEffect(() => {
    //dispatch(fetchTickets());
    fetchDoctors();
  }, [dispatch, fetchDoctors]);

  return (
    <div>
      <div className="row">
        <h2 mb="10">Listado de Doctores</h2>
        <div className="col-3 ">
          <Input
            type="text"
            placeholder="Buscar Doctor..."
            value={searchTerm} // Conectar el input con el estado searchTerm
            onChange={handleSearch} // Manejar la búsqueda cuando se escribe algo
          />
        </div>
        <div className="col-6 ">
          
        </div>
        <div className="col-3 d-flex-end text-end">
        <span
          className="btn btn-info text-white"
          onClick={() => {
            navigate('/form-validation');
          }}
        >
                        REGISTRAR DOCTOR
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
        {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
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
                    onClick={() => handleEditDoctor(doctor.id)} // Llama a la función de edición
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
          ))
        ) : (  <tr>
          <td colSpan="7" className="text-center">
            No se encontraron doctores.
          </td>
        </tr>
      )}
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
