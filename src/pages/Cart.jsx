import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function formatPrice(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

function Cart() {
    const navigate = useNavigate()
    const { cart, removeFromCart, totalPrice, clearCart } = useCart()

    if (cart.length === 0) {
        return (
            <div className="page">
                <p className="empty">Seu carrinho está vazio.</p>
                <button className="btn ghost" onClick={() => navigate('/')}>
                    Ver menu
                </button>
            </div>
        )
    }

    return (
        <div className="page">
            <h2 className="section-title">Carrinho</h2>

            <div className="section-list">
                {cart.map((item) => (
                    <article key={item.lineId} className="cart-item">
                        <img
                            src={item.imagem}
                            alt={item.nome}
                            className="cart-item-img"
                        />

                        <div className="cart-item-body">
                            <div className="cart-item-header">
                                <h3 className="cart-item-title">
                                    {item.quantity}x {item.nome}
                                </h3>
                                <span className="cart-item-price">
                                    {formatPrice(item.totalPrice)}
                                </span>
                            </div>

                            {(item.extras.length > 0 || item.combo || item.notes) && (
                                <ul className="cart-item-details">
                                    {item.combo && <li>Combo</li>}
                                    {item.extras.map((ex) => (
                                        <li key={ex.idIngrediente}>
                                            {ex.qtd}x {ex.nome}
                                        </li>
                                    ))}
                                    {item.notes && <li>Obs: {item.notes}</li>}
                                </ul>
                            )}

                            <button
                                type="button"
                                className="btn-remove"
                                onClick={() => removeFromCart(item.lineId)}
                            >
                                Remover
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <div className="cart-summary">
                <div className="cart-total">
                    <span>Total</span>
                    <strong>{formatPrice(totalPrice)}</strong>
                </div>

                <button
                    type="button"
                    className="btn primary"
                    onClick={() => navigate('/checkout')}
                >
                    Finalizar pedido
                </button>

                <button type="button" className="btn ghost" onClick={clearCart}>
                    Limpar carrinho
                </button>
            </div>
        </div>
    )
}

export default Cart