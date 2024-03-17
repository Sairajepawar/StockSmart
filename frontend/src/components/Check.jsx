import { useState,useEffect } from "react";
import { Outlet,useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import { useAuth } from "./Auth";
import { Navigate } from "react-router-dom";
 function Check()
{
    const [auth,setAuth]=useAuth()
    const [customError,setCustomError]=useState()
    const [ok,setOk]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>
    {

        const authCheck= async ()=>
        {
            try
            {
                const response=await axios.get('http://localhost:3000/auth',{
                    headers:
                    {
                        "Authorization":auth.token
                    }
                })
                if(response.data.ok===true)
                setOk(true)
            
            }
            catch(error)
            {
                
                console.log(error)
            }
        }

        if(auth.token)
        {
            authCheck()
        }

    },[auth.token])

    //!any error  then please pass auth.token here

    return ok===true ? <Outlet/> :<Spinner/>
}

//! if any error happens then make the path as ""

export  {Check}



