import React, { useEffect, useState } from 'react';
import {Link, useHistory} from "react-router-dom"


const SignIn = ({handleAuthAndNavigation}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    const navigateProgramatically = (e) => {
        //e.preventDefault();
        handleAuthAndNavigation(true, "/home")
        history.push("/home")
        console.log("navigateProgramatically");
        // this.context.router.transitionTo(e.target.href)
      }
    const handleChange = (event)=>{
        var name = event.target.name;
        var value = event.target.value;
        console.log(name+"  "+value);
        if (name === "email") {
            setEmail(value)
            
        }else if (name === "password") {
            setPassword(value)
        }   
    }
  
    return (
        <div style={{display:'flex', justifyContent: 'center'}}>
            <div >

            <p>Email:</p>
            <input name="email" onChange={(event) => handleChange(event)}></input>

            <p className="mt-3">Password</p>
            <input name="password" onChange={(event) => handleChange(event)}></input>
            <br></br>
            <br></br>
            {/* <button onClick={()=>email==="abcd" && password === "p"?history.push("/home"):{} */}
            <button onClick={(e)=>email==="abcd" && password === "p"?
             navigateProgramatically(e) : alert("Email or Password does not matched!")}>
                Log in
            </button>
           
        </div>
        </div>
    );
};

export default SignIn;