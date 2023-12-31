import { Metadata } from "next";
import { Trending } from "./../../interface";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Movie",
  description: "Generated by home",
};

async function getData() {
  const url = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.THEMOVIEDATABASE_API as string,
      },
      next: {
        revalidate: 10,
      },
    }
  );
  return url.json();
}
export default async function Movie() {
  const data: Trending = await getData();
  // console.log(data)
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h1 className="mb-4 text-3xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Welcome to WEB - ABC - Home
          </h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {data.results.map((movie) => (
            <Card key={movie.id} className="flex flex-col overflow-hidden">
              <Link href={`/movie/${movie.id}`}>
                <CardContent className="group relative block h-48  md:h-64">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Image Baner"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 "
                    height={500}
                    width={500}
                  />
                </CardContent>
              </Link>
              <CardFooter>
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h2 className="mb-3  text-lg font-semibold">
                    <Link
                      href={`/movie/${movie.id}`}
                      className=" transition dutation-100 hover:text-teal-500 active:text-teal-600"
                    >
                      {movie.title}
                    </Link>
                  </h2>
                  <p className="text-gray-500 line-clamp-3">{movie.overview}</p>
                </div>
              </CardFooter>
            </Card>

            // <div className="flex flex-col overflow-hidden rounded-lg bg-white">
            //     <Link href={`/movie/${movie.id}`} className="group relative block h-48 bg-gray-100 md:h-64">

            //     </Link>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
}
