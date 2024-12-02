const generalInventory = {
  items: [
    { id: 1, name: "Recurso A", quantity: 10, status: "Disponible" },
    { id: 2, name: "Recurso B", quantity: 5, status: "No disponible" },
    { id: 3, name: "Recurso C", quantity: 12, status: "Disponible" },
    { id: 4, name: "Recurso D", quantity: 0, status: "No disponible" },
    { id: 5, name: "Recurso E", quantity: 8, status: "Disponible" },
    { id: 6, name: "Recurso F", quantity: 3, status: "No disponible" },
    { id: 7, name: "Recurso G", quantity: 20, status: "Disponible" },
    { id: 8, name: "Recurso H", quantity: 1, status: "Disponible" },
  ],
  mostRequestedResources: [
    { id: 1, name: "Recurso A", requests: 50 },
    { id: 2, name: "Recurso B", requests: 30 },
    { id: 3, name: "Recurso C", requests: 70 },
    { id: 4, name: "Recurso D", requests: 20 },
    { id: 5, name: "Recurso E", requests: 60 },
    { id: 6, name: "Recurso F", requests: 10 },
    { id: 7, name: "Recurso G", requests: 90 },
    { id: 8, name: "Recurso H", requests: 40 },
  ],
  lateReturns: [
    { resource: "Recurso A", user: "Usuario 1", lateDays: 3 },
    { resource: "Recurso B", user: "Usuario 2", lateDays: 2 },
    { resource: "Recurso C", user: "Usuario 3", lateDays: 5 },
    { resource: "Recurso D", user: "Usuario 4", lateDays: 1 },
    { resource: "Recurso E", user: "Usuario 5", lateDays: 4 },
    { resource: "Recurso F", user: "Usuario 6", lateDays: 6 },
    { resource: "Recurso G", user: "Usuario 7", lateDays: 2 },
    { resource: "Recurso H", user: "Usuario 8", lateDays: 7 },
  ],
  highLossResources: [
    { name: "Recurso C", losses: 20 },
    { name: "Recurso D", losses: 15 },
    { name: "Recurso E", losses: 25 },
    { name: "Recurso F", losses: 18 },
    { name: "Recurso G", losses: 30 },
    { name: "Recurso H", losses: 12 },
    { name: "Recurso I", losses: 22 },
    { name: "Recurso J", losses: 14 },
  ],
};

export default generalInventory;
