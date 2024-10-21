import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Alert, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ReactBootstrapTable.scss';

import ComponentCard from '../../components/ComponentCard';

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

function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:', result);
}

const Datatables = () => {
  const navigate = useNavigate();
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

  const optionsFormatter = (cell, row) => {
    return (
      <div>
        <Button 
          color="primary" 
          size="sm" 
          className="mr-2" 
          title="Realizar examen"
          onClick={() => navigate(`/apps/ticket-detail/${row.id}`)}
        >
          Realizar examen
        </Button>
        <Button 
          color="info" 
          size="sm" 
          title="Ver resultado examen"
          onClick={() => navigate(`/apps/ecommerce/shopdetail/${row.id}`)}
        >
          Ver resultado
        </Button>
      </div>
    );
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
              <TableHeaderColumn width="100" dataField="opciones" dataFormat={optionsFormatter}>
                Opciones
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default Datatables;
