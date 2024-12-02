import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MaterialCard = ({ show, handleClose, title, description, quantity, onButtonClick}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Material</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Descripción:</strong> {description}</p>
        <p><strong>Cantidad disponible:</strong> {quantity}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="success" onClick={onButtonClick}>
          Solicitar Préstamo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MaterialCard;
