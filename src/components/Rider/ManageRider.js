import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import RiderListView from './RiderListView';
import NavBar from '../Nav';
const ManageRider = () => {

    const [riders, setRiders] = useState([]);


    useEffect(()=>{
        axios.get("https://api.hellometbd.com/rider/")
        .then(function (response) {
            setRiders(response.data);
        })
        .catch(function (error) {
            // handle error
           // console.log(error);
        })
        .then(function () {
            // always executed
        })
     },[]);

     const handleUserSearch = (searchText) => {
        console.log("handle Search");
        var url = "https://api.hellometbd.com/rider?name="+searchText;
        console.log(url);
        console.log(searchText);
          axios.get(url)
          .then(function (response) {
              setRiders(response.data);   
              console.log("response.data");
              console.log(response.data);   
          })
          .catch(function (error) {
              // handle error
             // console.log(error);
          })
          .then(function () {
              // always executed
          })
    
          console.log("searchText");
          console.log(searchText);

      }

     const deleteRider = (id) => {
         console.log("delete rider called");
         axios.delete("https://api.hellometbd.com/rider/"+id)
        .then(result =>{
            setRiders(riders.filter(rider=>rider._id!==id))
            alert("Rider is Deleted!")
        })
        .catch(error=> {
            console.log(error);
     });
    }



    return (
        <div>
            <NavBar/>
            <Form inline className="d-flex justify-content-center">
                <FormControl type="text" placeholder="Search" className="mr-sm-2 " style={{width:500}}
                onChange={(e)=>handleUserSearch(e.target.value)}
                />
                <Button variant="outline-info" style={{width:150}}>Search</Button>
            </Form>
            <RiderListView  riders={riders} deleteRider={deleteRider}/>
        </div>
    );
};

export default ManageRider;