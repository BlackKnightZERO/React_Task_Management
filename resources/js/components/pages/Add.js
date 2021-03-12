import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { sweet_success, sweet_error } from '../../common.js';

function Add() {

  const [addData, setAddData] = useState({name:'', start_time:'', end_time:'', status:'1',});
  const [formError, setFormError] = useState({});

  const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setAddData(prevState => ({
            ...prevState,
            [name]: value
        }));
  };

  const handleValidation = () => {
    let fields = addData;
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
      let url = `/project/task/store`;
      axios.post(url, addData)
           .then(response => {
             if(response.status === 201){
               sweet_success(response.data.message);
               setAddData({name:'', start_time:'', end_time:'', status:'1',});
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
    setAddData(prevState => ({
        ...prevState,
        [name]: value
    }));
    handleValidation();
    if(!value.trim()){
      sweet_error('Name Field Required');
    }
  }

    return (
      <Container>
      <div>
        <h2>Add Task :</h2>
        <Form className="post" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Task Name</Form.Label>
                <Form.Control type="text" size="sm" name="name" placeholder="Task Name" onChange={onChangeHandler} onBlur={onBlurHandler}/>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" onChange={onChangeHandler}>
                  <option value="1">Ongoing</option>
                  <option value="0">Completed</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="datetime-local" size="sm" name="start_time" defaultValue="" placeholder="Task Start" onChange={onChangeHandler} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>End Time</Form.Label>
                <Form.Control type="datetime-local" size="sm" name="end_time" defaultValue="" placeholder="Task End" onChange={onChangeHandler} />
              </Form.Group>
            </Col>
          </Row>
            <Button variant="success" type="submit" size="block">
              Add
            </Button>
          </Form>
      </div>
      </Container>
    );
}

export default Add;
