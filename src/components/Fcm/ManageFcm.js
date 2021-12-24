import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Spinner, Image, Button, FormControl, Form, Nav, Navbar, Alert } from 'react-bootstrap'

const ManageFcm = () => {

    const [tokens, setTokens]= useState([]);
    const [title, setTitle] = useState();
    const [message, setMessage]= useState();
    const [progressVisibility, setProgressVisibility] = useState("invisible");

    const handleTextChange = (event) =>{
        var name = event.target.name;
        var value = event.target.value;
        if (name==="title") {
            setTitle(value);
        }else if(name === "message"){
            setMessage(value);
        }
    }


useEffect(()=>{
    var allTokens = []
    axios.get("https://api.hellometbd.com/fcm/")
    .then((response)=>{
        response.data.map(fcmData=>allTokens.push(fcmData.token));
        setTokens(allTokens);
        // console.log(allTokens);
    })
    .catch((error)=>{
        console.log(error);
    })
},[])

    return (
        <div className="d-flex justify-content-center">
            <div>
                <h3 style={{textAlign:'center'}}>Send Push Notification to All Subscribers</h3>
                <p className="mt-5">Title: </p>

                <Form.Group controlId="name">
                <Form.Control
                as="textarea" rows={1}
                name="title"
                className={["mx-auto", "mt-1"]} style={{ width: '700px' }}
                onChange={(e)=>handleTextChange(e)}
                type="text" placeholder="Notification Title"
                />
                </Form.Group>

                <p className="mt-3">Message: </p>

                <Form.Group controlId="name">
                <Form.Control
                as="textarea" rows={2}
                name="message"
                className={["mx-auto", "mt-1"]} style={{ width: '700px' }}
                onChange={(e)=>handleTextChange(e)}
                type="text" placeholder="Notification Message"
                />
                </Form.Group>

                <br></br>
                
                <div className="d-flex justify-content-center">
                <Spinner className={["mb-3", "mr-3", progressVisibility]} animation="grow" role="status">
                    <span className={["sr-only"]}>Loading...</span>
                </Spinner>
                <Button
                    className={"mb-5"}
                    variant="primary"
                    type="submit" style={{ width: '500px' }}
                    onClick={() => handleSubmit(title, message, tokens, setProgressVisibility)}
                >
                Send Notification
                </Button>
                </div>

            </div>
        </div>
    );
};

const handleSubmit = (title, message, tokens,setProgressVisibility)=>{
console.log("handele Submit");
    var notification= {
        title: title,
        body: message,
        tokens:tokens
    }
    console.log(notification);
    setProgressVisibility("visible");
    axios.post("https://api.hellometbd.com/fcm/send", notification)
    .then((response)=>{
        console.log(response.data);
        setProgressVisibility("invisible");
        alert("Notification has been Sent to all subscribers");
    })
    .catch((error)=>{
        console.log(error);
        setProgressVisibility("invisible");
    })
}

export default ManageFcm;