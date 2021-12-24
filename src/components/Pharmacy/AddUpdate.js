import React, { Component, useEffect } from 'react';

import { Col, Spinner, Image, Button, FormControl, Form, Nav, Navbar, Alert, Row } from 'react-bootstrap'

import '../../assets/CSS/bootstrap.min.css'
import axios from 'axios'
import { logDOM } from '@testing-library/dom';


class AddUpdatePharmacy extends Component {
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
    //  medicineImage: this.initialImage,
    //   imageFile: null,
       imageValue: null,
      progressVisibility: "invisible",
      id: id,
      meta_data: {
            address: "",
            founder: "",
            image_url: this.initialImage,
            latitude: "",
            longitude: "",
            name: "",
            phone_number: "",
            status: "" },
    auth:{
        phone_number: "",
        password: ""
    }

    }
    this.onImageChangeHandler = this.onImageChangeHandler.bind(this);
    this.onSubmitListener = this.onSubmitListener.bind(this);
    this.onTextChangeHandler = this.onTextChangeHandler.bind(this);

    this.meta_data = {...this.state.meta_data};


    if (id && this.count === 1) {
      var url = "https://api.hellometbd.com/pharmacy?id=" + id;
      console.log(url);
      axios.get(url)
        .then(result => {
          console.log("response.data");

          var pharmacy = result.data[0];
          console.log(pharmacy.meta_data);
          this.setState({
            meta_data: {
                name: pharmacy.meta_data.name,
                address: pharmacy.meta_data.address,
                founder: pharmacy.meta_data.founder,
                image_url: pharmacy.meta_data.image_url,
                latitude: pharmacy.meta_data.latitude,
                longitude: pharmacy.meta_data.longitude,
                phone_number: pharmacy.meta_data.phone_number,
                status: pharmacy.meta_data.status
            },
            auth:{
                phone_number: pharmacy.auth.phone_number,
                password: pharmacy.auth.password
            }

          })
          //this.medicineData = {...this.state.medicine};
          //console.log("this.state.meta_data.name")
          //console.log(this.state.meta_data.name)
        }

        )
        .catch(function (error) {
          // handle error
          // console.log(error);
        })
      console.log(++this.count);
    }
    //this.addMedicine = this.addMedicine.bind(this);
    this.updatePharmacy = this.updatePharmacy.bind(this);

  }


  onTextChangeHandler(event) {
    var component = event.target.name;
    var value = event.target.value
    //var medicineField = ["name", "image_url", "price", "brand", "features", "indication", "description"];

    var meta_data = {...this.state.meta_data}
    console.log("meta_data[component]");
    console.log(meta_data[component]);
    console.log("mData[component]");

    meta_data[component] = value;

    if (component==="phone_number") {

        var auth = {...this.state.auth}
        auth.phone_number = value;
        this.setState({
            meta_data: {
            ...meta_data
          },
          auth: auth
        })
    }else{
        this.setState({
            meta_data: {
            ...meta_data
          }
        })
    }
  }

  onSubmitListener(event) {

    console.log(this.state.medicine);
    if (this.state.progressVisibility === "invisible") {
        this.setState({ progressVisibility: "visible" });
       
        
      if (this.state.id) {
        //Perform Update
        const imageurl = this.state.meta_data.image_url;
        if (imageurl.includes("https:")) {
          console.log("Image is not Changed, using existing image url");
          this.updatePharmacy(this.state.id, this.state.meta_data, this.state.auth); 

        } else {
          console.log("Image Changed need to Upload first to generate image url");
          const formData = new FormData();
          formData.append("uploadImage", this.state.imageFile, this.state.imageFile.name);
          axios.post("https://api.hellometbd.com/uploadImageToGenarateUrl/", formData)
            .then(response => {

              var meta_data = {...this.state.meta_data}
              meta_data.image_url = "https://"+response.data.url;
              this.setState({
                meta_data: {
                  ...meta_data
                }
              })
              console.log("this.state.auth");
              console.log(this.state.auth);
              this.updatePharmacy(this.state.id, this.state.meta_data, this.state.auth);
            })
    
        }

        

      } else {
        //Perform Add

        // const formData = new FormData();
        // formData.append("uploadImage", this.state.imageFile, this.state.imageFile.name);
        // axios.post("https://hellometbd.com/uploadImageToGenarateUrl/", formData)
        //   .then(response => {
        //     console.log(response);
        //     // const { name, price, brand, features, indication, description } = this.medicineData;
        //     // this.medicineData = {
        //     //   name,
        //     //   image_url: "https://"+response.data.url,
        //     //   price,
        //     //   brand,
        //     //   features,
        //     //   indication,
        //     //   description
        //     // };

        //     var mData = {...this.state.medicine}
        //     mData.image_url = "https://"+response.data.url;
        //     this.setState({
        //       medicine: {
        //         ...mData
        //       }
        //     })

        //     this.addMedicine(response, this.state.medicine);
        //   })
      }
    }


  }

  onImageChangeHandler(event) {
    this.setState({ imageFile: event.target.files[0] });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        //this.setState({medicineImage : reader.result, imageValue: event.target.value});

        var meta_data = {...this.state.meta_data}
        meta_data.image_url = reader.result;
        this.setState({
            meta_data: {
            ...meta_data
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

  updatePharmacy(id, meta_data, auth) {
    console.log(this.state.meta_data.image_url);
    var pharmacy = {_id: id, meta_data: meta_data, auth: auth};
    console.log("pharmacy");
    console.log(pharmacy);
    axios.patch("https://api.hellometbd.com/pharmacy/"+id, pharmacy)
    .then(result=>{
      console.log(result);
      this.setState({ progressVisibility: "invisible" });
      alert("Pharmacy Update Successfully.")
    }).catch(function (error) {
      // handle error
      console.log(error);
      this.setState({ progressVisibility: "invisible" });
    })
  }
//   addMedicine(response, medicineData) {
//     //console.log(this.state.medicine);
//     axios.post("https://hellometbd.com/medicine/", { meta_data: medicineData })
//       .then(res => {
//         console.log(response);
//         this.setState({
//           medicineImage: this.initialImage,
//           imageFile: null,
//           imageValue: null,
//           progressVisibility: "invisible",
//           medicine: { name: "", image_url: "", price: "", brand: "", features: "", indication: "", description: "" }
//         });
//         this.inputRef.current.value = '';
//         alert("Medicine Upload Successfully.")
//         //alert(this.state.medicine.name)
//       })
//       .catch(function (error) {
//         // handle error
//          console.log(error);
//        this.setState({ progressVisibility: "invisible" });
//       })
//   }

  render() {

    return (

      <div >

        <div >

          <Form >
            <Form.Group controlId="formBasicImage" className="ml-auto justify-content-center">

              <Form.Control className={["mx-auto", "mt-5", "border border-primary"]}
                style={{ width: '700px' }} type="file" onChange={this.onImageChangeHandler}
                value={this.state.imageValue} ref={this.inputRef} />

              <div className="d-flex justify-content-center">
                <Image style={{ height: "350px", width: "350px" }}
                  src={this.state.meta_data.image_url} />
              </div>

            </Form.Group>

            <Form.Group controlId="name">
              <Form.Control
                as="textarea" rows={1}
                name="name"
                className={["mx-auto", "mt-1"]} style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="text" placeholder="Pharmacy Name"
                value={this.state.meta_data.name} />

            </Form.Group>

            <Form.Group controlId="founder">
              <Form.Control
                as="textarea" rows={1}
                name="founder"
                className="mx-auto" style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="text" placeholder="Founder"
                value={this.state.meta_data.founder} />
            </Form.Group>

            <Form.Group controlId="latitude">
              <Form.Control
                as="textarea" rows={1}
                name="latitude"
                className="mx-auto" style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="text" placeholder="Latitude"
                value={this.state.meta_data.latitude} />
            </Form.Group>

            <Form.Group controlId="longitude">
              <Form.Control
                as="textarea" rows={1}
                name="longitude"
                className="mx-auto" style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="text" placeholder="Longitude"
                value={this.state.meta_data.longitude} />
            </Form.Group>


            <Form.Group controlId="phone_number">
              <Form.Control
                as="textarea" rows={1}
                name="phone_number"
                className="mx-auto"
                onChange={this.onTextChangeHandler}
                style={{ width: '700px' }}
                type="text" placeholder="Phone Number"
                value={this.state.meta_data.phone_number} />
            </Form.Group>
            
            <Form.Group controlId="password">
              <Form.Control
                as="textarea" rows={1}
                name="password"
                className="mx-auto"
                onChange={(event)=>{
                    var auth = {...this.state.auth}
                    auth.password = event.target.value;
                    this.setState({auth: auth})
                }}
                style={{ width: '700px' }}
                type="text" placeholder="password"
                value={this.state.auth.password} />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Control
                as="textarea" rows={1}
                name="address"
                className={["mx-auto", "mt-0"]}
                onChange={this.onTextChangeHandler}
                style={{ width: '700px' }}
                type="text" placeholder="Address"
                value={this.state.meta_data.address} />
            </Form.Group>



            <fieldset style={{ width: '700px' }} className="mx-auto">
    <Form.Group as={Row} >
      <Form.Label as="legend" column sm={2} style={{width:"100%"}}>
        <b>Status</b>
      </Form.Label>
      <Col  sm={10}  className="d-flex my-auto align-items-center justify-centent-center">
        <Form.Check 
          type="radio"
          label="On"
          name="formHorizontalRadios"
          id="On"
          onClick={()=>{
              var meta_data = {...this.state.meta_data}
              meta_data.status = "On"
              this.setState({meta_data:meta_data})
              console.log(this.state.meta_data);
        }}
          checked={this.state.meta_data.status==="On"}
        />
        <Form.Check
        className="ml-3"
          type="radio"
          label="Off"
          name="formHorizontalRadios"
          id="Off"
          onClick={()=>{
            var meta_data = {...this.state.meta_data}
            meta_data.status = "Off"
            this.setState({meta_data:meta_data})
            console.log(this.state.meta_data);
      }}
          checked={this.state.meta_data.status==="Off"}
        />
      </Col>
    </Form.Group>
  </fieldset>


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
            {this.state.id !== null ? "Update Pharmacy" : "Add Pharmacy"}
          </Button>
        </div>

      </div>

    );
  }

}

export default AddUpdatePharmacy;;