import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  //Carousel,
  //CarouselItem,
  //CarouselControl,
  //Badge,
  //Label,
  //FormGroup,
  Button,
  //Input,
} from 'reactstrap';

// import img1 from '../../../assets/images/products/s1.jpg';
// import img2 from '../../../assets/images/products/s2.jpg';
// import img3 from '../../../assets/images/products/s3.jpg';

/*const items = [
  {
    src: img1,
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: img2,
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: img3,
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];*/

const ShopDetail = () => {
  //const [activeIndex, setActiveIndex] = React.useState(0);
  //const [animating, setAnimating] = React.useState(false);

  // const next = () => {
  //   if (animating) return;
  //   const nextIndex = activeIndex === items.length - 1 ? 1 : activeIndex + 1;
  //   setActiveIndex(nextIndex);
  // };

  /*const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };*/

  // const slides = items.map((item) => {
  //   return (
  //     <CarouselItem
  //       onExiting={() => setAnimating(true)}
  //       onExited={() => setAnimating(false)}
  //       key={item.src}
  //     >
  //       <img src={item.src} alt={item.altText} width="100%" />
  //     </CarouselItem>
  //   );
  // });

  return (
    <div>
      
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                {/* <Col lg="6">
                  <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                    {slides}
                    <CarouselControl
                      direction="prev"
                      directionText="Previous"
                      onClickHandler={previous}
                    />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                  </Carousel>
                </Col> */}
                <Col lg="12">
                  <h3 className="mt-2 mb-3">Ghalia Rebaza</h3>
                  <p className="text-muted py-3">
                    Resultados del examen de parkinson
                  </p>
                  <h2>Positivo/Negativo</h2>
                  <br />
                  <div className="d-flex">
                    {/* <FormGroup className="me-3">
                      <Label for="exampleSelect">Size</Label>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">Qty</Label>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </FormGroup> */}
                  </div>
                  <br />
                  <h6>Presición del Modelo</h6>
                  <h2>Porcentaje de precisión: 80%</h2>
                  <p>Parámetros Acústicos Analizados:
                      <br />
                      Frecuencia Fundamental: 200 Hz
                      <br />
                      Duración: 180 s
                      <br />
                      Intensidad: 75 dB
                      MFCC: 
                      Gráficos:
                      <br />
                      Espectrograma de la Voz:
                      <br />
                      Recomendaciones:
                      Explicación Adicional
                      Diagnóstico Preliminar: Presenta si el sistema detecta Parkinson o no, basado en el análisis de la voz.
                      <br />
                      Probabilidad: Muestra la confianza del modelo en el diagnóstico, ayudando a interpretar la precisión del resultado.
                      <br />
                      Parámetros Acústicos Analizados: Lista los parámetros clave utilizados para el diagnóstico, brindando transparencia sobre el análisis.
                      <br />
                      Gráficos y Espectrograma: Ayudan a visualizar los datos de manera que tanto pacientes como médicos puedan entender fácilmente las conclusiones.
                      <br />
                      Recomendaciones: Proporcionan pasos claros a seguir, lo que es crucial para la acción clínica o tranquilidad del paciente.
                      </p>
                  {/* <div className="button-group">
                    <Button color="success" />
                    <Button color="danger" />
                    <Button color="dark" />
                    <Button color="warning" />
                  </div> */}
                  <br />
                  <br />
                  <Button color="primary" className="me-2">
                    Guardar
                  </Button>
                  <Button color="dark">Atrás</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <Card>
            <CardBody>
              <h4>Description</h4>
              <br />
              <h5>
                Sed at diam elit. Vivamus tortor odio, pellentesque eu tincidunt a, aliquet sit amet
                lorem pellentesque eu tincidunt a, aliquet sit amet lorem.
              </h5>
              <br />
              <p>
                Cras eget elit semper, congue sapien id, pellentesque diam. Nulla faucibus diam nec
                fermentum ullamcorper. Praesent sed ipsum ut augue vestibulum malesuada. Duis vitae
                volutpat odio. Integer sit amet elit ac justo sagittis dignissim.
              </p>
              <br />
              <p>
                Vivamus quis metus in nunc semper efficitur eget vitae diam. Proin justo diam,
                venenatis sit amet eros in, iaculis auctor magna. Pellentesque sit amet accumsan
                urna, sit amet pretium ipsum. Fusce condimentum venenatis mauris et luctus.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                curae;
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};

export default ShopDetail;
