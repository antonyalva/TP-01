import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaMicrophone, FaStop } from 'react-icons/fa'; // Importa íconos de FontAwesome
import {
  Row,
  Col,
  Modal,
  Card,
  CardBody,
  Media,
  Button,
  CardTitle,
  CardSubtitle,
  Input,
  Alert,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress 
} from 'reactstrap';

import img1 from '../../../assets/images/users/user1.jpg';

const TicketDetail = () => {
  const location = useLocation();
  const pacienteId = location.state ? location.state.pacienteId : null;
  const [file, setFile] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para el modal
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [maxRecordingTime] = useState(60);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const intervalRef = useRef(null);
  const [fileSelected, setFileSelected] = useState(false); // Estado para controlar si hay archivo seleccionado

  

   // Abrir o cerrar el modal
   const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const resetRecording = () => {
    setAudioURL('');  // Resetea el audio grabado
    setRecordingTime(0);  // Resetea el contador de tiempo
    setIsRecording(false);  // Asegura que la grabación no esté activa
    clearInterval(intervalRef.current);  // Detén el contador si está activo
  };
  // Resetea el estado cuando se abre el modal
  useEffect(() => {
    if (modalOpen) {
      resetRecording();
    }
  }, [modalOpen]);

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
  const handleFileInputChange = (e) => {
    handleFileChange(e); // Ejecutar tu lógica de cambio de archivo
    setFileSelected(e.target.files.length > 0); // Verificar si se seleccionó un archivo
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

  

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    clearInterval(intervalRef.current);
    setIsRecording(false);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: 'audio/mp3' });
      const audioURLLocal = URL.createObjectURL(audioBlob);
      setAudioURL(audioURLLocal);
      chunks.current = [];
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);

    // Iniciar el contador de tiempo  
    intervalRef.current = setInterval(() => {
      setRecordingTime((prevTime) => {
        if (prevTime < maxRecordingTime) {
          return prevTime + 1;
        }
        stopRecording();
        return prevTime;
      });
    }, 1000);
  };

  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div>

      <Row>
        <Col lg="8">
          <Card>
            <CardBody>
              <h3>Instructivo para Test auditivo de Parkinson</h3>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Media className=" mt-2">
                <div style={{}}>
                  <h3 style={{ color: '#333' }}>Finalidad del Test</h3>
                  <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
                    Este test tiene como objetivo grabar o subir un archivo de audio para analizar la calidad de la voz. 
                    Es importante que el audio sea lo más claro posible para asegurar una detección precisa durante el análisis.
                  </p>
                </div>
                <h3 style={{ color: '#333' }}>Recomendaciones para la Grabación</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'green' }}>✔</span>
                    <strong>Ambiente:</strong> Asegúrate de estar en un lugar tranquilo, sin ruidos de fondo que puedan interferir con la calidad de la grabación.
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'green' }}>✔</span>
                    <strong>Naturalidad:</strong> Habla de manera clara y natural. Evita forzar la voz para obtener resultados más precisos.
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'green' }}>✔</span>
                    <strong>Distancia del Micrófono:</strong> Mantén una distancia adecuada del micrófono, aproximadamente de 15 a 20 centímetros, para evitar distorsiones.
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'green' }}>✔</span>
                    <strong>Formato:</strong> Solo se procesan archivos en formato MP3. Si subes un archivo, asegúrate de que esté en este formato.
                  </li>
                </ul>
              
                    <h3 style={{ color: '#333' }}>Opciones Disponibles</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'green' }}>✔</span>
                        <strong>Grabar Audio:</strong> Pulsa el botón <strong>Grabar</strong> para empezar a grabar en tiempo real. Cuando termines de hablar, pulsa <strong>Detener Grabación</strong>.
                      </li>
                      <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'green' }}>✔</span>
                        <strong>Subir Archivo:</strong> Si ya tienes un archivo MP3, puedes subirlo directamente pulsando el botón <strong>Subir Archivo</strong>.
                      </li>
                    </ul>
              </Media>
            </CardBody>  
          </Card>
          <Card>
          <CardBody>
            <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
              <ModalHeader toggle={toggleModal}>Realizar grabación</ModalHeader>
              <ModalBody>
                <h4>Ejemplo de Texto para Leer</h4>
              <p style={{ lineHeight: '1.6', fontSize: '15px' }}>
                En un tranquilo parque, las aves cantan suavemente mientras las hojas de los árboles se mecen con la brisa. 
                Los niños juegan alegremente en los columpios, y las familias disfrutan de un día soleado en la hierba. 
                A lo lejos, un grupo de personas camina despacio por un sendero, disfrutando de la serenidad del lugar. 
                A medida que caminas por el parque, te das cuenta de la variedad de flores que decoran los jardines, 
                cada una con colores vibrantes que iluminan el paisaje. 
                El sonido del agua de una fuente cercana crea una sensación de calma, invitándote a sentarte en un banco para disfrutar del momento. 
                A tu alrededor, el ritmo del parque sigue su curso, con personas de todas las edades compartiendo este espacio en armonía.
              </p>
              <p style={{ fontStyle: 'italic', fontSize: '14px', marginTop: '10px' }}>
                Este texto debería demorar un máximo de 3 minutos en ser leído de manera pausada y natural.
              </p>
                {/* Botón circular para iniciar/detener grabación */}
                <div className="text-center" >
                  <Button style={{ display: 'inline-block' }}
                    className={`record-button ${isRecording ? 'stop-button' : 'start-button'}`}
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording ? <FaStop size={30} /> : <FaMicrophone size={30} />}
                  </Button>

                  {/* Texto dinámico para indicar el estado de grabación */}
                  <p className="mt-3">
                    {isRecording
                      ? 'Grabando... 🔴 Pulse Stop para detener la grabación'
                      : 'Pulse para comenzar a grabar'}
                  </p>
                </div>

                {/* Contador de tiempo */}
                {isRecording && (
                  <div className="text-center">
                    <h5 className="mt-3">{formatTime(recordingTime)}</h5>

                    {/* Barra de progreso */}
                    <Progress
                      value={(recordingTime / maxRecordingTime) * 100}
                      color="success"
                      className="my-3"
                    />
                  </div>
                )}

                {/* Mostrar el audio grabado y el botón de descarga solo cuando haya finalizado la grabación */}
                {audioURL && !isRecording && (
                  <div className="text-center">
                    <h4>Audio grabado:</h4>
                    <audio controls src={audioURL}>
                      <track kind="captions" srcLang="en" label="English captions" default />
                    </audio>
                    <a href={audioURL} download="grabacion.mp3" className="d-block mt-3">
                      Descargar MP3
                    </a>
                    {/* Botón para reiniciar la grabación */}
                    <Button color="warning" className="mt-3" onClick={resetRecording}>
                      Reiniciar Grabación
                    </Button>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" disabled={!audioURL}>
                  Enviar grabación
                </Button>
                <Button color="secondary" >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            </CardBody> 
          </Card>
        </Col>
        <Col lg="4">
          <Card>
            <CardBody>
            {/* Botón para grabar audio */}
            <Button className="btn" color="primary" size="lg" onClick={toggleModal}>
              Grabar audio
            </Button>

            {/* Separación entre el botón de grabar y la sección de subir archivo */}
            <h5 className="mt-4">Subir archivo</h5>
            <div className="button-group">
              <form onSubmit={handleSubmit}>
                {/* Input para seleccionar archivo */}
                <Input
                  type="file"
                  id="fileInput"
                  name="file"
                  accept="audio/mpeg"
                  onChange={handleFileInputChange} // Cambié para manejar habilitación del botón
                  className="mt-2"
                />

                {/* Botón de Enviar examen, habilitado solo si hay un archivo */}
                <Button
                  className="btn mt-3"
                  color="primary"
                  size="lg"
                  type="submit"
                  disabled={!fileSelected} // Deshabilitado si no hay archivo
                >
                  Enviar examen
                </Button>
              </form>
            </div>

            {/* Mostrar estado de carga (éxito o error) */}
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
