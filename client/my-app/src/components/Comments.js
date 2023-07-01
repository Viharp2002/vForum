import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userPic from "../images/user.png";
import Spinner from "../components/Spinner";
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Comments() {
    const {_id} = useParams();
    const usNavigate = useNavigate();
    
    const[doubt,setDoubt] = useState([]);
    const[answer,setAnswer] = useState([]);
    const[commentUname,setCommentUname] = useState();
    const[spin1,setSpin1] = useState(false);
  const[spin2,setSpin2] = useState(false);
 
     const fetchDetailsOfDoubt = async()=>{
    setSpin1(true);
        try {
            const res = await fetch(`http://localhost:3490/fetchDoubt/${_id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });

            const data = await res.json();
            setDoubt(data);

            if (res.status===201) {
              setTimeout(() => {
                setSpin1(false);
              }, 1000);
            } else {
                alert(data.message);
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
      fetchDetailsOfDoubt();
     },[])



     const[comment,setComment] = useState({
        desc:""
     });

     let name,value;
     const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setComment({...comment,[name]:value});
     }

     let token = localStorage.getItem("token");
     const commentPosting = async()=>{
      setSpin2(true);
         const{desc} = comment;

         try {
            const res = await fetch(`http://localhost:3490/commentPosting/${_id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": token
                },
                body:JSON.stringify({
                    desc
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
                desc:""
              })
            }else{
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
                setTimeout(() => {
                  setSpin2(false);
                }, 1000);
            }
         } catch (error) {
            console.log(error);
            setSpin2(false);
         }
     }



     const fetchComments = async()=>{
        try {
            const res = await fetch(`http://localhost:3490/commentGetting/${_id}`,{
              method:"GET",
              headers:{
                "Content-Type":"application/json"
              }
            });
      
            const data = await res.json();
            setAnswer(data);
      
            if (res.status===201) {
            } else {
            }
          } catch (error) {
            console.log(error);
          }
     }
     useEffect(()=>{
      fetchComments(); 
      },[])
     const fetchCommentsWithUname = async()=>{
        try {
            const res = await fetch(`http://localhost:3490/commentGettingWithUname/${_id}`,{
              method:"GET",
              headers:{
                "Content-Type":"application/json"
              }
            });
      
            const data = await res.json();
            setCommentUname(data);
      
            if (res.status===201) {
            } else {
              
            }
          } catch (error) {
            console.log(error);
          }
     }
     useEffect(()=>{     
        fetchCommentsWithUname();
      },[])
       
  return (
    <>
    <div className='container my-4'>
    {
        doubt.map((elem)=>{
            return <div className="jumbotron">
            <h1 className="display-4">{elem.question}</h1>
           <p className="lead">{elem.desc}</p>
           <hr className="my-4"/>
           <p>This is a peer-to-peer forum please keep it friendly. Be courteous and respectful. Appreciate that others may have an opinion different from yours. Stay on topic. Share your knowledge.Refrain from demeaning, discriminatory, or harassing behaviour and speech.</p>
           <p className="lead">
               <a className="btn btn-primary btn-lg" target='_blank' href={`https://en.wikipedia.org/wiki/${elem.question} error`} role="button">Learn more about problem</a>
           </p>
          {answer.length>0 ? <h4>Posted by: {commentUname}</h4> : "" }
         </div>
        })
      }
    </div>
      <div className='container'>
        <h1>Post your answer</h1>

        {
          spin1 && <Spinner/>
        }
        {
          !spin1 &&
        <form method='POST'>
            <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">Your answer...</label>
            <textarea className="form-control" onChange={handleInputs} value={comment.desc} name='desc' id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type='button' onClick={commentPosting} className='btn btn-primary'>Submit</button>

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
      <h1 className='py-2'>Expert's answers</h1>
       {
        spin2 && <Spinner/>
       }

      {
       !spin2 && answer.length>0 ? answer.map((elem)=>{
           return  <div className="media my-3">
           <img className="mr-3" src={userPic} width="54px" alt="Generic placeholder image"/>
           <div className="media-body">
             <h5 className="mt-0"><u>{commentUname}</u></h5>
              {elem.desc}
           </div>
        </div>
        }) : <div class="jumbotron jumbotron-fluid">
              <div class="container">
                <h1 class="display-4">No answers are there!!</h1>
                <p class="lead">Be the first person to answer</p>
              </div>
            </div>
     }
    </div>
    </>
  )
}

export default Comments
