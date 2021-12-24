import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import PharmacyListView from './PharmacyListView';
import NavBar from '../Nav';

const ManagePharmacy = () => {

    const [pharmacies, setPharmacies] = useState([]);


    useEffect(()=>{
        axios.get("https://api.hellometbd.com/pharmacy/")
        .then(function (response) {
            setPharmacies(response.data);
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
        var url = "https://api.hellometbd.com/pharmacy?name="+searchText;
        console.log(url);
        console.log(searchText);
          axios.get(url)
          .then(function (response) {
              setPharmacies(response.data);   
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

     const deletePharmacy = (id) => {
         console.log("Delete pharmacy is called.");
         axios.delete("https://api.hellometbd.com/pharmacy/"+id)
        .then(result =>{
            setPharmacies(pharmacies.filter(pharmacy=>pharmacy._id!==id))
            alert("Pharmacy is Deleted!")
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
            <PharmacyListView  pharmacies={pharmacies} deletePharmacy={deletePharmacy}/>
        </div>
    );
};

export default ManagePharmacy;