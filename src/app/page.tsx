import { getPosts } from "@/utils/api";

import HomeContent from "@/components/HomeContent";

export default async function Home() {
  const response = await getPosts();
  return (
    <>
      <HomeContent data={response.data} />
    </>
  );
}
