"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type TPostProps = {
  id: string;
  title: string;
  body: string;
};

function HomeContent({ id, title, body }: TPostProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [shouldClamp, setShouldClamp] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight,
      );
      const maxHeight = lineHeight * 3; // Maximum height for 3 lines

      if (textRef.current.scrollHeight > maxHeight) {
        setShouldClamp(true);
      }
    }
  }, [body]);

  return (
    <section
      key={id}
      className="mx-auto flex flex-col justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <section className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p
          ref={textRef}
          className={`font-normal text-gray-700 dark:text-gray-400 ${shouldClamp ? "line-clamp-3" : ""}`}
        >
          {body}
        </p>
      </section>

      <Link
        href="#"
        className="mt-5 px-3 max-w-[100px] py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-600"
      >
        Read more
      </Link>
    </section>
  );
}

export default HomeContent;
