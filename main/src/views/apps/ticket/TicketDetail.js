import React from 'react';
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
} from 'reactstrap';

//import ComponentCard from '../../../components/ComponentCard';
import img1 from '../../../assets/images/users/user1.jpg';
//import img2 from '../../../assets/images/users/user2.jpg';
//import img3 from '../../../assets/images/users/user3.jpg';
//import img4 from '../../../assets/images/users/user4.jpg';

const TicketDetail = () => {
  // const optionsorder = {
  //   chart: {
  //     id: 'donut-chart',
  //     fontFamily: '"Nunito", sans-serif',
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   grid: {
  //     padding: {
  //       left: 0,
  //       right: 0,
  //     },
  //   },
  //   plotOptions: {
  //     pie: {
  //       donut: {
  //         size: '70px',
  //         labels: {
  //           show: true,
  //           total: {
  //             show: true,
  //             label: 'Tickets',
  //             color: '#99abb4',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   stroke: {
  //     width: 0,
  //   },
  //   labels: ['In Progress', 'Opened', 'Closed', 'In Queue'],
  //   legend: {
  //     show: false,
  //   },
  //   colors: ['rgb(64, 196, 255)', 'rgb(255, 130, 28)', 'rgb(126, 116, 251)', 'rgb(41, 97, 255)'],
  //   tooltip: {
  //     fillSeriesColor: false,
  //   },
  // };
  //const seriesorder = [45, 27, 15, 18];
  return (
    <div>

      <Row>
        <Col lg="8">
          <Card>
            <CardBody>
              <h5>Test auditivo online</h5>
              <p className="mt-3 mb-0">
                ¿Sabes cuál es tu sensibilidad auditiva? ¡Pon a prueba tu oído con un breve test online!
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h5 className="mb-4">Lea el siguiente texto</h5>
              {/* <Media className="d-flex">
                <Media left href="#">
                  <Media object src={img1} alt="Generic placeholder image" width="100" />
                </Media>
                <Media body className="ms-3">
                  <Media heading>Ticket title</Media>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                  sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
                  turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                  felis in faucibus.
                  <Media className="d-flex mt-4">
                    <Media left href="#">
                      <Media object src={img2} alt="Generic placeholder image" width="100" />
                    </Media>
                    <Media body className="ms-3">
                      <Media heading>Ticket Reply</Media>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                      sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus
                      viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                      lacinia congue felis in faucibus.
                    </Media>
                  </Media>
                </Media>
              </Media> */}

              <Media className=" mt-5">
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
              <h5>Grabar aduio</h5>
              <div className="button-group">
                <Button className="btn" color="primary" size="lg" block>
                  Grabar
                </Button>
              </div>
              <h5>Subir archivo</h5>
              <div className="button-group">
                <Button className="btn" color="primary" size="lg" block>
                  Subir archivo
                </Button>
              </div>
              {/* <Row className="bg-light my-3 align-items-center">
                <Col sm="6">
                  <div className="py-3">
                    <Badge color="warning">In-Progress</Badge>
                  </div>
                </Col>
                <Col sm="6" className="text-end">
                  May 2, 2018 9:49
                </Col>
              </Row> */}
              {/* <h6>Ticket Creator</h6>
              <span>Username</span>
              <br />
              <br />
              <h6>Support Staff</h6>
              <span>Agent Name</span>
              <br />
              <br /> */}
              {/* <Button color="success">Update</Button> */}

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
