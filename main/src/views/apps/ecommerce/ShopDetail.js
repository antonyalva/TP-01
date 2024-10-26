import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,CardHeader,Table,
  CardBody,
  Button,
} from 'reactstrap';
import 'react-table-v6/react-table.css';
//  import * as data from '../../tables/ReacTableData';


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
        setError('Este usuario no cuenta con tests realizado, por favor seleccionar uno que tenga Resultados');
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
              <h3>Resultado del Examen de Parkinson</h3>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Row>
                <Col lg="12">
                  
                  <p className="text-muted py-3">
                    Paciente ID: {resultadoExamen.pacienteId}
                  </p>
                  <h3>Diagnóstico: {resultadoExamen.resultado.diagnostico}</h3>
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
                    
      <Card className="mb-4 shadow-sm">
      {/* Título del Card */}
      <CardHeader className="bg-primary text-white">
        <h4 className="mb-0">Historial de Exámenes</h4>
      </CardHeader>
      
      {/* Contenido del Card */}
      <CardBody>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>ID de Examen</th>
              <th>Fecha de Examen</th>
              <th>Diagnóstico</th>
              <th>Precisión del Modelo</th>
            </tr>
          </thead>
          <tbody>
            {examenHistorico && examenHistorico.length > 0 ? (
              examenHistorico.map((examen) => (
                <tr key={examen.examenId}>
                  <td>{examen.examenId}</td>
                  <td>{examen.fechaExamen}</td>
                  <td>{examen.diagnostico}</td>
                  <td>{examen.precisionModelo}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay exámenes disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </CardBody>
    </Card>
    </div>
  );
};

export default ShopDetail;
