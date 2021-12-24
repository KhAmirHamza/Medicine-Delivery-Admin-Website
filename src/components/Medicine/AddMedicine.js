import React, { Component, useEffect } from 'react';

import { Col, Spinner, Image, Button, FormControl, Form, Nav, Navbar, Alert } from 'react-bootstrap'
// import '../assets/CSS/bootstrap.min.css'
import axios from 'axios'
import { logDOM } from '@testing-library/dom';


class AddMedicine extends Component {
  count = 1;

  initialImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrAEipSEShIt7lJoztnqGhC6fPMH2SvXvHQ&usqp=CAU";
  inputRef = React.createRef();
  constructor(props) {
    super();
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('id');

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      medicineImage: this.initialImage,
      imageFile: null,
      imageValue: null,
      progressVisibility: "invisible",
      medicine: { name: "", image_url: this.initialImage, price: "", brand: "", features: "", indication: "", description: "" },
      id: id
    }
    this.onImageChangeHandler = this.onImageChangeHandler.bind(this);
    this.onSubmitListener = this.onSubmitListener.bind(this);
    this.onTextChangeHandler = this.onTextChangeHandler.bind(this);
   // this.medicineData = { name: "", image_url: this.state.medicine.image_url, price: "", brand: "", features: "", indication: "", description: "" };
    this.medicineData = {...this.state.medicine};


    //OneSignal.initialize('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', options);

    console.log("props");
    console.log(this.state.id);


    if (id && this.count === 1) {
      var url = "https://api.hellometbd.com/medicine?id=" + id;
      console.log(url);
      axios.get(url)
        .then(result => {
          console.log("response.data");

          var medicine = result.data;
          console.log(medicine.meta_data
          );
          this.setState({
            medicine: {
              name: medicine.meta_data.name,
              image_url: medicine.meta_data.image_url,
              price: medicine.meta_data.price,
              brand: medicine.meta_data.brand,
              features: medicine.meta_data.features,
              indication: medicine.meta_data.indication,
              description: medicine.meta_data.description
            }
          })
          this.medicineData = {...this.state.medicine};
          console.log("this.state.medicine.name")
          console.log(this.state.medicine.name)
        }

        )
        .catch(function (error) {
          // handle error
          // console.log(error);
        })
      console.log(++this.count);
    }
    this.addMedicine = this.addMedicine.bind(this);
    this.updateMedicine = this.updateMedicine.bind(this);

  }


  getMedicineData(id) {
    //console.log(++this.count);


  }




  onTextChangeHandler(event) {
    var component = event.target.name;
    var value = event.target.value
    //var medicineField = ["name", "image_url", "price", "brand", "features", "indication", "description"];

    var mData = {...this.state.medicine}
    console.log("mData[component]");
    console.log(mData[component]);
    console.log("mData[component]");

    mData[component] = value;
    this.setState({
      medicine: {
        ...mData
      }
    })
  }

  onSubmitListener(event) {

   // console.log(this.state.medicine);
    if (this.state.progressVisibility === "invisible") {
        this.setState({ progressVisibility: "visible" });
        console.log(this.medicineData);
        
      if (this.state.id) {
        //Perform Update
        console.log("Perform Update");
        const imageurl = this.state.medicine.image_url;
        if (imageurl.includes("https:")) {
          console.log("Image is not Changed, using existing image url");
          console.log("Updated Medicine Data: ");
              console.log(this.state.medicine);
              console.log("Updated ID: ");
              console.log(this.state.id);
          this.updateMedicine(this.state.id, this.state.medicine); 

        } else {
          console.log("Image Changed need to Upload first to generate image url");
          const formData = new FormData();
          formData.append("uploadImage", this.state.imageFile, this.state.imageFile.name);
          axios.post("https://api.hellometbd.com/uploadImageToGenarateUrl/", formData)
            .then(response => {

              var mData = {...this.state.medicine}
              mData.image_url = response.data.url;
              //mData.image_url = "https://api."+response.data.url;
              this.setState({
                medicine: {
                  ...mData
                }
              })
              console.log("Updated Medicine Data: ");
              console.log(mData);
              this.updateMedicine(this.state.id, mData);
            })
    
        }

        

      } else {
        //Perform Add

        const formData = new FormData();
        formData.append("uploadImage", this.state.imageFile, this.state.imageFile.name);
        axios.post("https://api.hellometbd.com/uploadImageToGenarateUrl/", formData)
          .then(response => {
            console.log(response);
            // const { name, price, brand, features, indication, description } = this.medicineData;
            // this.medicineData = {
            //   name,
            //   image_url: "https://"+response.data.url,
            //   price,
            //   brand,
            //   features,
            //   indication,
            //   description
            // };

            var mData = {...this.state.medicine}
            mData.image_url = response.data.url;
            this.setState({
              medicine: {
                ...mData
              }
            })

            this.addMedicine(response, this.state.medicine);
          })
      }
    }


  }

  onImageChangeHandler(event) {
    this.setState({ imageFile: event.target.files[0] });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        //this.setState({medicineImage : reader.result, imageValue: event.target.value});

        var mData = {...this.state.medicine}
        mData.image_url = reader.result;
        this.setState({
          medicine: {
            ...mData
          }
        })
      }
    }
    if (event.target.files[0] && event.target.files[0].type.match('image.*')) {
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  handleSubmit(event) {

    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.current.files[0].name}`
    );
  }

  updateMedicine(id, medicineData) {
    console.log(this.state.medicine.image_url);
    var medicine = {_id: id, meta_data: medicineData};

    console.log("Now Update");
    console.log("medicine");
    console.log(medicine);
    console.log("id");
    console.log(id);
    axios.patch("https://api.hellometbd.com/medicine/"+id, medicine)
    .then(result=>{
      console.log(result);
      this.setState({ progressVisibility: "invisible" });
      alert("Medicine Update Successfully.")
    }).catch(function (error) {
      // handle error
     // this.setState({ progressVisibility: "invisible" });
      console.log(error);
    })
  }
  addMedicine(response, medicineData) {
    //console.log(this.state.medicine);
    axios.post("https://api.hellometbd.com/medicine/", { meta_data: medicineData })
      .then(res => {
        console.log(response);
        this.setState({
          medicineImage: this.initialImage,
          imageFile: null,
          imageValue: null,
          progressVisibility: "invisible",
          medicine: { name: "", image_url: "", price: "", brand: "", features: "", indication: "", description: "" }
        });
        this.inputRef.current.value = '';
        alert("Medicine Upload Successfully.")
        //alert(this.state.medicine.name)
      })
      .catch(function (error) {
        // handle error
         console.log(error);
       this.setState({ progressVisibility: "invisible" });
      })
  }

  render() {

    function myClick(params) {
      // <Alert show={"show"} variant="success"></Alert>
      alert(params)
    }

    return (

      <div >
        <div style={{ height: "1000px" }}>
          <Form >
            <Form.Group controlId="formBasicImage" className="ml-auto justify-content-center">

              <Form.Control className={["mx-auto", "mt-5", "border border-primary"]}
                style={{ width: '700px' }} type="file" onChange={this.onImageChangeHandler}
                value={this.state.imageValue} ref={this.inputRef} />

              <div className="d-flex justify-content-center">
                <Image style={{ height: "350px", width: "350px" }}
                  src={this.state.medicine.image_url} />
              </div>

            </Form.Group>

            <Form.Group controlId="name">
              <Form.Control
                as="textarea" rows={1}
                name="name"
                className={["mx-auto", "mt-1"]} style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="text" placeholder="Medicine Name"
                value={this.state.medicine.name} />

            </Form.Group>

            <Form.Group controlId="price">
              <Form.Control
                as="textarea" rows={1}
                name="price"
                className="mx-auto" style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="number" placeholder="Medicine Price"
                value={this.state.medicine.price} />
            </Form.Group>


            <Form.Group controlId="brand">
              <Form.Control
                as="textarea" rows={1}
                name="brand"
                className="mx-auto"
                onChange={this.onTextChangeHandler}
                style={{ width: '700px' }}
                type="text" placeholder="Medicine Brand"
                value={this.state.medicine.brand} />
            </Form.Group>

            <Form.Group controlId="features">
              <Form.Control
                as="textarea" rows={2}
                name="features"
                className={["mx-auto", "mt-0"]}
                onChange={this.onTextChangeHandler}
                style={{ width: '700px' }}
                type="text" placeholder="Medicine Feature"
                value={this.state.medicine.features} />
            </Form.Group>



            <Form.Group controlId="indication">
              <Form.Control className={["mx-auto", "mt-0"]}
                as="textarea" rows={3}
                name="indication"
                style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="text" placeholder="Medicine Indication"
                value={this.state.medicine.indication} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Control
                as="textarea" rows={5}
                name="description"
                className="mx-auto"
                style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="text" placeholder="Medicine Description"
                value={this.state.medicine.description}
              />

            </Form.Group>




          </Form>
        </div>


        <div className="d-flex justify-content-center">
          <Spinner className={["mb-3", "mr-3", this.state.progressVisibility]} animation="grow" role="status">
            <span className={["sr-only"]}>Loading...</span>
          </Spinner>
          <Button
            className={"mb-5"}
            variant="primary"
            type="submit" style={{ width: '500px' }}
            onClick={this.onSubmitListener}
          >
            {this.state.id !== null ? "Update Medicine" : "Add Medicine"}
          </Button>
        </div>

      </div>

    );
  }


}

export default AddMedicine;;