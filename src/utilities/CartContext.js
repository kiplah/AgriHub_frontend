import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        const updatedItems = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          cartItems: updatedItems,
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...action.payload, // Includes id, name, price, and image
              quantity: 1,
            },
          ],
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    

    case "REMOVE_FROM_CART":
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      const removedItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        cartItems: filteredItems,
        totalQuantity: state.totalQuantity - removedItem.quantity,
        totalPrice: state.totalPrice - removedItem.price * removedItem.quantity,
      };

    case "INCREASE_QUANTITY":
      const increasedItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        cartItems: increasedItems,
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case "DECREASE_QUANTITY":
      const decreasedItems = state.cartItems
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity reaches 0
      return {
        ...state,
        cartItems: decreasedItems,
        totalQuantity: state.totalQuantity - 1,
        totalPrice: state.totalPrice - action.payload.price,
      };

    case "CLEAR_CART":
      return initialState;

    case "LOAD_CART":
      return action.payload || initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      dispatch({ type: "LOAD_CART", payload: storedCart });
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id) => {
    const item = state.cartItems.find((item) => item.id === id);
    dispatch({ type: "REMOVE_FROM_CART", payload: { id, price: item.price } });
  };

  const increaseQuantity = (id, price) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id, price } });
  };

  const decreaseQuantity = (id, price) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id, price } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
