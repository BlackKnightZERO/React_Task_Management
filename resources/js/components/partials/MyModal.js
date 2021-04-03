import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';

function MyModal(props){

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete - {props.deleteItem.name}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" size="sm" onClick={props.handleDeleteConfirmation2}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;