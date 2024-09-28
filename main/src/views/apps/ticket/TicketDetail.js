import React , { useState } from 'react';
import axios from 'axios';
//import Chart from 'react-apexcharts';
import {
  Row,
  Col,
  Card,
  CardBody,
  Media,
  //Badge,
  Button,
  CardTitle,
  CardSubtitle,
  Input,
} from 'reactstrap';

//import ComponentCard from '../../../components/ComponentCard';
import img1 from '../../../assets/images/users/user1.jpg';
//import img2 from '../../../assets/images/users/user2.jpg';
//import img3 from '../../../assets/images/users/user3.jpg';
//import img4 from '../../../assets/images/users/user4.jpg';

const TicketDetail = () => {
  console.log('entra al ticketdetail');
  const [file,setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Guardamos el archivo seleccionado en el estado
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!file) {
      alert('Por favor, selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('ingresa a servicio pero no hay')
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(response.data.message);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo.');
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
                <Input type="file" id="fileInput" name="file" accept="image/*"onChange={handleFileChange} />
                <Button className="btn" color="primary" size="lg" type="submit">
                  Subir archivo
                </Button>
                </form>
              </div>

            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center p-4 border-bottom">
              <img src={img1} className="rounded-circle" width="90" alt="avatar" />
              <CardTitle tag="h4" className="fw-bold mt-3 mb-0">
                Ghalia Rebaza
              </CardTitle>
              <CardSubtitle className="text-muted">GhaliaRebaza@gmail.com</CardSubtitle>
              <Row className="mt-4 pt-3">
                <Col xs="4" className="text-center border-end">
                  <h4 className="fw-bold mb-0">4</h4>
                  <p className="text-muted mb-0 fs-6">Total</p>
                </Col>
                <Col xs="4" className="text-center border-end">
                  <h4 className="fw-bold mb-0">2</h4>
                  <p className="text-muted mb-0 fs-6">Open</p>
                </Col>
                <Col xs="4" className="text-center">
                  <h4 className="fw-bold mb-0">3</h4>
                  <p className="text-muted mb-0 fs-6">Closed</p>
                </Col>
              </Row>
            </CardBody>
            <CardBody>
              <Row>
                <Col xs="6" className="text-center border-end">
                  <a
                    href="/"
                    className="text-dark d-flex align-items-center justify-content-center text-decoration-none fw-bold"
                  >
                    <i className="bi bi-chat-left-fill me-2"></i>
                    Message
                  </a>
                </Col>
                <Col xs="6" className="text-center">
                  <a
                    href="/"
                    className="text-dark d-flex align-items-center justify-content-center text-decoration-none fw-bold"
                  >
                    <i className="bi bi-columns me-2"></i>
                    Portfolio
                  </a>
                </Col>
              </Row>
            </CardBody>
          </Card>
          {/* <Card>
            <CardBody className='p-4'>
              <CardTitle tag="h4">Ticket Statestics</CardTitle>
              <Chart options={optionsorder} series={seriesorder} type="donut" height="245" />
            </CardBody>
          </Card> */}
        </Col>
      </Row>
    </div >
  );
};

export default TicketDetail;
