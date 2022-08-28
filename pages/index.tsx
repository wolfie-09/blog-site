import Head from 'next/head'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity.js'
import Image from "next/image"

import {Post} from '../typings'
import mediumM from '../asset/medium-m.png'
import Link from 'next/link'
import { url } from 'inspector'

interface Props {
  posts: [Post];
}

function Home({posts}: Props) {
console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10">
        <div className="px-10 space-y-5">
            <h1 className="text-6xl max-w-xl font-serif">
              <span className="underline decoration-black decoration-4">Medium</span> is a place to write, read, and connect.
            </h1>
            <h2>It's easy and free to post your thinking on any topic and connect with millions of readers.</h2>
        </div>

        <div className="hidden md:inline-flex pr-8 lg:h-full">
          <Image src={mediumM} height='250px' width='250px'/>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:grid-cols-3 gap-6 p-2 md:p-6'>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group cursor-pointer overflow-hidden border rounded-lg bg-white'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage.asset).url()} alt='' />
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p>{post.title}</p>
                  <p>{post.description} by {post.author.name}</p>
                </div>

                <img 
                  className='h-12 w-12 rounded-full'
                  src={urlFor(post.author.image).url()}
                  alt="Author image"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`

  const posts = await sanityClient.fetch(query)
  
  return {
    props: {
      posts,
    }
  }
}
