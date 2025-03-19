import { useState, useEffect, Fragment} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListProductos from './components/ListProductos';

function App() {
  const [productos, setProductos] = useState(() => {
    //LS= LocalStorage
    const datosLS = localStorage.getItem("productos");
    return datosLS ? JSON.parse(datosLS) : [
      { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
      { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
      { id: 3, nombre: "Mouse", precio: 30, stock: 40 },
      { id: 3, nombre: "MousePad", precio: 20, stock: 30 },
      { id: 3, nombre: "Tableta Grafica", precio: 50, stock: 10 }
    ];
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  return (
    <Fragment>
      <h1>Inventario de Productos</h1>
      <ListProductos productos={productos}/>
    </Fragment>
  )
}

export default App
