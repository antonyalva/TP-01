import React, { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import './ReactBootstrapTable.scss';

import ComponentCard from '../../components/ComponentCard';

function statusFormatter(cell) {
  let iconHtml = '';

  if (cell === 'YES') {
    iconHtml = '<a href="http://localhost:3000/tickt/ticket-detail" style="color:blue">Tomar test</a>';
  } else if (cell === 'NO') {
    iconHtml = '<a href="http://localhost:3000/ecom/shopdetail"style="color:green">Ver resultados</a>';
  }

  return <span dangerouslySetInnerHTML={{ __html: iconHtml }} />;
}

function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:', result);
}

const Datatables = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dev/pacientes`);
      setPacientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los pacientes');
      setLoading(false);
    }
  };

  const onAfterDeleteRow = async (rowKeys) => {
    if (rowKeys.length !== 1) {
      setDeleteMessage({ type: 'danger', text: 'Por favor, seleccione solo un paciente para eliminar.' });
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/dev/pacientes/${rowKeys[0]}`);
      setDeleteMessage({ type: 'success', text: 'Paciente eliminado exitosamente.' });
      fetchPacientes(); // Recargar la lista de pacientes
    } catch (error) {
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
