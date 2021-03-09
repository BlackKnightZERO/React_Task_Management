import React from 'react';
import { useState, useEffect } from 'react';
import { ReactDOM, Route }  from 'react-dom';
import { Container, Table, Button, Modal, Spinner } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { sweet_success, sweet_error } from '../../common.js';
import moment from 'moment';

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

  const handleDeleteConfirmation = (param) => {
    // console.log(param);
    let url = `/project/task/delete`;
    axios.post(url, {id : param})
          .then(response => {
              sweet_success(response.data.message);
              handleClose();
              let url = `/project/task/get`;
              axios.get(url)
                    .then(response => {
                        setTask({ tableData : response.data.data});
                    })
                    .catch(error => {
                        console.log(error);
                    });
          })
          .catch(error => {
            console.log(error);
          })
  };

  useEffect(() => {
    let url = `/project/task/get`;
    axios.get(url)
            .then(response => {
                // console.log(response.data.data);
                setTask({ tableData : response.data.data});
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    if(task.tableData.length===0) return (
    <div style={{ textAlign:"center", marginTop:"25vh" }}>
      <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div> )

    return (
      <Container>
        <div>
          <h2>Task List</h2>
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
              { task.tableData && task.tableData.map((data, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.name}</td>
                  <td>{data.start_time} - { (data.start_time) ? moment(data.created_at).format('D/M/YYYY') : ''}</td>
                  <td>{data.end_time} - { (data.end_time) ? moment(data.created_at).format('D/M/YYYY') : ''} </td>
                  <td>{data.status == 1 ? 'Ongoing' : 'Completed'}</td>
                  <td>
                    <Button variant="info" size="sm" className="mr-1" onClick={onEditButtonClick.bind(this, data.id)}>&#128394;</Button>
                    {/*<Button variant="danger" size="sm" className="mr-1" onClick={onDeleteButtonClick.bind(this, data.id)}>&#10006;</Button>*/}
                    <Button variant="danger" size="sm" className="mr-1" onClick={handleShow.bind(this, data, index)}>&#10006;</Button>
                  </td>
                </tr>
              )) }
              </tbody>
            </Table>
        </div>

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

      </Container>
    );
}

export default List;
