import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import ProductDetail from '../pages/ProductDetail'
import Checkout from '../pages/Checkout'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes