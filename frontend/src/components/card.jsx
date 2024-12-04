import React from 'react';

const Card = ({ title, imageUrl, description, buttonText, onButtonClick, isAvailable }) => {
  return (
    <div className="card shadow-sm p-3" style={{ width: '18rem', position: 'relative' }}>
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={title} />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button 
          onClick={onButtonClick} 
          className="btn btn-primary"
        >
          {buttonText}
        </button>
      </div>

      {/* Indicador de disponibilidad */}
      <span
        className={`badge position-absolute bottom-0 end-0 m-3 ${
          isAvailable === 'Disponible' ? 'bg-success' : 'bg-danger'
        }`}
        style={{ fontSize: '0.9rem' }}
      >
        {isAvailable === 'Disponible' ? 'Disponible' : 'No disponible'}
      </span>
    </div>
  );
};

export default Card;
