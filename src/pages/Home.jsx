import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { TYPE_LIST, getStatusLabel, getTypeImage } from '../data/types'
import { useCart } from '../context/CartContext'

function formatPrice(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

function ProductCard({ product }) {
    const available = product.status === 1

    return (
        <Link
            to={`/produto/${product.id}`}
            className="card-link"
            onClick={(e) => !available && e.preventDefault()}
        >
            <article className={`card ${!available ? 'disabled' : ''}`}>
                <div className="card-image">
                    <img
                        src={product.imagem || getTypeImage(product.tipo)}
                        alt={product.nome}
                        loading="lazy"
                    />
                </div>

                <div className="card-body">
                    <div className="card-header">
                        <h3 className="card-title">{product.nome}</h3>
                        <span className="card-price">{formatPrice(product.preco)}</span>
                    </div>

                    <p className="card-desc">{product.descricao}</p>

                    <div className="card-meta">
                        {product.temCombo && <span className="tag">Combo</span>}
                        {!available && (
                            <span className="tag off">{getStatusLabel(product.status)}</span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    )
}

function normalize(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

function Home() {
    const navigate = useNavigate()
    const { totalItems, totalPrice } = useCart()
    const [search, setSearch] = useState('')

    const availableTypes = TYPE_LIST.filter((type) =>
        PRODUCTS.some((p) => p.tipo === type.id)
    )

    const [activeType, setActiveType] = useState(availableTypes[0]?.id)
    const isSearching = search.trim().length > 0

    const searchResults = useMemo(() => {
        if (!isSearching) return []
        const q = normalize(search.trim())
        return PRODUCTS.filter(
            (p) =>
                normalize(p.nome).includes(q) || normalize(p.descricao).includes(q)
        )
    }, [search, isSearching])

    const items = isSearching
        ? searchResults
        : PRODUCTS.filter((p) => p.tipo === activeType)

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearch(value)
        if (value.trim().length > 0) setActiveType(null)
        else setActiveType(availableTypes[0]?.id)
    }

    const handleTabClick = (typeId) => {
        setSearch('')
        setActiveType(typeId)
    }

    return (
        <div className="page">
            <div className="search">
                <input
                    type="search"
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            <nav className="tabs">
                {isSearching && (
                    <button
                        type="button"
                        className={`tab ${activeType === null ? 'active' : ''}`}
                        onClick={() => setActiveType(null)}
                    >
                        Todos
                    </button>
                )}

                {!isSearching &&
                    availableTypes.map((type) => (
                        <button
                            key={type.id}
                            type="button"
                            className={`tab ${activeType === type.id ? 'active' : ''}`}
                            onClick={() => handleTabClick(type.id)}
                        >
                            {type.label}
                        </button>
                    ))}
            </nav>

            {items.length === 0 ? (
                <p className="empty">Nenhum item encontrado.</p>
            ) : (
                <div className="section-list">
                    {items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {totalItems > 0 && (
                <div className="sticky-action">
                    <button
                        type="button"
                        className="btn primary"
                        onClick={() => navigate('/cart')}
                    >
                        Finalizar pedido • {totalItems} {totalItems === 1 ? 'item' : 'itens'} • {formatPrice(totalPrice)}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Home