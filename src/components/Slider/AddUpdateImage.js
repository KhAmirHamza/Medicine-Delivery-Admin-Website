import React, { useEffect, useState } from 'react';
import { Col, Spinner, Image, Button, FormControl, Form, Nav, Navbar, Alert } from 'react-bootstrap'
import axios from 'axios'

const AddUpdateImage = (props) => {
    console.log(window.location.pathname); //yields: "/js" (where snippets run)
    
    const search = props.location.search;
    const params = new URLSearchParams(search);
    var sliderId = params.get('id');
    console.log(sliderId);
    var initialImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrAEipSEShIt7lJoztnqGhC6fPMH2SvXvHQ&usqp=CAU";

    const[imageFile, setImageFile] = useState(null)
    const [sliderImage, setSliderImage] = useState(initialImage);
    const [progressVisibility, setProgressVisibility] = useState(false);
    const [id, setId] = useState(sliderId);
    // if (id===null && params.get('id')) {
    //   console.log("Id available");
    //   setId(params.get('id'));
    // }
    console.log("check id");
    console.log(sliderId);
    const [title, setTitle] = useState("");

    var inputRef = React.createRef();


    const onImageChangeHandler = (event)=> {
        setImageFile(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setSliderImage( reader.result);
          }
        }
        if (event.target.files[0] && event.target.files[0].type.match('image.*')) {
          reader.readAsDataURL(event.target.files[0]);
        }
      }


const onSubmitListener = (event)=> {

        // console.log(this.state.medicine);
         if (progressVisibility === false) {
             setProgressVisibility(true)
             //console.log(this.medicineData);
             
           if (sliderId) {
             //Perform Update
             console.log("Perform Update");
             
             if (sliderImage.includes("https:")) {
               console.log("Image is not Changed, using existing image url");
               console.log("Updated Slider title: ");
                   console.log(title);
                   console.log("Updated ID: ");
                   console.log(sliderId);


                 var slider = {title: title, image_url: sliderImage}

                 updateSlider(sliderId, slider); 
     
             } else {
               console.log("Image Changed need to Upload first to generate image url");
               const formData = new FormData();
               formData.append("uploadImage", imageFile, imageFile.name);
               axios.post("https://api.hellometbd.com/uploadImageToGenarateUrl/", formData)
                 .then(response => {
     
                   
                   console.log("Slider Updated.");
                   var image_url = response.data.url;
                   setSliderImage(image_url);
                   var slider = {title: title, image_url: image_url}

                   updateSlider(sliderId, slider);
                 })
         
             }
     
             
     
           } else {
             //Perform Add
     
             const formData = new FormData();
             formData.append("uploadImage", imageFile, imageFile.name);
             axios.post("https://api.hellometbd.com/uploadImageToGenarateUrl/", formData)
               .then(response => {
                 console.log(response);

                 var image_url = response.data.url;
                 setSliderImage(image_url);
                 var slider = {title: title, image_url: image_url}
                 addMedicine(response, slider);
               })
           }
    } 
}

const updateSlider = (id, slider_data)=> {
    console.log(slider_data.image_url);
    //var slider = {_id: id, data: slider_data};

    console.log(" Now Update Slider");
    console.log(slider_data);
    console.log("id");
    console.log(id);
    axios.patch("https://api.hellometbd.com/slider/"+id, slider_data)
    .then(result=>{
      console.log(result);
      setProgressVisibility(false);
      alert("Slider Update Successfully.")
    }).catch(function (error) {
      // handle error
      setProgressVisibility(false);
      console.log(error);
    })
  }

const addMedicine = (response, slider)=> {
        console.log(slider);
        axios.post("https://api.hellometbd.com/slider/", slider)
          .then(res => {
            console.log(response);
             setProgressVisibility(false);
             setImageFile(null)
             setSliderImage(initialImage)
            //inputRef.current.value = '';
            alert("Slider Add Successfully.")
          })
          .catch(function (error) {
            // handle error
             console.log(error);
             setProgressVisibility(false);
          })
      }


const onTextChangeHandler = (event) => {
        var component = event.target.name;
        var value = event.target.value
      }


      useEffect(()=>{
        var url = "https://api.hellometbd.com/slider?id=" + sliderId;
        console.log(url);
        axios.get(url)
          .then(result => {
            console.log("result.data");
            console.log(result.data[0]);
            var slider = result.data[0];
            setId(slider.id)
            setSliderImage(slider.data.image_url);
            setTitle(slider.data.title);
          }
  
          )
          .catch(function (error) {
            // handle error
            // console.log(error);
          })
      },[]);

    return (
        <div>
            <Form.Group controlId="formBasicImage" className="ml-auto justify-content-center">
              <Form.Control className={["mx-auto", "mt-5", "border border-primary"]}
                style={{ width: '700px' }} type="file" onChange={(event)=>onImageChangeHandler(event)}
                //value={imageFile}
                //   ref={inputRef} 
                 />

              <div className="d-flex justify-content-center">
                <Image style={{ height: "350px", width: "350px" }}
                  src={sliderImage} />
              </div>

            </Form.Group>

            <Form.Group controlId="title">
              <Form.Control
                as="textarea" rows={1}
                name="title"
                className={["mx-auto", "mt-1"]} style={{ width: '700px' }}
                onChange={(e)=>setTitle(e.target.value)}
                type="text" placeholder="Slider Image Titile"
                value={title} />

            </Form.Group>

            <div className="d-flex justify-content-center">
          <Spinner className={["mb-3", "mr-3", progressVisibility===true? "Visible":"invisible"]} animation="grow" role="status">
            <span className={["sr-only"]}>Loading...</span>
          </Spinner>
          <Button
            className={"mb-5"}
            variant="primary"
            type="submit" style={{ width: '500px' }}
            onClick={onSubmitListener}
          >
            {sliderId? "Update Slider" : "Add Slider"}
          </Button>
        </div>
        </div>
    );
};

export default AddUpdateImage;