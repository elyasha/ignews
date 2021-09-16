import { signIn, useSession } from 'next-auth/client';
import { stripe } from '../../services/stripe';
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

  function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;
    }

    // Criação da checkout session
    // strip checkout session
    


  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}>
      Subscribe now
    </button>
  )
}
