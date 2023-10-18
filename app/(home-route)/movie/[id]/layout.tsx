import { Movie } from "@/app/interface";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

async function getDataId(id: string) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: process.env.THEMOVIEDATABASE_API as string,
      },
      next: {
        revalidate: 60,
      },
    }
  );
  return url.json();
}
export default async function MovieId({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const data: Movie = await getDataId(params.id);
  return (
    <div className="container p-3">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.overview}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            alt="Image Baner"
            className="object-cover rounded-lg w-full"
            height={100}
            width={500}
          />
        </CardContent>
      </Card>
      <div className="w-full text-center p-3">
        <h1 className="text-3xl font-bold">{data.title}</h1>
      </div>
      <div className="flex gap-x-10 font-bold">
        <Card className="w-1/2">
          <CardContent className="mt-5">
            <h1>
              <span className="underline">Homepage:</span>
              <Link href={data.homepage} target="_blank">
                Link
              </Link>
            </h1>
            <h1>
              <span className="underline">Laguage:</span>
              {data.original_language}
            </h1>
            <p>
              <span className="underline">Overview:</span>
              {data.overview}
            </p>
            <p>
              <span className="underline">Release Date:</span>
              {data.release_date}
            </p>
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardContent className="mt-5">
            <div className=" font-semibold">{children}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
