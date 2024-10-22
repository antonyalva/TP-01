import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';

const ShopDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pacienteId = location.state ? location.state.pacienteId : null;
  const [resultadoExamen, setResultadoExamen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    </div>
  );
};

export default ShopDetail;
