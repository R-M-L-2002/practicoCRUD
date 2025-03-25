import React, { useState, useEffect, Fragment } from 'react';
import './App.css';

const App = () => {
  //peroductos precargados
  const productosIniciales = [
    { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
    { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
    { id: 3, nombre: "Mouse", precio: 30, stock: 40 },
  ];

  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({ id: '', nombre: '', precio: '', stock: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false); 

  //cragar los prdct del LS
  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || productosIniciales;
    setProductos(productosGuardados);
  }, []);

  //guardar prdct del LS
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  //cambio en el form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  //agregar
  const handleAdd = () => {
    if (producto.nombre && producto.precio && producto.stock) {
      const nuevoProducto = {
        ...producto,
        id: Date.now(), // para id unico
      };
      setProductos([...productos, nuevoProducto]);
      setProducto({ id: '', nombre: '', precio: '', stock: '' });
    }
  };

  //editar
  const handleEdit = (id) => {
    const productoEditar = productos.find((prod) => prod.id === id);
    setProducto(productoEditar);
    setIsEditing(true);
  };

  //actualizar
  const handleUpdate = () => {
    setProductos(
      productos.map((prod) =>
        prod.id === producto.id ? { ...prod, nombre: producto.nombre, precio: producto.precio, stock: producto.stock } : prod
      )
    );
    setIsEditing(false);
    setProducto({ id: '', nombre: '', precio: '', stock: '' });
  };

  //eliminar
  const handleDelete = (id) => {
    setProductos(productos.filter((prod) => prod.id !== id));
  };

  //eliminar todo
  const handleDeleteAll = () => {
    setProductos([]);
  };

  //para ver o no la lista
  const toggleMostrarLista = () => {
    setMostrarLista(!mostrarLista);
  };

  return (
    <Fragment>
      <h1>Inventario de Productos</h1>

      <div>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Producto"
        />
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          placeholder="$"
        />
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          placeholder="Stock"
        />
        {isEditing ? (
          <button onClick={handleUpdate}>Actualizar Producto</button>
        ) : (
          <button onClick={handleAdd}>Agregar Producto</button>
        )}
      </div>

      <button onClick={toggleMostrarLista}>
        {mostrarLista ? 'Ocultar Lista' : 'Mostrar Lista'}
      </button>

      {mostrarLista && (
        <ul>
          {productos.map((prod) => (
            <li key={prod.id}>
              <span>
                {prod.nombre} - ${prod.precio} - {prod.stock} en stock
              </span>
              <button onClick={() => handleEdit(prod.id)}>Editar</button>
              <button onClick={() => handleDelete(prod.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}

      {productos.length > 0 && (
        <button onClick={handleDeleteAll}>Eliminar Todos</button>
      )}
    </Fragment>
  );
};

export default App;
