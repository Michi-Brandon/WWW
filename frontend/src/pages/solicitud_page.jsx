import React, { useState, useEffect } from 'react';
import requests from '../data/solicitud_data';

const RequestList = ({ requests, selectedRequest, onSelect, page, setPage, itemsPerPage }) => {
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedRequests = requests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="request-list">
      <h2>Solicitudes</h2>
      <ul>
        {paginatedRequests.map((request) => (
          <li
            key={request.id}
            className={selectedRequest?.id === request.id ? 'active' : ''}
            onClick={() => onSelect(request)}
          >
            <div className="request-title">{request.title}</div>
            <div className="request-date">{request.date}</div>
          </li>
        ))}
      </ul>
      <div className="pagination-controls">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          &lt;
        </button>
        <button
          onClick={() => setPage((prev) => (startIndex + itemsPerPage < requests.length ? prev + 1 : prev))}
          disabled={startIndex + itemsPerPage >= requests.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

const RequestDetails = ({ selectedRequest, onClose }) => {
  return (
    <div className="request-details">
      {selectedRequest ? (
        <>
          <h2>Detalles de la Solicitud</h2>
          <p>
            <strong>Nombre:</strong> {selectedRequest.title}
          </p>
          <p>
            <strong>Descripción:</strong> {selectedRequest.description}
          </p>
          <p>
            <strong>Fecha de Petición:</strong> {selectedRequest.date}
          </p>
          <p>
            <strong>Estado:</strong>{' '}
            <span
              className={`badge ${
                selectedRequest.status === 'Pendiente'
                  ? 'bg-warning'
                  : selectedRequest.status === 'Aprobado'
                  ? 'bg-success'
                  : 'bg-danger'
              }`}
            >
              {selectedRequest.status}
            </span>
          </p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <a
              href={selectedRequest.ticket}
              download
              className="btn-common download-ticket"
            >
              Descargar Ticket
            </a>
            {/* Botón "Cerrar" con el estilo común */}
            <button
              className="btn-common close-button d-lg-none"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </>
      ) : (
        <p>Selecciona una solicitud para ver los detalles.</p>
      )}
    </div>
  );
};

const SolidPage = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 992);

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 992); // Cambiar punto de corte a 992px para incluir tablets
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="solid-page-container">
      {isMobileView && selectedRequest ? (
        <RequestDetails
          selectedRequest={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      ) : (
        <>
          <RequestList
            requests={requests}
            selectedRequest={selectedRequest}
            onSelect={setSelectedRequest}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
          />
          {!isMobileView && (
            <RequestDetails
              selectedRequest={selectedRequest}
              onClose={() => setSelectedRequest(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SolidPage;
