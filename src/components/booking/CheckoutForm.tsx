import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import API from '@/lib/api';
import { useNavigate } from 'react-router-dom';

interface CheckoutFormProps {
  carId: string;
  pickupDate: string;
  returnDate: string;
  totalAmount: number;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  carId,
  pickupDate,
  returnDate,
  totalAmount,
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        toast({
          title: 'Payment Error',
          description: error.message,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Send paymentMethod.id and booking details to your server
      await API.post('/bookings', {
        carId,
        pickupDate,
        returnDate,
        totalAmount,
        paymentMethodId: paymentMethod.id,
      });

      toast({
        title: 'Booking Confirmed!',
        description: 'Your payment was successful and booking is active.',
      });

      onSuccess();
      navigate('/dashboard');
    } catch (err: any) {
      toast({
        title: 'Booking Failed',
        description: err.response?.data?.message || err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-secondary rounded-lg border border-border">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <Button
        type="submit"
        variant="gold"
        className="w-full"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : `Pay $${totalAmount}`}
      </Button>
    </form>
  );
};

export default CheckoutForm;
