import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Badge, UncontrolledTooltip, Input } from 'reactstrap';
import { fetchTickets, DeleteTicket, SearchTicket } from '../../../store/apps/ticket/TicketSlice';


const TicketListing = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

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
      <Table className="align-middle">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Especialidad atendida</th>
            <th>Fecha de registro</th>
            <th>Examen</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.Id}>
              <td>{ticket.Id}</td>
              <td>
                <h5 className="mb-0 mt-2">
                  <Link to="/apps/ticket-detail" className="text-dark text-decoration-none">
                    {ticket.ticketTitle}
                  </Link>
                </h5>
                <small className="text-muted d-block text-truncate mb-2" style={{ width: '300px' }}>
                  {ticket.ticketDescription}
                </small>
              </td>
              <td>{ticket.AgentName}</td>
              <td>{ticket.Especialidad}</td>
              <td>{ticket.Date}</td>
              <td>
                <Badge color={ticket.Label}>{ticket.Status}</Badge>
              </td>
              <td>
                <i
                  className="bi bi-archive cursor-pointer"
                  id="TooltipExample"
                  onClick={() => dispatch(DeleteTicket(ticket.Id))}
                />
                <UncontrolledTooltip placement="left" target="TooltipExample">
                  Delete
                </UncontrolledTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TicketListing;
