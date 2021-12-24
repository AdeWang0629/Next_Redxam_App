import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@components/global/Navbar";
import Footer from "@components/global/Footer";
import Switcher from "@components/global/Switcher";

import MouseIcon from "@public/icons/mouse.svg";
import BlogPostImage from "@public/images/blog/blogPost.png";
import Newsletter from "@components/landing/Newsletter";

const Blog: NextPage = () => {
  let blogPosts = new Array(6).fill({
    image: BlogPostImage,
    date: "MAY 20TH 2020",
    title: "Introducing Under the Hood, a New Robinhood Podcast",
    description:
      "Amidst the economic dowtun, a new need has emerged for Saas companies to ofer more flexible payment terms to even the largest...",
    url: "https://google.com",
  });

  return (
    <>
      <Navbar title="Blog" />
      <Switcher activePage="blog" />
      <section className="flex flex-col items-center justify-center max-w-7xl mx-auto h-full px-4 md:px-0 mb-8">
        <h1 className="text-5xl md:text-7xl tracking-[-0.05em] font-secondary mb-10 font-bold text-lighter-black dark:text-gray-200 mt-16 leading-[1.2] text-center w-full md:max-w-[62.5rem]">
          Get the latest update and Gist on investment from the redxam Blog
        </h1>

        <p className="text-black dark:text-white font-primary text-[1.0625rem] max-w-[43.0625rem] mb-[1.875rem] text-center text-opacity-80">
          redxam is changing the way the world moves and embraces
          cryptocurrencies, a gateway to more and better business creating a
          financial solutions platform to make cryptocurrency purchases simple
          and user-friendly.
        </p>

        <Link href="/blog#posts" shallow scroll>
          <Image src={MouseIcon} alt="Scroll Down" />
        </Link>
      </section>

      <section
        className="pt-24 pb-0 md:grid grid-cols-3 gap-x-12 gap-y-24 max-w-7xl mx-auto px-4 md:px-0"
        id="posts"
      >
        {blogPosts.map((post, idx) => (
          <BlogPost
            image={post.image}
            date={post.date}
            title={post.title}
            description={post.description}
            url={post.url}
            key={idx}
          />
        ))}
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

interface BlogPostProps {
  image: StaticImageData;
  date: string;
  title: string;
  description: string;
  url: string;
}

const BlogPost: NextPage<BlogPostProps> = ({
  image,
  date,
  title,
  description,
  url,
}) => {
  return (
    <div className="text-center md:text-left mb-28 md:mb-0">
      <div className="my-0 mx-auto md:mx-0 w-full blog-image">
        <Image
          src={image}
          alt=""
          className="w-full object-cover"
          placeholder="blur"
        />
      </div>
      <h4 className="mt-8 mb-2.5 text-[1.0625rem] font-medium uppercase text-[#828282] tracking-[0.3em]">
        {date}
      </h4>
      <h3 className="text-[1.3125rem] mb-2.5 text-black dark:text-white text-opacity-80">
        {title}
      </h3>
      <p className="text-base mb-8 text-black dark:text-white font-primary text-[1.0625rem] max-w-[43.0625rem] text-opacity-80">
        {description}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="border border-buttons-green font-secondary font-medium px-16 text-sm rounded-full py-5 text-buttons-green"
      >
        Read more
      </a>
    </div>
  );
};

export default Blog;
