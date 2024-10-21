import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import './ReactBootstrapTable.scss';

import ComponentCard from '../../components/ComponentCard';

// Función para obtener el token de autorización
const getAuthToken = () => {
  return sessionStorage.getItem('authToken');
};

// Configuración de axios con el token de autorización
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:', result);
}

const Datatables = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const fetchPacientes = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/dev/pacientes');
      setPacientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los pacientes');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPacientes();
  }, [fetchPacientes]);

  const onAfterDeleteRow = async (rowKeys) => {
    if (rowKeys.length !== 1) {
      setDeleteMessage({ type: 'danger', text: 'Por favor, seleccione solo un paciente para eliminar.' });
      return;
    }

    try {
      await axiosInstance.delete(`/dev/pacientes/${rowKeys[0]}`);
      setDeleteMessage({ type: 'success', text: 'Paciente eliminado exitosamente.' });
      fetchPacientes(); // Recargar la lista de pacientes
    } catch (err) {
      setDeleteMessage({ type: 'danger', text: 'Error al eliminar el paciente.' });
    }
  };

  const options = {
    afterDeleteRow: onAfterDeleteRow,
    afterSearch,
  };

  const selectRowProp = {
    mode: 'checkbox',
  };

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Row>
        <Col md="12">
          <ComponentCard title="Lista de pacientes">
            {deleteMessage && (
              <Alert color={deleteMessage.type} className="mb-3">
                {deleteMessage.text}
              </Alert>
            )}
            <BootstrapTable
              striped
              hover
              condensed
              search
              data={pacientes}
              deleteRow
              selectRow={selectRowProp}
              pagination
              options={options}
              cellEdit={cellEditProp}
              tableHeaderClass="mb-0"
            >
              <TableHeaderColumn width="100" dataField="id" isKey hidden>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="nombres">
                Nombre
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="apellidos">
                Apellidos
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="edad">
                Edad
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="documento_identidad">
                DNI
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="compañia">
                Compañía
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default Datatables;
