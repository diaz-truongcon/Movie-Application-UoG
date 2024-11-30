export const processPayPalPayment = async (amount: string): Promise<string> => {
    try {
        const response = await fetch('http://localhost:3000/paypal-transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            throw new Error('Payment failed');
        }

        const data = await response.json();
        return data.transactionId;
    } catch (error) {
        console.error('Error processing PayPal payment:', error);
        throw new Error('Payment failed');
    }
}; 