import express from 'express';
import Stripe from 'stripe';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Criar sessão de checkout para premium
router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Acesso Premium - Download de Vídeos',
              description: 'Desbloqueie downloads ilimitados de todos os vídeos'
            },
            unit_amount: 990, // R$ 9,90
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar sessão de pagamento', error: error.message });
  }
});

// Verificar pagamento bem-sucedido
router.post('/verify-payment', authenticate, async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid' && session.metadata.userId === req.user._id.toString()) {
      // Ativar premium para o usuário
      await User.findByIdAndUpdate(req.user._id, { hasPremium: true });
      
      res.json({ 
        message: 'Pagamento confirmado! Acesso premium ativado.',
        hasPremium: true 
      });
    } else {
      res.status(400).json({ message: 'Pagamento não confirmado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar pagamento', error: error.message });
  }
});

// Webhook do Stripe (para produção)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata.userId;
      
      await User.findByIdAndUpdate(userId, { hasPremium: true });
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ message: 'Webhook error', error: error.message });
  }
});

export default router;
