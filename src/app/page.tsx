import { getPosts } from "@/utils/api";

import HomeContent from "@/components/HomeContent";

export default async function Home() {
  const posts = await getPosts({ maxPosts: 12 });

  return (
    <section className="container mx-auto my-9">
      <header>
        <h1 className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center mb-9 capitalize">
          minimal blog
        </h1>
      </header>

      <main className="mx-4 md:mx-8">
        <section className="flex flex-col my-12">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Share Your Insights with the World
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
            We believe in the power of ideas. Where technology meets innovation,
            and passion fuels progress, we create opportunities that inspire
            change and drive lasting impact.
          </p>
          <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            type="button"
            className="max-w-[150px] mb-5 px-3 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-600"
          >
            Add New Post
          </button>
        </section>

        <div className="flex flex-col ">
          <section className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 md:gap-15">
            {posts !== null &&
              Object.keys(posts).map((article) => (
                <HomeContent {...posts[article]} key={article} />
              ))}
          </section>
        </div>
      </main>
    </section>
  );
}
