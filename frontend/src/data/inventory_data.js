const inventoryData = [
    {
      id: 1,
      name: "El Quijote",
      category: "Libros",
      description: "Una novela clásica de Miguel de Cervantes.",
      quantity: 4,
      status: "Disponible",
      borrower: null
    },
    {
      id: 2,
      name: "Matemáticas Avanzadas",
      category: "Libros",
      description: "Libro de texto para cálculo y álgebra.",
      quantity: 2,
      status: "Prestado",
      borrower: { name: "Juan Pérez", email: "juan.perez@example.com" }
    },
    {
      id: 3,
      name: "La Odisea",
      category: "Libros",
      description: "Obra épica escrita por Homero.",
      quantity: 1,
      status: "Prestado",
      borrower: { name: "Ana López", email: "ana.lopez@example.com" }
    },
    {
      id: 4,
      name: "Programación en JavaScript",
      category: "Libros",
      description: "Guía para desarrollo web con JavaScript.",
      quantity: 5,
      status: "Disponible",
      borrower: null
    },
    {
      id: 5,
      name: "Atlas de Geografía",
      category: "Mapas",
      description: "Mapa completo del mundo con detalles.",
      quantity: 3,
      status: "Disponible",
      borrower: null
    },
    {
      id: 6,
      name: "Historia del Arte",
      category: "Libros",
      description: "Una introducción al arte desde la prehistoria.",
      quantity: 0,
      status: "Prestado",
      borrower: { name: "Luis Martínez", email: "luis.martinez@example.com" }
    },
  ];

export default inventoryData;