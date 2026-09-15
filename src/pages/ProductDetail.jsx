import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { getTypeLabel, getTypeImage } from '../data/types'
import { getIngredientsByType, groupIngredients } from '../data/ingredients'
import { useCart } from '../context/CartContext'

function formatPrice(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const product = PRODUCTS.find((p) => p.id === Number(id))

    const [quantity, setQuantity] = useState(1)
    const [combo, setCombo] = useState(false)
    // extras: { [idIngrediente]: qtd }
    const [extras, setExtras] = useState({})
    const [notes, setNotes] = useState('')

    const ingredients = useMemo(
        () => (product ? getIngredientsByType(product.tipo) : []),
        [product]
    )
    const grouped = useMemo(() => groupIngredients(ingredients), [ingredients])

    if (!product) {
        return (
            <div className="page">
                <p className="empty">Produto não encontrado.</p>
                <button className="btn ghost" onClick={() => navigate('/')}>
                    Voltar
                </button>
            </div>
        )
    }

    const available = product.status === 1
    const comboPrice = 8.0

    const changeExtra = (idIng, delta) => {
        setExtras((prev) => {
            const current = prev[idIng] || 0
            const next = Math.max(0, current + delta)
            const copy = { ...prev }
            if (next === 0) delete copy[idIng]
            else copy[idIng] = next
            return copy
        })
    }

    // Total dos adicionais
    const extrasTotal = Object.entries(extras).reduce((sum, [idIng, qtd]) => {
        const ing = ingredients.find((i) => i.idIngrediente === Number(idIng))
        return sum + (ing?.preco || 0) * qtd
    }, 0)

    const unitPrice = product.preco + extrasTotal + (combo ? comboPrice : 0)
    const totalPrice = unitPrice * quantity

    const handleAdd = () => {
        const extrasList = Object.entries(extras).map(([idIng, qtd]) => {
            const ing = ingredients.find((i) => i.idIngrediente === Number(idIng))
            return {
                idIngrediente: Number(idIng),
                nome: ing.nome,
                preco: ing.preco,
                qtd,
                subtotal: ing.preco * qtd,
            }
        })

        addToCart({
            productId: product.id,
            nome: product.nome,
            tipo: product.tipo,
            imagem: product.imagem || getTypeImage(product.tipo),
            quantity,
            combo,
            comboPrice: combo ? comboPrice : 0,
            extras: extrasList,
            notes,
            unitPrice,
            totalPrice,
        })

        navigate('/')
    }

    return (
        <div className="page detail">
            <div className="detail-image">
                <img
                    src={product.imagem || getTypeImage(product.tipo)}
                    alt={product.nome}
                />
            </div>

            <header className="detail-header">
                <span className="detail-type">{getTypeLabel(product.tipo)}</span>
                <h2 className="detail-title">{product.nome}</h2>
                <p className="detail-desc">{product.descricao}</p>
                <span className="detail-base-price">{formatPrice(product.preco)}</span>
            </header>

            {Object.entries(grouped).map(([grupo, items]) => (
                <section key={grupo} className="option-group">
                    <h3 className="option-group-title">{grupo}</h3>
                    <div className="option-list">
                        {items.map((ing) => {
                            const qtd = extras[ing.idIngrediente] || 0
                            return (
                                <div
                                    key={ing.idIngrediente}
                                    className={`option ${qtd > 0 ? 'checked' : ''}`}
                                >
                                    <div className="option-info">
                                        <span className="option-name">{ing.nome}</span>
                                        <span className="option-price">
                                            + {formatPrice(ing.preco)}
                                        </span>
                                    </div>

                                    <div className="qty qty-small">
                                        <button
                                            type="button"
                                            className="qty-btn"
                                            onClick={() => changeExtra(ing.idIngrediente, -1)}
                                            disabled={qtd === 0}
                                        >
                                            −
                                        </button>
                                        <span className="qty-value">{qtd}</span>
                                        <button
                                            type="button"
                                            className="qty-btn"
                                            onClick={() => changeExtra(ing.idIngrediente, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            ))}

            {product.temCombo && (
                <section className="option-group">
                    <h3 className="option-group-title">Combo</h3>
                    <label className={`option ${combo ? 'checked' : ''}`}>
                        <input
                            type="checkbox"
                            checked={combo}
                            onChange={(e) => setCombo(e.target.checked)}
                        />
                        <div className="option-info">
                            <span className="option-name">Transformar em combo</span>
                            <span className="option-price">
                                + {formatPrice(comboPrice)}
                            </span>
                        </div>
                    </label>
                </section>
            )}

            <section className="option-group">
                <h3 className="option-group-title">Observações</h3>
                <textarea
                    className="notes"
                    placeholder="Ex: sem cebola, ponto da carne..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                />
            </section>

            <section className="detail-footer">
                <div className="qty">
                    <button
                        type="button"
                        className="qty-btn"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                        −
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                        type="button"
                        className="qty-btn"
                        onClick={() => setQuantity((q) => q + 1)}
                    >
                        +
                    </button>
                </div>

                <button
                    type="button"
                    className="btn primary"
                    disabled={!available}
                    onClick={handleAdd}
                >
                    {available
                        ? `Adicionar • ${formatPrice(totalPrice)}`
                        : 'Indisponível'}
                </button>
            </section>
        </div>
    )
}

export default ProductDetail