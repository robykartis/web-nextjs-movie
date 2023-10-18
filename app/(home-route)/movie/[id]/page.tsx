export const dynamic = "force-dynamic";

import { db } from "@/app/db";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/components/SubmitButton";

async function getData(id: string) {
  const data = await db.comment.findMany({
    where: {
      movieId: id,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return data;
}
async function postData(formData: FormData) {
  "use server";
  const data = await db.comment.create({
    data: {
      message: formData.get("comment") as string,
      movieId: formData.get("id") as string,
    },
  });
  revalidatePath(`/movie/[id]`);
}
export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return (
    <div className="">
      <h1>Your Opinion</h1>
      <div className="">
        <form action={postData}>
          <div className="grid w-full gap-2">
            <Textarea name="comment" placeholder="Type your message here." />
            <Input type="hidden" name="id" value={params.id} />
            <SubmitButton />
          </div>
        </form>
        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post) => (
            <div key={post.id} className="flex flex-col gap-y-3">
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
