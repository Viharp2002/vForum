import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userPic from "../images/user.png";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LangCompo(props) {
  const usNavigate = useNavigate();

  const {techname} = useParams();
  
  const[tempo,setTempo] = useState([]);
  const[spin1,setSpin1] = useState(false);
  const[spin2,setSpin2] = useState(false);

  const doubtGetting = async()=>{
    setSpin1(true);
    try {
      const res = await fetch(`http://localhost:3490/doubtGetting/${techname}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });

      const data = await res.json();
      setTempo(data);

      if (res.status===201) {
        setTimeout(() => {
          setSpin1(false);
        }, 1000);
      } else {
        alert("no");
        setTimeout(() => {
          setSpin1(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setSpin1(false);
    }

  }
   useEffect(()=>{
  doubtGetting();
   },[])


  const[doubt,setDoubt] = useState({
    question:"",desc:""
  });

  let name,value;
  const handleInputs = (e)=>{
     name = e.target.name;
     value = e.target.value;

     setDoubt({...doubt,[name]:value});
  }
  const token = localStorage.getItem("token");
   
  const doubtPosting = async()=>{
      setSpin2(true);
     const{question,desc} = doubt;
     try {
      const res = await fetch(`http://localhost:3490/doubtPosting`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": token
        },
        body:JSON.stringify({
          question,desc,techname
        })
      });

      const data = await res.json();

      if (res.status===201) {
        setTimeout(() => {
          setSpin2(false);
        }, 1000);
        setTimeout(() => {
          toast.success("Doubt added successfully");
        }, 2000);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        setDoubt({
          question:"",desc:""
        })
      } else {
        setTimeout(() => {
          setSpin2(false);
        }, 1000);
        if (data.message==="Error") {
          setTimeout(() => {
            toast.error("Login required");
          }, 2000);
          setTimeout(() => {
            usNavigate("/login");
          }, 3000);
        }else{
          setTimeout(() => {
            setSpin2(false);
          }, 1000);
          setTimeout(() => {
            toast.error(data.message);
          }, 2000);
        }
        setDoubt({
          question:"",desc:""
        })
      }
     } catch (error) {
      console.log(error);
      setSpin2(false);
     }
  }
 
  return (
    <>
    <div className='container my-4'>
    <div className="jumbotron">
      <h1 className="display-4">{techname} Language Forum</h1>
      <p className="lead">“Coding is the language of the future, and every girl should learn it. As I've learned from watching girls grow and learn in our classrooms, coding is fun, collaborative and creative.”</p>
      <hr className="my-4"/>
      <p>This is a peer-to-peer forum please keep it friendly. Be courteous and respectful. Appreciate that others may have an opinion different from yours. Stay on topic. Share your knowledge.Refrain from demeaning, discriminatory, or harassing behaviour and speech.</p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" target='_blank' href={`https://en.wikipedia.org/wiki/${techname}`} role="button">Learn more</a>
      </p>
    </div>
    </div>

    <div className='container'>
      <h1>Start discussion</h1>
      {
        spin2 && <Spinner/>
      }
      {
      !spin2 && <form method='POST'>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Problem Statement</label>
          <input type="text" onChange={handleInputs} value={doubt.question} name='question' className="form-control" id="exampleFormControlInput1" placeholder="Problem Statement"/>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Problem's detailed description</label>
          <textarea className="form-control" onChange={handleInputs} value={doubt.desc} name='desc' id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type='button' onClick={doubtPosting} className='btn btn-success btn-lg'>Submit</button>

        <ToastContainer  
         position="top-center"
         autoClose={2000}
         newestOnTop
         closeOnClick={true}
         rtl={false}
         draggable
         pauseOnHover={false}
         theme="colored"/> 
        </form>
      }
    </div>

    <div className='container'>
      <h1 className='py-2'>Browse Questions</h1>

      {
        spin1 && <Spinner/>
      }
      {
       !spin1 && tempo.length>0 ? tempo.map((elem)=>{
           return  <div className="media my-3" style={{cursor:"pointer"}} onClick={()=>{usNavigate(`/comments/${elem._id}`)}}>
           <img className="mr-3" src={userPic} width="54px" alt="Generic placeholder image"/>
           <div className="media-body">
             <h5 className="mt-0"><u>{elem.question}</u></h5>
              {elem.desc}
           </div>
        </div>
        }) : <div class="jumbotron jumbotron-fluid">
              <div class="container">
                <h1 class="display-4">No questions are there!!</h1>
                <p class="lead">Be the first person to ask in this category</p>
              </div>
            </div>
     }
    </div>
    </>
  )
}

export default LangCompo
