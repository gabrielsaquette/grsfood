import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

const STORAGE_KEY = 'grsfood_cart'

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            return raw ? JSON.parse(raw) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    }, [cart])

    const addToCart = (item) => {
        // Cada item é único (produto + escolhas), então só empilha
        setCart((prev) => [...prev, { ...item, lineId: Date.now() + Math.random() }])
    }

    const removeFromCart = (lineId) =>
        setCart((prev) => prev.filter((item) => item.lineId !== lineId))

    const clearCart = () => setCart([])

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}