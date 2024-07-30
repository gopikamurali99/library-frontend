
import { useLoaderData } from "react-router-dom";
import homeImage from "../images/homeImage2.jpg"
import mukund from "../images/mukundhan.jpeg"
import meera from "../images/kr.jpeg"
import madavi from "../images/madhavikuty.jpeg"
import aboutImage from "../images/homeImage1.jpg"
import "../style.css"

const Images = [
  mukund,
  meera,
  madavi,
  
];

export async function loader() {
  try{
   const [authorResponse, bookResponse] = await Promise.all([
    fetch(`https://library-backend-xnel.onrender.com/author`),
    fetch(`https://library-backend-xnel.onrender.com/book`)
]);
console.log(import.meta.env.VITE_API_BASE_URL);
if (!authorResponse.ok || !bookResponse.ok) {
  console.error('Error fetching authors:', await authorResponse.text());
  throw new Error('Failed to fetch data from the API');
}
if (!bookResponse.ok) {
  console.error('Error fetching books:', await bookResponse.text());
  throw new Error('Failed to fetch books');

}
const author = await bookResponse.json();
const books = await authorResponse.json();
return { author, books };
}

catch(error){
  console.error('Error:', error);
        throw error;
}
}
const Home = () => {
    const {author}= useLoaderData()
    console.log(author)
  return(
      <>
<main>
  <section>
    <div className="image-container">
       <img src={homeImage} alt="Main image" className="mainimage" />
       <div className="text-overlay"> 
         <h1>Welcome to Word Wander</h1>
         <h3>Your Gateway to Infinite Stories</h3>
       </div>
   </div>


   </section>
    {/* About Us Section */}
    <section className="about-us">
          <div className="about-content">
            <img src={aboutImage} alt="About Us" className="about-image" />
            <div className="about-description">
              <h2>About Us</h2>
              <p>
                Welcome to Word Wander, where we believe in the power of stories to connect, inspire, and transform. Our mission is to provide a platform where readers can discover a diverse range of books and authors, and where authors can share their stories with the world. Join us on this journey of exploration and imagination!
              </p>
            </div>
          </div>
        </section>
  <section className="authorsectionstyle">
    <h2>Popular Authors</h2>
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

)
}


export default Home;
