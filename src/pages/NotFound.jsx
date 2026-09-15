import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section className="page">
            <h2>404</h2>
            <p>Página não encontrada</p>
            <Link to="/">Voltar para Home</Link>
        </section>
    )
}

export default NotFound