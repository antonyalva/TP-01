import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from "date-fns";
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
  const responseData = location.state?.response;
  const navigate = useNavigate();
  const pacienteId = location.state ? location.state.pacienteId : null;
  const [resultadoExamen, setResultadoExamen] = useState(null);
  const [examenHistorico, setExamenHistorico] = useState( );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const { treedata } = data;

  console.log(pacienteId)
  //console.log(responseData.metrics.sensibilidad)
  
  const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

  
    useEffect(() => {
      if (!pacienteId) {
        setError('No se proporcionó ID de paciente');
        setLoading(false);
        return;
      }
    
      const fetchDatos = async () => {
        try {
          const resultadoResponse = await axios.get(
            `https://2ewq4qbzqh.execute-api.us-east-1.amazonaws.com/dev/examenes/resultado?pacienteId=${pacienteId}`,
            { headers: { Authorization: sessionStorage.getItem('IdToken') } }
          );
          setResultadoExamen(resultadoResponse.data);
    
          const historicoResponse = await axios.get(
            `https://2ewq4qbzqh.execute-api.us-east-1.amazonaws.com/dev/examenes/historico?pacienteId=${pacienteId}`,
            { headers: { Authorization: sessionStorage.getItem('IdToken') } }
          );
          setExamenHistorico(historicoResponse.data.examenes);
    
          setLoading(false);
        } catch (err) {
          setError('Este paciente no tiene exámenes realizados');
          setLoading(false);
        }
      };
    
      fetchDatos();
    }, [pacienteId]);

   // Aquí ordenamos los datos y los formateamos antes de renderizar
  const examenesOrdenados = examenHistorico
  ? [...examenHistorico].sort((a, b) => new Date(b.fechaExamen) - new Date(a.fechaExamen))
  : [];

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
                  <h6>Métricas del Modelo</h6>
                  <br />
                  <h4>Porcentaje de especificidad: {roundToTwoDecimals(responseData.metrics.especificidad*100)}%</h4>
                 
                  <h4>Porcentaje de sensibilidad: {roundToTwoDecimals(responseData.metrics.sensibilidad*100)}%</h4>
                  {/* <h4>Porcentaje de especificidad: {responseData.metrics.sensibilidad}88%</h4> */}
                 
                  <h4>Porcentaje de precisión: {roundToTwoDecimals(responseData.metrics.precision*100)}%</h4>
    
                  <h4>Porcentaje de exactitud: {roundToTwoDecimals(responseData.metrics.exactitud*100)}%</h4>
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
            {examenesOrdenados && examenesOrdenados.length > 0 ? (
              examenesOrdenados.map((examen) => (
                <tr key={examen.examenId}>
                  <td>{examen.examenId}</td>
                  <td>{format(new Date(examen.fechaExamen), "dd/MM/yyyy HH:mm:ss")}</td>

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
