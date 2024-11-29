import React, { useState, useEffect, useCallback } from 'react';
import {  Alert, Button, UncontrolledTooltip, Table, Input} from 'reactstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ReactBootstrapTable.scss';

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


const Datatables = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [filteredPacientes, setFilteredPacientes] = useState([]); 

  const fetchPacientes = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/dev/pacientes');
      setPacientes(response.data);
      setFilteredPacientes(response.data); // Inicializa pacientes filtrados
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los pacientes');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPacientes();
  }, [fetchPacientes]);

   // Función para manejar la edición y redirigir a la vista de editar con el ID del doctor
   const handleEditPaciente = (pacienteId) => {
    navigate(`/form-validation-paciente`, { state: { id: pacienteId, mode: 'edit' } });
  };
  /*
  const onAfterDeleteRow = async (rowKeys) => {
    if (rowKeys.length !== 1) {
      setDeleteMessage({ type: 'danger', text: 'Por favor, seleccione solo un paciente para eliminar.' });
      return;
    }

    try {
      await axiosInstance.delete(`/dev/paciente/${rowKeys[0]}`);
      setDeleteMessage({ type: 'success', text: 'Paciente eliminado exitosamente.' });
      fetchPacientes(); // Recargar la lista de pacientes
    } catch (err) {
      setDeleteMessage({ type: 'danger', text: 'Error al eliminar el paciente.' });
    }
  };*/
  // Función para manejar la búsqueda de pacientes
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    
    const filtered = pacientes.filter((paciente) =>
      paciente.nombres.toLowerCase().includes(searchValue) ||
      paciente.apellidos.toLowerCase().includes(searchValue) ||
      paciente.email.toLowerCase().includes(searchValue) ||
      paciente.documento_identidad.includes(searchValue)
    );
    
    setFilteredPacientes(filtered); // Actualizar los doctores filtrados
  };
  useEffect(() => {
    //dispatch(fetchTickets());
    fetchPacientes();
  }, [dispatch, fetchPacientes]);


  const deletePaciente = useCallback(async (id) => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este paciente?'); // Mensaje de confirmación
    if (isConfirmed) {
      try {
        await axiosInstance.delete(`/dev/paciente/${id}`);
        setDeleteMessage({ type: 'success', text: 'Paciente eliminado exitosamente.' });
        fetchPacientes(); // Recargar la lista de doctores
      } catch (err) {
        setDeleteMessage({ type: 'danger', text: 'Error al eliminar el paciente.' });
      }
    }
  }, [fetchPacientes]);


  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        
      </div>
      <div className="row mb-4">
        <h2 mb="10">Listado de Pacientes</h2>
        <div className="col-3 ">
          <Input
            type="text"
            placeholder="Buscar Paciente..."
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
      <Table className="table table-striped table-hover table-bordered"  >
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
              <th  className="col-1">Email</th>
              <th>DNI</th>
              <th>Edad</th>
              <th>Compañía</th>
            <th>Acciones</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody >
        {filteredPacientes.length > 0 ? (
            filteredPacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.nombres}</td>
                <td>{paciente.apellidos}</td>
                <td>{paciente.email}</td>
                <td>{paciente.documento_identidad}</td>
                <td>{paciente.edad}</td>
                <td>{paciente.compañia}</td>
                <td>
                <div className="">
                  <div className="col-12 d-flex-center text-center mb-1">
                    <div>
                      <Button
                        color="primary"
                        size="sm"
                        title="Realizar examen"
                        onClick={() => navigate(`/tickt/ticket-detail`, { state: { pacienteId: paciente.id} })}
                      >
                        Realizar examen
                      </Button>
                    </div>
                  </div>

                  <div className="col-12 d-flex-center text-center">
                    <div>
                      <Button
                        color="info"
                        size="sm"
                        title="Ver resultado examen"
                        onClick={() => navigate(`/ecom/shopdetail`, { state: { pacienteId: paciente.id } })}
                      >
                        Ver resultado
                      </Button>
                    </div>
                  </div>
                </div>
                </td>
              <td>
                <i
                    className="bi bi-pencil cursor-pointer me-2"
                    id={`EditTooltip-${paciente.id}`}
                    onClick={() => handleEditPaciente(paciente.id)} // Llama a la función de edición
                  />
                  <UncontrolledTooltip placement="top" target={`EditTooltip-${paciente.id}`}>
                    Editar
                  </UncontrolledTooltip>
                  <i
                    className="bi bi-trash cursor-pointer"
                    id={`DeleteTooltip-${paciente.id}`}
                    onClick={() => deletePaciente(paciente.id)}
                />
                  <UncontrolledTooltip placement="top" target={`DeleteTooltip-${paciente.id}`}>
                    Eliminar
                </UncontrolledTooltip>
              </td>
            </tr>
          ))
        ) : (  <tr>
          <td colSpan="7" className="text-center">
            No se encontraron pacientes.
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

export default Datatables;
