import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss'
import Image from 'next/image'
import logo from '../../../public/images/logo.svg'

import { ActiveLink } from '../ActiveLink';


export function Header() {


  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt='ig.news' />
        <nav>
          <ActiveLink activeClassName={styles.active} href={'/'}>
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink prefetch activeClassName={styles.active} href={'/posts'}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
