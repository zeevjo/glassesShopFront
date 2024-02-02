// useCartLength.ts
import { useState, useEffect } from 'react';

function getCartLength(key: string): number {
    const cart = localStorage.getItem(key);
    if (cart) {
        const cartArray = JSON.parse(cart);
        return Array.isArray(cartArray) ? cartArray.length : 0;
    }
    return 0;
}

function useCartLength(cartKey: string): number {
    const [cartLength, setCartLength] = useState(getCartLength(cartKey));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentLength = getCartLength(cartKey);
            if (currentLength !== cartLength) {
                setCartLength(currentLength);
            }
        }, 1000); // check every 1 second

        return () => clearInterval(intervalId);
    }, [cartLength, cartKey]);

    return cartLength;
}

export default useCartLength;