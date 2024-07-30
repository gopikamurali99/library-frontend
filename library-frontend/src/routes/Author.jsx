import React from 'react';
import { useLoaderData } from 'react-router-dom';
import mukund from "../images/mukundhan.jpeg"
import meera from "../images/kr.jpeg"
import madavi from "../images/madhavikuty.jpeg"
import "../style.css"
const Images = [
    mukund,
    meera,
    madavi,
    
  ];
  export async function loader() {
     
     const [authorResponse, bookResponse] = await Promise.all([
      fetch(`https://library-backend-xnel.onrender.com/author`),
      fetch(`https://library-backend-xnel.onrender.com/book`)
  ]);
  const author = await bookResponse.json();
  const books = await authorResponse.json();
  return { author, books };
  }
const Author = ()=>{
    const {author}= useLoaderData()
    console.log(author)
  return(
    <>
    <main>
        <section>
            <h1> Authors </h1>
            <div className="authorcontainer">
    <ul>{
        author.slice(3,6).map((author,index) => {
            return(
               <li key={author._id} className="author-card">
                <img src={Images[index]} alt="author picture" /><p>{author.AuthorName}</p></li>
            )
        })
     }
        
    </ul>
      
    </div>
        </section>
    
     

  
    </main>
    </>
)}

export default Author;