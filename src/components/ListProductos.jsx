import ItemProductos from "./ItemProductos";

const ListProductos = ({ productos }) => {
    return (
        <ul>
            {productos.map((producto) => (
                <ItemProductos key = {producto.id} producto={producto} />
            ))}
        </ul>
    );
};

export default ListProductos;