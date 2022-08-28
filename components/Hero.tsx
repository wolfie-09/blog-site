import Image from "next/image"
import { useEffect } from "react";
import mediumM from '../asset/medium-m.png'
import { sanityClient } from "../sanity"
import { Post } from "../typings"

interface Props {
  posts: [Post];
}

const Hero = ({posts}: Props) => {
  console.log(posts)
  useEffect(() => {
        
  }, [posts])
  return (
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
  )
}

export default Hero

export const getServerSideProps = async () => {
  const query = `[_type == "post"]{
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