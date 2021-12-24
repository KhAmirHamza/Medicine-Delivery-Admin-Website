import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import SliderListView from './SliderListView';
import NavBar from '../Nav';
const ManageSlider = () => {

    const [sliders, setSliders] = useState([]);


    useEffect(()=>{
        axios.get("https://api.hellometbd.com/slider/")
        .then(function (response) {
            setSliders(response.data);
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
        var url = "https://api.hellometbd.com/slider?title="+searchText;
        console.log(url);
        console.log(searchText);
          axios.get(url)
          .then(function (response) {
              setSliders(response.data);   
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

     const deleteSlider = (id) => {
         console.log("Delete slider called");
         axios.delete("https://api.hellometbd.com/slider/"+id)
        .then(result =>{
            setSliders(sliders.filter(slider=>slider._id!==id))
            alert("Slider data is Deleted!")
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
            <SliderListView  sliders={sliders} deleteSlider={deleteSlider}/>
        </div>
    );
};

export default ManageSlider;