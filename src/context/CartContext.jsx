import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const deliveryFee = 2.5

  const addToCart = (product, quantityToAdd = 1) => {
    const count = Math.max(1, Number(quantityToAdd) || 1)
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + count }
            : item
        )
      }
      return [...prev, { ...product, quantity: count }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const cartTotal = cartItems.reduce((sum, item) => {
    const itemPrice = Number(item.salePrice || item.price || 0)
    return sum + itemPrice * item.quantity
  }, 0)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        deliveryFee,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}