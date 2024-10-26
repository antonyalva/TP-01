import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import treeTableHOC from 'react-table-v6/lib/hoc/treeTable';
import ReactTable from 'react-table-v6';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import 'react-table-v6/react-table.css';
import ComponentCard from '../../../components/ComponentCard';
//  import * as data from '../../tables/ReacTableData';

const TreeTable = treeTableHOC(ReactTable);

const ShopDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pacienteId = location.state ? location.state.pacienteId : null;
  const [resultadoExamen, setResultadoExamen] = useState(null);
  const [examenHistorico, setExamenHistorico] = useState( );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const { treedata } = data;

  useEffect(() => {
    const fetchResultadoExamen = async () => {
      if (!pacienteId) {
        setError('No se proporcionó ID de paciente');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://2ewq4qbzqh.execute-api.us-east-1.amazonaws.com/dev/examenes/resultado?pacienteId=${pacienteId}`, {
          headers: {
            'Authorization': sessionStorage.getItem('IdToken')
          }
        });
        setResultadoExamen(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el resultado del examen');
        setLoading(false);
      }
    };

    fetchResultadoExamen();
  }, [pacienteId]);

  useEffect(() => {
    const fetchExamenHistorico = async () => {
      if (!pacienteId) {
        setError('No se proporcionó ID de paciente');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://2ewq4qbzqh.execute-api.us-east-1.amazonaws.com/dev/examenes/historico?pacienteId=${pacienteId}`, {
          headers: {
            'Authorization': sessionStorage.getItem('IdToken')
          }
        });
        console.log('resultado.data: ',response.data.examenes)
        setExamenHistorico(response.data.examenes);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el hitorial del examen');
        setLoading(false);
      }
    };

    fetchExamenHistorico();
  },[pacienteId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col lg="12">
                  <h3 className="mt-2 mb-3">Resultado del Examen de Parkinson</h3>
                  <p className="text-muted py-3">
                    Paciente ID: {resultadoExamen.pacienteId}
                  </p>
                  <h2>Diagnóstico: {resultadoExamen.resultado.diagnostico}</h2>
                  <br />
                  <h6>Precisión del Modelo</h6>
                  <h2>Porcentaje de precisión: {resultadoExamen.resultado.precisionModelo}%</h2>
                  <br />
                  <h6>Parámetros Acústicos Analizados:</h6>
                  <p>
                    {resultadoExamen.resultado.explicacionAdicional.parametrosAnalizados}
                  </p>
                  <br />
                  <h6>Interpretación de Gráficos:</h6>
                  <p>
                    {resultadoExamen.resultado.explicacionAdicional.interpretacionGraficos}
                  </p>
                  <br />
                  <h6>Recomendaciones:</h6>
                  <ul>
                    {resultadoExamen.resultado.recomendaciones.map((recomendacion) => (
                      <li key={recomendacion}>{recomendacion}</li>
                    ))}
                  </ul>
                  <br />
                  <h6>Explicación Adicional:</h6>
                  <p>
                    Diagnóstico Preliminar: {resultadoExamen.resultado.explicacionAdicional.diagnosticoPreliminar}
                    <br />
                    Interpretación de Probabilidad: {resultadoExamen.resultado.explicacionAdicional.interpretacionProbabilidad}
                    <br />
                    Siguientes Pasos: {resultadoExamen.resultado.explicacionAdicional.siguientesPasos}
                  </p>
                  <br />
                  <Button color="primary" className="me-2" onClick={() => window.print()}>
                    Imprimir
                  </Button>
                  <Button color="dark" onClick={() => navigate(-1)}>
                    Atrás
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ComponentCard title="Historial de examenes">
        <TreeTable
          filterable
          defaultFilterMethod={(filter, row) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== undefined
              ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase())
              : true;
          }}
          data={examenHistorico}
          //data={treedata}
          pivotBy={['examenId']}
          columns={[
            // we only require the accessor so TreeTable
            // can handle the pivot automatically
            {
              accessor: 'examenId',
            },
            {
              accessor: 'fechaExamen',
            },
            {
              accessor: 'diagnostico',
            },
            {
              accessor: 'precisionModelo',
            },

            // any other columns we want to display
            // {
            //   Header: 'fecha de examen',
            //   accessor: 'fechaExamen',
            // },
            // {
            //   Header: 'Codigo de examen',
            //   accessor: 'examen_id',
            // },
            
          ]}
          defaultPageSize={3}
          SubComponent={(row) => {
            // a SubComponent just for the final detail
            const columns = [
              {
                Header: 'Titulo',
                accessor: 'property',
                width: 200,
                Cell: (ci) => {
                  return `${ci.value}:`;
                },
                style: {
                  backgroundColor: '#DDD',
                  textAlign: 'right',
                  fontWeight: 'bold',
                },
              },
              { Header: 'Detalle', accessor: 'value' },
            ];
            const rowData = Object.keys(row.original).map((key) => {
              return {
                property: key,
                value: row.original[key].toString(),
              };
            });
            return (
              <div style={{ padding: '10px' }}>
                <ReactTable
                  data={rowData}
                  columns={columns}
                  pageSize={rowData.length}
                  showPagination={false}
                />
              </div>
            );
          }}
        />
      </ComponentCard>
    </div>
  );
};

export default ShopDetail;
