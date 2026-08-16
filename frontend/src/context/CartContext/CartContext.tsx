import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "../../types";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];

    addToCart: (
        product: Product,
        quantity: number
    ) => void;

    removeFromCart: (productId: number) => void;

    updateQuantity: (
        productId: number,
        quantity: number
    ) => void;

    clearCart: () => void;
}

const CartContext = createContext<
    CartContextType | undefined
>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({
    children,
}: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem("hema-cart");

        if (!savedCart) {
            return [];
        }

        try {
            return JSON.parse(savedCart);
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "hema-cart",
            JSON.stringify(items)
        );
    }, [items]);

    function addToCart(
        product: Product,
        quantity: number
    ) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                const newQuantity =
                    existingItem.quantity + quantity;

                if (
                    product.stock !== -1 &&
                    newQuantity > product.stock
                ) {
                    return currentItems;
                }

                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: newQuantity,
                        }
                        : item
                );
            }

            if (
                product.stock !== -1 &&
                quantity > product.stock
            ) {
                return currentItems;
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity,
                },
            ];
        });
    }

    function removeFromCart(productId: number) {
        setItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    item.product.id !== productId
            )
        );
    }

    function updateQuantity(
        productId: number,
        quantity: number
    ) {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.product.id !== productId) {
                    return item;
                }

                if (quantity < 1) {
                    return item;
                }

                if (
                    item.product.stock !== -1 &&
                    quantity > item.product.stock
                ) {
                    return item;
                }

                return {
                    ...item,
                    quantity,
                };
            })
        );
    }
    function clearCart() {
        setItems([]);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart debe utilizarse dentro de CartProvider"
        );
    }

    return context;
}