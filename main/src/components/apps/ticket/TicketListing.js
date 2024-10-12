import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Badge, UncontrolledTooltip, Input, Alert } from 'reactstrap';
import { fetchTickets, DeleteTicket, SearchTicket } from '../../../store/apps/ticket/TicketSlice';
import axios from 'axios';

const TicketListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchTickets());
    fetchDoctors();
  }, [dispatch]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/dev/doctores`);
      setDoctors(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los doctores');
      setLoading(false);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/dev/doctores/${id}`);
      setDeleteMessage({ type: 'success', text: 'Doctor eliminado exitosamente.' });
      fetchDoctors(); // Recargar la lista de doctores
    } catch (error) {
      setDeleteMessage({ type: 'danger', text: 'Error al eliminar el doctor.' });
    }
  };

  const getVisibleTickets = (tickets, filter, ticketSearch) => {
    switch (filter) {
      case 'total_tickets':
        return tickets.filter(
          (c) => !c.deleted && c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Pending':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Pending' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Closed':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Closed' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Open':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Open' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const tickets = useSelector((state) =>
    getVisibleTickets(
      state.ticketReducer.tickets,
      state.ticketReducer.currentFilter,
      state.ticketReducer.ticketSearch,
    ),
  );

  return (
    <div>
      <div className="row">
        <div className="col-3 ">
          <Input
            type="text"
            onChange={(e) => dispatch(SearchTicket(e.target.value))}
            placeholder="Search Ticket..."
          />
        </div>
        <div className="col-6 ">
          
        </div>
        <div className="col-3 ">
        <span
                        className="btn btn-info text-white"
                        onClick={() => {
                          navigate('/form-validation-paciente');
                        }}
                      >
                        REGISTRAR PACIENTE
                      </span>
        </div>
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table className="align-middle">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Email</th>
              <th>Documento de Identidad</th>
              <th>Edad</th>
              <th>Especialidad</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.nombres}</td>
                <td>{doctor.apellidos}</td>
                <td>{doctor.email}</td>
                <td>{doctor.documento_identidad}</td>
                <td>{doctor.edad}</td>
                <td>{doctor.especialidad}</td>
                <td>
                  <i
                    className="bi bi-pencil cursor-pointer me-2"
                    id={`EditTooltip-${doctor.id}`}
                    onClick={() => {/* Implementar edición */}}
                  />
                  <UncontrolledTooltip placement="top" target={`EditTooltip-${doctor.id}`}>
                    Editar
                  </UncontrolledTooltip>
                  <i
                    className="bi bi-trash cursor-pointer"
                    id={`DeleteTooltip-${doctor.id}`}
                    onClick={() => deleteDoctor(doctor.id)}
                  />
                  <UncontrolledTooltip placement="top" target={`DeleteTooltip-${doctor.id}`}>
                    Eliminar
                  </UncontrolledTooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {deleteMessage && (
        <Alert color={deleteMessage.type} className="mt-3">
          {deleteMessage.text}
        </Alert>
      )}
    </div>
  );
};

export default TicketListing;
