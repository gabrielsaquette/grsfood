import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function formatPrice(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

const PAYMENT_OPTIONS = [
    { id: 'pix', label: 'PIX' },
    { id: 'credit', label: 'Cartão de Crédito' },
    { id: 'debit', label: 'Cartão de Débito' },
    { id: 'cash', label: 'Dinheiro' },
]

function Checkout() {
    const navigate = useNavigate()
    const { cart, totalPrice, clearCart } = useCart()

    const [form, setForm] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        referencia: '',
    })

    const [payment, setPayment] = useState('pix')
    const [troco, setTroco] = useState('')

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const order = { form, payment, troco, cart, totalPrice }
        console.log('Pedido enviado:', order)
        clearCart()
        navigate('/')
    }

    if (cart.length === 0) {
        return (
            <div className="page">
                <p className="empty">Nada para finalizar.</p>
                <button className="btn ghost" onClick={() => navigate('/')}>
                    Voltar
                </button>
            </div>
        )
    }

    return (
        <form className="page checkout" onSubmit={handleSubmit}>
            {/* Resumo */}
            <section className="checkout-block">
                <h2 className="section-title">Resumo do pedido</h2>
                <ul className="summary-list">
                    {cart.map((item) => (
                        <li key={item.lineId} className="summary-item">
                            <span className="summary-qty">{item.quantity}x</span>
                            <span className="summary-name">{item.nome}</span>
                            <span className="summary-price">
                                {formatPrice(item.totalPrice)}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="cart-total">
                    <span>Total</span>
                    <strong>{formatPrice(totalPrice)}</strong>
                </div>
            </section>

            {/* Entrega */}
            <section className="checkout-block">
                <h2 className="section-title">Dados de entrega</h2>

                <div className="field">
                    <label>Nome</label>
                    <input
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome"
                    />
                </div>

                <div className="field">
                    <label>Telefone</label>
                    <input
                        name="telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        required
                        placeholder="(00) 00000-0000"
                    />
                </div>

                <div className="field-row">
                    <div className="field" style={{ flex: 3 }}>
                        <label>Endereço</label>
                        <input
                            name="endereco"
                            value={form.endereco}
                            onChange={handleChange}
                            required
                            placeholder="Rua / Avenida"
                        />
                    </div>
                    <div className="field" style={{ flex: 1 }}>
                        <label>Número</label>
                        <input
                            name="numero"
                            value={form.numero}
                            onChange={handleChange}
                            required
                            placeholder="123"
                        />
                    </div>
                </div>

                <div className="field">
                    <label>Complemento</label>
                    <input
                        name="complemento"
                        value={form.complemento}
                        onChange={handleChange}
                        placeholder="Apto, bloco..."
                    />
                </div>

                <div className="field">
                    <label>Bairro</label>
                    <input
                        name="bairro"
                        value={form.bairro}
                        onChange={handleChange}
                        required
                        placeholder="Bairro"
                    />
                </div>

                <div className="field">
                    <label>Ponto de referência</label>
                    <input
                        name="referencia"
                        value={form.referencia}
                        onChange={handleChange}
                        placeholder="Opcional"
                    />
                </div>
            </section>

            {/* Pagamento */}
            <section className="checkout-block">
                <h2 className="section-title">Forma de pagamento</h2>

                <div className="payment-list">
                    {PAYMENT_OPTIONS.map((opt) => (
                        <label
                            key={opt.id}
                            className={`option ${payment === opt.id ? 'checked' : ''}`}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value={opt.id}
                                checked={payment === opt.id}
                                onChange={() => setPayment(opt.id)}
                            />
                            <span className="option-name">{opt.label}</span>
                        </label>
                    ))}
                </div>

                {payment === 'cash' && (
                    <div className="field">
                        <label>Troco para</label>
                        <input
                            name="troco"
                            value={troco}
                            onChange={(e) => setTroco(e.target.value)}
                            placeholder="Ex: 100,00"
                        />
                    </div>
                )}
            </section>

            <div className="checkout-footer">
                <button type="submit" className="btn primary">
                    Confirmar pedido • {formatPrice(totalPrice)}
                </button>
            </div>
        </form>
    )
}

export default Checkout