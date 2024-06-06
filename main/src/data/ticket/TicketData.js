import mock from '../mock';

const TicketData = [
  {
    Id: 1,
    ticketTitle: 'Antony',
    ticketDescription:
      'Alva',
    Status: 'Closed',
    Label: 'danger',
    AgentName: 'Liam',
    Date: '02-12-2021',
    Especialidad: 'Parkinson',
    deleted: false,
  },
  {
    Id: 2,
    ticketTitle: 'Miguel',
    // ticketDescription:
    //   'ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
    Status: 'Pending',
    Label: 'warning',
    AgentName: 'Steve',
    Date: '02-15-2020',
    Especialidad: 'Parkinson',
    deleted: false,
  },
  {
    Id: 3,
    ticketTitle: 'Alexis',
    // ticketDescription:
    //   'ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
    Status: 'Open',
    Label: 'success',
    AgentName: 'Jack',
    Date: '02-15-2020',
    Especialidad: 'Parkinson',
    deleted: false,
  },
  {
    Id: 4,
    ticketTitle: 'Ghalia',
    ticketDescription:
      'Rebaza',
    Status: 'Closed',
    Label: 'danger',
    AgentName: 'Steve',
    Date: '02-15-2020',
    Especialidad: 'Parkinson',
    deleted: false,
  },
  {
    Id: 5,
    ticketTitle: 'Jailyn',
    // ticketDescription:
    //   'ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
    Status: 'Closed',
    Label: 'danger',
    AgentName: 'Liam',
    Date: '02-15-2020',
    Especialidad: 'Parkinson',
    deleted: false,
  },
  {
    Id: 6,
    ticketTitle: 'Diana',
    // ticketDescription:
    //   'ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
    Status: 'Pending',
    Label: 'warning',
    AgentName: 'Jack',
    Date: '02-15-2020',
    Especialidad: 'Parkinson',
    deleted: false,
  },
  {
    Id: 7,
    ticketTitle: 'Sara',
    // ticketDescription:
    //   'ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
    Status: 'Open',
    Label: 'success',
    AgentName: 'Steve',
    Date: '02-15-2020',
    Especialidad: 'Parkinson',
    deleted: false,
  },
  {
    Id: 8,
    ticketTitle: 'JeanPierre',
    // ticketDescription:
    //   'ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
    Status: 'Closed',
    Label: 'danger',
    AgentName: 'John',
    Date: '02-1-2021',
    Especialidad: 'Parkinson',
    deleted: false,
  },
];

mock.onGet('/api/data/ticket/TicketData').reply(() => {
  return [200, TicketData];
});
export default TicketData;
