import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardBody,
  Media,
  Button,
  CardTitle,
  CardSubtitle,
  Input,
  Alert,
} from 'reactstrap';

import img1 from '../../../assets/images/users/user1.jpg';

const TicketDetail = () => {
  const location = useLocation();
  const pacienteId = location.state ? location.state.pacienteId : null;
  const [file, setFile] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    if (pacienteId) {
      // Aquí deberías hacer una llamada a tu API para obtener los detalles del paciente
      // Por ahora, simularemos esto con un objeto de paciente de ejemplo
      setPaciente({
        id: pacienteId,
        nombres: "Nombre del Paciente",
        apellidos: "Apellidos del Paciente",
        email: "paciente@example.com"
      });
    }
  }, [pacienteId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'audio/mpeg') {
      setFile(selectedFile);
    } else {
      alert('Por favor, selecciona un archivo MP3.');
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!file) {
      alert('Por favor, selecciona un archivo MP3.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await axios.post(`https://2ewq4qbzqh.execute-api.us-east-1.amazonaws.com/dev/examenes?pacienteId=${pacienteId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': sessionStorage.getItem('IdToken')
        }
      });

      setUploadStatus({ type: 'success', message: 'Examen enviado con éxito' });
      console.log(response.data);
    } catch (error) {
      console.error('Error al enviar el examen:', error);
      setUploadStatus({ type: 'error', message: 'Error al enviar el examen' });
    }
  };


  return (
    <div>

      <Row>
        <Col lg="8">
          <Card>
            <CardBody>
              <h5>Test auditivo de Parkinson</h5>
              <p className="mt-3 mb-0">
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Media className=" mt-2">
                <h5 className="mb-4">Lea el siguiente texto</h5>
                En el tranquilo parque, las ardillas corretean entre los árboles, saltando de rama en rama con aguilidad.
                Los pájaraos cantan melodias alegres, y los bancos invitan a los visitantes a descansar bajo la sombra.
                Mientras caminas por el sendero, observas las flores que adornan el césped, cada una con colores vibrantes.
                De repente, una brisa suave agita las hojas de los árboles, creando un susurro armonioso.
                Te detienes junto a un estanque tranquilo, donde los patos nadan plácidamente.
                Al otro lado, un niño ríe mientras juega con una cometa. Ahora, imagina que decides sentarte en uno de los bancos.
                A tu alrededor, la vida del parque sigue su curso. Puedes cerrar los ojos y respirar profundamente, absorbiendo la serenidadque ofrece este oasis urbano.
              </Media>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card>
            <CardBody>
              <h5>Grabar audio</h5>
              <div className="button-group">
                <Button className="btn" color="primary" size="lg" block>
                  Grabar
                </Button>
              </div>
              <h5>Subir archivo</h5>
              <div className="button-group">
              <form onSubmit={handleSubmit}>
                <Input type="file" id="fileInput" name="file" accept="audio/mpeg" onChange={handleFileChange} />
                <Button className="btn" color="primary" size="lg" type="submit">
                  Enviar examen
                </Button>
              </form>
              </div>
              {uploadStatus && (
                <Alert color={uploadStatus.type === 'success' ? 'success' : 'danger'} className="mt-3">
                  {uploadStatus.message}
                </Alert>
              )}
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center p-4 border-bottom">
              <img src={img1} className="rounded-circle" width="90" alt="avatar" />
              <CardTitle tag="h4" className="fw-bold mt-3 mb-0">
                {paciente ? `${paciente.nombres} ${paciente.apellidos}` : 'Cargando...'}
              </CardTitle>
              <CardSubtitle className="text-muted">{paciente ? paciente.email : 'Cargando...'}</CardSubtitle>
              <Row className="mt-4 pt-3">
                <Col xs="12" className="text-center">
                  <h4 className="fw-bold mb-0">ID del Paciente: {pacienteId || 'No disponible'}</h4>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TicketDetail;
