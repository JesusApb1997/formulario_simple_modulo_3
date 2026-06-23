// Array para almacenar los usuarios en memoria
let users = [];

// Cargar usuarios desde el JSON
fetch('./src/js/usuarios.json')
    .then(res => res.json())
    .then(data => users = data)
    .catch(e => console.error("Error al cargar JSON", e));

// Función auxiliar para crear un objeto de usuario de forma compacta
const createUserObj = (id, userName, email, password, isActive, firstName, lastName, age, address, documentId) => ({
    id, userName, email, password, 
    isActive: isActive === 'true' || isActive === true,
    personalInfo: { documentId, age, firstName, lastName, address }
});

// Registrar un usuario
const addUser = (...args) => users.push(createUserObj(...args));

// Guardar un usuario (actúa como registro)
const saveUser = (...args) => addUser(...args);

// Actualizar un usuario existente
const updateUser = (...args) => {
    const user = createUserObj(...args);
    const i = users.findIndex(u => u.id === user.id || u.personalInfo.documentId === user.personalInfo.documentId);
    if (i === -1) return false;
    users[i] = user;
    return true;
};

// Buscar un usuario por cédula
const findUserByDocumentId = docId => users.find(u => u.personalInfo.documentId === docId);
