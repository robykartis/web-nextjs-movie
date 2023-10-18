import React from 'react'

async function getDataId() {
    const url = await fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US')

}
export default function MovieId({ params }: { params: { id: string } }) {
    return (
        <div>Hello {params.id}</div>
    )
}
