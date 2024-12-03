import React, { useState } from 'react';

const LoanList = ({ loans, onToggleStatus, page, setPage, itemsPerPage }) => {
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedLoans = loans.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="loan-list card h-100">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h5 className="mb-0">Historial de Préstamos</h5>
        <div>
          <button
            className="btn btn-sm btn-light me-1"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            &lt;
          </button>
          <button
            className="btn btn-sm btn-light"
            onClick={() => setPage((prev) => (startIndex + itemsPerPage < loans.length ? prev + 1 : prev))}
            disabled={startIndex + itemsPerPage >= loans.length}
          >
            &gt;
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush overflow-auto">
        {paginatedLoans.map((loan) => (
          <li
            key={loan.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              loan.status === 'Devuelto' ? 'list-group-item-success' : ''
            }`}
          >
            <span>
              <strong>{loan.item}</strong> - {loan.borrower}
            </span>
            <button
              className={`btn btn-sm ${
                loan.status === 'Devuelto' ? 'btn-secondary' : 'btn-success'
              }`}
              onClick={() => onToggleStatus(loan.id)}
              disabled={loan.status === 'Devuelto'}
            >
              {loan.status === 'Devuelto' ? 'Devuelto' : 'Marcar Devuelto'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LoanForm = ({ onAddLoan }) => {
  const [borrower, setBorrower] = useState('');
  const [item, setItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (borrower && item) {
      onAddLoan({ borrower, item });
      setBorrower('');
      setItem('');
    }
  };

  return (
    <div className="loan-form card h-100">
      <div className="card-body">
        <h5 className="card-title">Registrar Préstamo</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="borrower" className="form-label">
              Persona
            </label>
            <input
              type="text"
              className="form-control"
              id="borrower"
              value={borrower}
              onChange={(e) => setBorrower(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="item" className="form-label">
              Ítem Prestado
            </label>
            <input
              type="text"
              className="form-control"
              id="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Añadir Préstamo
          </button>
        </form>
      </div>
    </div>
  );
};

const PrestamoSection = () => {
  const [loans, setLoans] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddLoan = ({ borrower, item }) => {
    const newLoan = {
      id: loans.length + 1,
      borrower,
      item,
      status: 'Pendiente',
    };
    setLoans((prevLoans) => [...prevLoans, newLoan]);
  };

  const handleToggleStatus = (id) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.id === id ? { ...loan, status: 'Devuelto' } : loan
      )
    );
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna izquierda: Lista de préstamos */}
        <div className="col-lg-7 col-md-6 mb-3">
          <LoanList
            loans={loans}
            onToggleStatus={handleToggleStatus}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
          />
        </div>

        {/* Columna derecha: Formulario de préstamos */}
        <div className="col-lg-5 col-md-6">
          <LoanForm onAddLoan={handleAddLoan} />
        </div>
      </div>
    </div>
  );
};

export default PrestamoSection;
