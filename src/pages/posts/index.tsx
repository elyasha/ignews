import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client'

import styles from './styles.module.scss';
import { getPrismicClient } from '../../services/prismic';



export default function Home({ product }: HomeProps) {
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


export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient()

  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'publication')
    , {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 100,
    })

    console.log(JSON.stringify(response, null, 2))

  return {
    props: {


    }
  }

}
