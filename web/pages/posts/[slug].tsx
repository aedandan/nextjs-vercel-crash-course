import groq from 'groq';
import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { client } from '../../client';

import { GetStaticProps, GetStaticPaths} from 'next';
import { PortableText } from '@portabletext/react';

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug = "" } = context.params
    const post = await client.fetch(groq`
      *[_type == "post" && slug.current == $slug][0]`, { slug })
    return {
      props: {
        post
      }
    }
}

export const getStaticPaths: GetStaticPaths = async() => {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug : string) => ({params: {slug}})),
    fallback: true,
  }
}

export default function Post({ post }: {post : {title: string, date: string, content: any, slug: string}}) {
    return (
      <Layout>
        <Head>
            <title>{post.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{post.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={post.date} />
            </div>
            <PortableText value={post.content}/>
        </article>
      </Layout>
    );
}