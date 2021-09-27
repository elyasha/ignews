import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string
}

// Posso executar código backend
// getServerSideProps (SSR)
// getStaticProps (SSG)
// API routes

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()

  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;
    }

    if (session?.activeSubscription) {
      router.push('/posts');
      return
    }

    // Criação da checkout session
    // strip checkout session

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data

      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({ sessionId })

    } catch (err) {
      console.log(err.response)
      // alert(err.message);
    }



  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}>
      Subscribe now
    </button>
  )
}
