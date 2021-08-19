import React from 'react';
import { useState, useEffect } from 'react';
import { ReactDOM, Route }  from 'react-dom';
import { Container, Table, Button, Modal, Spinner } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { sweet_success, sweet_error } from '../../common.js';
import moment from 'moment';
import MyModal from '../partials/MyModal.js';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function List() {

  let history = useHistory();
  const [task, setTask] = useState({ tableData : [] });
  const [show, setShow] = useState(false);
  const [deleteItem, setdeleteItem] = useState('');
  const [deleteIndex, setdeleteIndex] = useState('-1');

 const handleClose = () => { setShow(false); setdeleteItem(''); setdeleteIndex('-1'); }
 const handleShow = (param1, param2) => { setShow(true); setdeleteItem(param1); setdeleteIndex(param2); }

  const onEditButtonClick = (param) => {
    history.push(`/edit/${param}`)
  };

  const generateEmoji = (param) => {
    if(param == 0){
      return <span>&#128681;</span>;
    }
  }

  const generateStatus = (param) => {
    if(param == 1){
      return 'Ongoing';
    } else if (param == 0) {
      return 'Completed';
    } else if(param == 2) {
      return 'Stopped';
    } else {
      return '';
    }
  }

  const countOngoing = (task) => {
    if(task) {
      return task.filter(item => item.status==1).length;
    } else {
      return 0;
    }
  }

  const countCompleted = (task) => {
    if(task) {
      return task.filter(item => item.status==0).length;
    } else {
      return 0;
    }
  }

  const countStopped = (task) => {
    if(task) {
      return task.filter(item => item.status==2).length;
    } else {
      return 0;
    }
  }

  const searchHandler = (event) => {
    const { name, value } = event.target;
    let url = '';
    if(!value) {
      url = `/project/task/get`;
    } else {
      url = `/project/task/search/${value}`;
    }
    axios.get(url)
          .then(response => {
            setTask({ tableData : response.data.data});
          })
          .catch(error => {
            console.log(error);
          })
  };

  // const handleDeleteConfirmation = (param) => {
  //   let url = `/project/task/delete`;
  //   axios.post(url, {id : param})
  //         .then(response => {
  //             sweet_success(response.data.message);
  //             handleClose();
  //             let url = `/project/task/get`;
  //             axios.get(url)
  //                   .then(response => {
  //                       setTask({ tableData : response.data.data});
  //                   })
  //                   .catch(error => {
  //                       console.log(error);
  //                   });

  //             task.tableData.splice(deleteIndex, 1);
  //             setTask({ tableData : task.tableData });

  //         })
  //         .catch(error => {
  //           console.log(error);
  //         })
  // };

  const handleDeleteConfirmation2 = () => {
    let deleteId = deleteItem.id;
    let url = `/project/task/delete`;
    axios.post(url, {id : deleteId})
          .then(response => {
              sweet_success(response.data.message);
              handleClose();
              task.tableData.splice(deleteIndex, 1);
              setTask({ tableData : task.tableData });
          })
          .catch(error => {
            console.log(error);
          })
  };

  useEffect(() => {
    let url = `/project/task/get`;
    axios.get(url)
            .then(response => {
                setTask({ tableData : response.data.data});
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    {/*
    if(task.tableData.length==0) return (
    <div style={{ textAlign:"center", marginTop:"25vh" }}>
      <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div> )
    */}
    return (
      <Container>
        <Row>
          <Col xs={4}>
            <Card
                bg='success'
                key={0}
                text='light'
                style={{ width: '18rem' }}
                className="mb-2"
              >
                {/* <Card.Header>Header</Card.Header> */}
                <Card.Body>
                  <Card.Title>Achieved <span>&#128681;</span></Card.Title>
                  <Card.Text>
                  { countCompleted(task.tableData) } Skills
                  </Card.Text>
                </Card.Body>
              </Card>
          </Col>
          <Col xs={4}>
            <Card
                bg='info'
                key={0}
                text='light'
                style={{ width: '18rem' }}
                className="mb-2"
              >
                {/* <Card.Header>Header</Card.Header> */}
                <Card.Body>
                  <Card.Title>Ongoing <span>&#128293;</span></Card.Title>
                  <Card.Text>
                  { countOngoing(task.tableData) } Skills
                  </Card.Text>
                </Card.Body>
              </Card>
          </Col>
          <Col xs={4}>
            <Card
                bg='secondary'
                key={0}
                text='light'
                style={{ width: '18rem' }}
                className="mb-2"
              >
                {/* <Card.Header>Header</Card.Header> */}
                <Card.Body>
                  <Card.Title>Stopped <span>&#9940;</span></Card.Title>
                  <Card.Text>
                  { countStopped(task.tableData) } Skills
                  </Card.Text>
                </Card.Body>
              </Card>
          </Col>
        </Row>

        <div style={{ marginTop: '10px' }}>
          <div style={{ position: 'relative' }}>
            <h2>Task List</h2>
            <span style={{ position: 'absolute', bottom:'0', right:'0'}}>
              <input type="text" style={{ width: '150px', height: '28px' }} name="search" onChange={searchHandler} placeholder="search" />
            </span>
          </div>
          <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Take Name</th>
                  <th>Begin</th>
                  <th>End</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                (task.tableData.length != 0) ? task.tableData.map((data, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.name} {generateEmoji(data.status)} </td>
                  <td>{ (data.start_time) ? moment(data.start_time).format('D/M/YYYY ~ hh:mmA') : '--' }</td>
                  <td>{ (data.end_time) ? moment(data.end_time).format('D/M/YYYY ~ hh:mmA') : '--' }</td>
                  <td>{generateStatus(data.status)}</td>
                  <td>
                    <Button variant="info" size="sm" className="mr-1" onClick={onEditButtonClick.bind(this, data.id)}>&#128394;</Button>
                    <Button variant="danger" size="sm" className="mr-1" onClick={handleShow.bind(this, data, index)}>&#10006;</Button>
                  </td>
                </tr>
              )) : <tr><td colSpan="6" className="text-center">No Data</td></tr>
            }
              </tbody>
            </Table>
        </div>

          {/*
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete - {deleteItem.name}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" size="sm" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" size="sm" onClick={handleDeleteConfirmation.bind(this, deleteItem.id)}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          */}
          <MyModal
          show={show}
          onHide={handleClose}
          deleteItem={deleteItem}
          handleDeleteConfirmation2={handleDeleteConfirmation2}></MyModal>

      </Container>
    );
}

export default List;
