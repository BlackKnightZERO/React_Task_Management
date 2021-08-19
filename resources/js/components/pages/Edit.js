import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { sweet_success, sweet_error } from '../../common.js';
import moment from 'moment';

function Edit(props) {

  const [editData, setEditData] = useState({id:'', name:'', start_time:'', end_time:'', status:'',});
  const [formError, setFormError] = useState({});

  const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }));
  };

  const handleValidation = () => {
    let fields = editData;
    let errors = {};
    let formIsValid = true;

    if(!fields.name){
       formIsValid = false;
       errors["name"] = "Name Cannot be empty";
    }
    setFormError({errors: errors});
    return formIsValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(handleValidation()){
      let url = `/project/task/update`;
      axios.post(url, editData)
           .then(response => {
             if(response.status === 200){
               sweet_success(response.data.message);
             }
           })
           .catch(error => {
             console.log(error);
           })
    } else {
      sweet_error(formError.errors.name);
    }
  }

  const onBlurHandler =(e) => {
    const { name, value } = event.target;
    setEditData(prevState => ({
        ...prevState,
        [name]: value
    }));
    handleValidation();
    if(!value.trim()){
      sweet_error('Name Field Required');
    }
  }

  useEffect( () => {
    let url = `/project/task/edit/${props.match.params.id}`;
    axios.get(url)
         .then(response => {
           setEditData(response.data.data)
         })
         .catch(error => {
           console.log(error);
         })
  },[] );

    return (
      <Container>
        <div>
          <h2>Edit Task :</h2>
          <Form className="post" onSubmit={handleSubmit}>
            <Row>
            <Form.Control type="hidden" size="sm" defaultValue={editData.id}/>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control type="text" size="sm" name="name" placeholder="Task Name" defaultValue={editData.name} onChange={onChangeHandler} onBlur={onBlurHandler}/>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" name="status" value={editData.status} onChange={onChangeHandler}>
                    <option value={1}>Ongoing</option>
                    <option value={0}>Completed</option>
                    <option value={2}>Stopped</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control type="datetime-local" size="sm" name="start_time" placeholder="Task Start" value={moment(editData.start_time).format('YYYY-MM-DDTHH:mm')} onChange={onChangeHandler} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="datetime-local" size="sm" name="end_time" placeholder="Task End" value={ moment(editData.end_time).format('YYYY-MM-DDTHH:mm') } onChange={onChangeHandler} />
                </Form.Group>
              </Col>
            </Row>
              <Button variant="success" type="submit" size="block">
                Update
              </Button>
            </Form>
        </div>
      </Container>
    );
}

export default Edit;
