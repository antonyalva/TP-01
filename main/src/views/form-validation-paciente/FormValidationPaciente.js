import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
// import { Row, Col, Button, FormGroup, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import ComponentCard from '../../components/ComponentCard';
import * as data2 from '../tables/DataBootstrapTable';



const FormValidationPaciente = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm(); // initialise the hook
  // const [setFormvalue] = useState({
  //   // const [Formvalue, setFormvalue] = useState({
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   age: '',
  //   title: '',
  //   mobile: '',
  // });
  const onSubmit = (data) => {
    data2.JsonData.push({
      name: data.firstname,
      gender: data.firstname,
      email: data.email,
    });
    console.log(data.firstname)
    //console.log(data2)
    //setFormvalue(data);
    navigate('/tables/data-table');
  };
  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Registrar Paciente">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className="control-Label" htmlFor="firstname">
                  Nombres
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('firstname', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.firstname && 'First name is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="lastname">
                  Apellidos
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('lastname', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.lastname && 'Last name is required.'}</span>
              </FormGroup>
              {/* <FormGroup>
                <Label className="control-Label" htmlFor="title">
                  Especialidad
                </Label>
                <div className="mb-2">
                  <select
                    className="form-control"
                    {...register('title', { required: true })}
                  >
                    <option value="">Select Option</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                  </select>
                </div>
                <span className="text-danger">{errors.title && 'Please select value.'}</span>
              </FormGroup> */}
              <FormGroup>
                <Label className="control-Label" htmlFor="email">
                email
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('usernemailame', { required: true, pattern: /^\S+@\S+$/i })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.email && 'Email is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="mobile">
                  Nro Dni
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('mobile', { required: true, maxLength: 8, minLength: 7 })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">
                  {errors.mobile && 'Ingresar DNI correcto.'}
                </span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="age">
                  Edad
                </Label>
                <div className="mb-2">
                  <input
                    type="number"
                    {...register('age', { required: true, pattern: /\d+/ })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.age && 'Please enter number for age.'}</span>
              </FormGroup>
              <FormGroup>
                <Button className="btn" color="primary" size="lg" block type="submit">
                {/* <Button className="btn" color="primary" size="lg" block */}
                  {/* onClick={RegistrarPaciente} */}
                  Registrar Paciente
                </Button>

              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default FormValidationPaciente;
