import React, { useState } from 'react';
import Card from '../components/card';
import MaterialCard from '../components/materialCard';
import materials from '../data/card_data';

export const HomePage = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar las credenciales al backend

      console.log(email,password);

      const { data } = await axios.post('http://localhost:5000/inventory', { email, password });

      // Si el login es exitoso, guarda el token en localStorage
      localStorage.setItem('token', data.token);

      console.log(localStorage.getItem('token'));
      
      // Llama a onLogin pasando el rol del usuario
      onLogin(role);
    } catch (error) {
      console.error('Error de login 2', error);
      alert('Credenciales incorrectas');
    }
  };
  const [selectedMaterial, setSelectedMaterial] = useState(null); // Material seleccionado
  const [show, setShow] = useState(false); // Control del modal
  const [page, setPage] = useState(1); // Página actual
  const itemsPerPage = 12; // Número de cards por página

  // Manejar la apertura del modal
  const handleShow = (material) => {
    console.log("Debería abrir la materia card");
    setSelectedMaterial(material);
    setShow(true);
  };

  // Manejar el cierre del modal
  const handleClose = () => setShow(false);

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedMaterials = materials.slice(startIndex, startIndex + itemsPerPage);

  const token = localStorage.getItem('token');  // Obtener el token del localStorage

  console.log('Token del usuario logueado:', token);  // Puedes usar el token aquí, por ejemplo, para mostrarlo o enviarlo a un backend.

  return (
    <>
      <div className="container mt-4" style={{padding: "0 0 20px 0"}}>
        <h1>Materiales de Biblioteca</h1>
        <div className="row">
          {paginatedMaterials.map((material, index) => (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3 mb-4"
              key={index}
            >
              <Card
                title={material.title}
                description={material.description}
                buttonText="Ver más"
                onButtonClick={() => handleShow(material)} // Abrir el modal
                isAvailable={material.isAvailable}
              />
            </div>
          ))}
        </div>

        {/* Controles de paginación */}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            &lt; Anterior
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setPage((prev) => (startIndex + itemsPerPage < materials.length ? prev + 1 : prev))}
            disabled={startIndex + itemsPerPage >= materials.length}
          >
            Siguiente &gt;
          </button>
        </div>
      </div>

      {/* Modal dinámico para mostrar los detalles del material */}
      {selectedMaterial && (
        <MaterialCard
          show={show}
          handleClose={handleClose}
          title={selectedMaterial.title}
          description={selectedMaterial.description}
          quantity={selectedMaterial.quantity}
        />
      )}
    </>
  );
};

export default HomePage;
