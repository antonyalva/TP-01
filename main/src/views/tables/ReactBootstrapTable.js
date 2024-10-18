import React from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as data from './DataBootstrapTable';
import './ReactBootstrapTable.scss';


import ComponentCard from '../../components/ComponentCard';

//This is for the Delete row
function onAfterDeleteRow(rowKeys) {
  // eslint-disable-next-line no-alert
  alert(`The rowkey you drop: ${rowKeys}`);
}
function statusFormatter(cell) {
  // cell contiene el valor de status ('Aprobado' o 'Reprobado')
  let iconHtml = '';

  if (cell === 'YES') {
    // Insertar ícono de FontAwesome para "Aprobado"
    iconHtml = '<a href="http://localhost:3000/tickt/ticket-detail" style="color:blue">Tomar test</a>';
  } else if (cell === 'NO') {
    // Insertar ícono de FontAwesome para "Reprobado"
    iconHtml = '<a href="http://localhost:3000/ecom/shopdetail"style="color:green">Ver resultados</a>';
  }

  // Retornar el ícono con innerHTML para que se interprete como HTML
  return <span dangerouslySetInnerHTML={{ __html: iconHtml }} />;
}
//This is for the Search item
function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
  }
}
const options = {
  //afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
  afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
  afterSearch, // define a after search hook
};
const selectRowProp = {
  mode: 'checkbox',
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};

const Datatables = () => {
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
              data={data.JsonData}
              deleteRow
              selectRow={selectRowProp}
              pagination
              options={options}
              cellEdit={cellEditProp}
              tableHeaderClass="mb-0"
            >
              <TableHeaderColumn width="100" dataField="name" isKey>
                Nombre
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="gender">
                Sexo
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="age">
                Edad
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="documento">
                DNI
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="test" dataFormat={statusFormatter}>
                Test
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default Datatables;
