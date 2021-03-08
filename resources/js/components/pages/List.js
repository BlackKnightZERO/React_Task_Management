import React from 'react';
import { useState, useEffect } from 'react';
import { ReactDOM, Route }  from 'react-dom';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function List() {

  let history = useHistory();
  const [task, setTask] = useState({ tableData : [] });
  const [show, setShow] = useState(false);
  const [deleteItem, setdeleteItem] = useState('');

 const handleClose = () => { setShow(false); setdeleteItem(''); }
 const handleShow = (param) => { setShow(true); setdeleteItem(param); }

  const onEditButtonClick = (param) => {
    history.push(`/edit/${param}`)
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
                  <td>{data.start_time}</td>
                  <td>{data.end_time}</td>
                  <td>{data.status == 1 ? 'Ongoing' : 'Completed'}</td>
                  <td>
                    <Button variant="info" size="sm" className="mr-1" onClick={onEditButtonClick.bind(this, data.id)}>&#128394;</Button>
                    {/*<Button variant="danger" size="sm" className="mr-1" onClick={onDeleteButtonClick.bind(this, data.id)}>&#10006;</Button>*/}
                    <Button variant="danger" size="sm" className="mr-1" onClick={handleShow.bind(this, data.name)}>&#10006;</Button>
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
            <Modal.Body>Are Yyou sure you want to delete - {deleteItem}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" size="sm" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" size="sm" onClick={handleClose}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

      </Container>
    );
}

export default List;
