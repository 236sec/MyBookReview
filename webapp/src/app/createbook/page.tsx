"use client"
import { FormEvent } from "react";


export default function FormCreateBook() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/books', {
          method: 'POST',
          body: formData,
        })
     
        // Handle response if necessary
        const data = await response.json()
        console.log(data);
        // ...
    }
    return (
        <div>
            <form onSubmit={onSubmit} >
                <label>
                    Title:
                    <input type="text" name="title" />
                </label>
                <label>
                    Author:
                    <input type="text" name="author" />
                </label>
                <label>
                    Published Date:
                    <input type="text" name="publishedDate" />
                </label>
                <label>
                    ISBN:
                    <input type="text" name="isbn" />
                </label>
                <label>
                    Page Amount:
                    <input type="number" name="pageAmount" />
                </label>
                <label>
                    Picture URL:
                    <input type="text" name="pictureUrl" />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}