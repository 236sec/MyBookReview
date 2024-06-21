"use client"
import { FormEvent,useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'


export default function FormCreateBook() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
        router.push('/')
        }
    }, [status, router])
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/reviews', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={onSubmit} className="text-black" >
                <label>
                    ISBNBook:
                    <input type="text" name="isbn" />
                </label>
                <label>
                    Rating:
                    <input type="number" name="rating" />
                </label>
                <label>
                    Comment:
                    <input type="text" name="comment" />
                </label>
                <label>
                    Published:
                    <select name="published" id="published">
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}