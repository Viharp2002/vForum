import React, { useEffect, useState } from 'react';
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import {useNavigate,Link} from "react-router-dom";
import Spinner from "../components/Spinner";

function Home() { 
  const[tech,setTech] = useState([]);
  const[spin,setSpin] = useState(false);
  const usNavigate = useNavigate();

  const fetchTechnologies = async()=>{
    try {
      setSpin(true);
      const res = await fetch("http://localhost:3490/techShow",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
      }
      });

      const data = await res.json();
      setTimeout(() => {
        setSpin(false);
      }, 1000);
      setTech(data);
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchTechnologies();
  },[])

  //Search Bar
  const handleSearch = (e)=>{

    // darek box no same class 'search'
    const namesFromdom = document.getElementsByClassName("search");
    const ifnotfound = document.getElementById("found");

    
        // Je value tya type thai hase e
        const {value} = e.target;
         
        // Compare karava lowercase ma fervyu
        const searchQuery = value.toLowerCase();
        var count = 0;
        
        // darek boxt mate check karse
        for(const nameElement of namesFromdom)
        {
            // for loop ma je particular class ek-ek karine avse eni andar na textContent(aa textcontent ma eni andar na badha sub-div avi gaya) ne lowercase ma fervse
            let name = nameElement.textContent.toLocaleLowerCase();
            
            // banne value ne check karse
            
            if(name.includes(searchQuery) || searchQuery==="")
            {
                count=1;                    
                nameElement.style.display = "block";
                ifnotfound.style.visibility = "hidden";    
            }
            else{
                nameElement.style.display = "none";
            }
        }

        if(count===0)
        {
            ifnotfound.style.visibility = "visible";
        }
}
  return (
    <>
    {/* Carousel */}
     <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active item">
            <img src={image3} className="d-block w-100" alt="image"/>
            </div>
            <div className="carousel-item item">
            <img src={image2} className="d-block w-100" alt="images"/>
            </div>
            <div className="carousel-item item">
            <img src={image1} className="d-block w-100" alt="images"/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div> 
         
        <hr></hr>

        {/* Searchbar */}
        <div className="search-box">
            <input className="search-input" onInput={handleSearch} name='search' type="text" placeholder="Search something.."/>
            <button disabled className="search-btn"><i className="fas fa-search"></i></button>
        </div>

      {/* Cards */}
      <section>
  <div className="container flow-content">
    <center><h2 className=" my-4">Find your Technology</h2></center>
    <h3 className="pd-4 text-center my-4" id="found">Oops...Language not found. Please Type exact name of language</h3>
    {
      spin && <Spinner/>
    }
<div className="col-md-12">
       <div className='row'>
       {
         !spin &&  tech.map((elem)=>{
          return <div onClick={()=>{usNavigate(`/langCompo/${elem.techname}`)}} className="col-md-4 card my-4 search" style={{width: "18rem",borderColor:"black"}}>
           <center><img src={`https://source.unsplash.com/600x100/?coding,${elem.techname}`} className="card-img-top my-4 vihu" alt="/"/></center>
           
           <div className="card-body">
              <center><h4>{elem.techname}</h4>
              <h6>{elem.techfounder}</h6></center>
             
             <Link to={`/langCompo/${elem.techname}`}  className="btn btn-primary my-4">Explore</Link>
           </div>
         </div>
             
        })
       }
       </div>
       </div>
  </div>
</section>
    </>
  )
}

export default Home
