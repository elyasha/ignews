import Head from 'next/head';

import styles from './styles.module.scss';



export default function Home({product} : HomeProps) {
  return (
    <>
    <Head>
      <title>Posts | Ignews</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.posts}>
        <a href="">
          <time>12 de março de 2021</time>
          <strong>Creating a Monorepo</strong>
          <p>In this guide, you will learn how to create</p>
        </a>
        <a>
          <time>12 de março de 2021</time>
          <strong>Creating a Monorepo</strong>
          <p>In this guide, you will learn how to create</p>
        </a>
        <a>
          <time>12 de março de 2021</time>
          <strong>Creating a Monorepo</strong>
          <p>In this guide, you will learn how to create</p>
        </a>
        <a>
          <time>12 de março de 2021</time>
          <strong>Creating a Monorepo</strong>
          <p>In this guide, you will learn how to create</p>
        </a>
        <a>
          <time>12 de março de 2021</time>
          <strong>Creating a Monorepo</strong>
          <p>In this guide, you will learn how to create</p>
        </a>
      </div>
    </main>
    </>


  )
}
