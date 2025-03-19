const ItemProductos = ({ producto }) => {
    return (
    <li>
        {producto.nombre} - ${producto.precio} - Stock: {producto.stock}
    </li>
    );
};

export default ItemProductos;