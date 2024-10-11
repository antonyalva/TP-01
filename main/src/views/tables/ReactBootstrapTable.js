import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import './ReactBootstrapTable.scss';

import ComponentCard from '../../components/ComponentCard';

function onAfterDeleteRow(rowKeys) {
  // eslint-disable-next-line no-alert
  alert(`The rowkey you drop: ${rowKeys}`);
}

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

const Datatables = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('https://2ewq4qbzqh.execute-api.us-east-1.amazonaws.com/dev/pacientes');
        setPacientes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los pacientes');
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Row>
        <Col md="12">
          <ComponentCard title="Lista de pacientes">
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
              <TableHeaderColumn width="100" dataField="nombres" isKey>
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
