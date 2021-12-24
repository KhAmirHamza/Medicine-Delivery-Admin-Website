import React, { Component, useEffect } from 'react';

import { Col, Spinner, Image, Button, FormControl, Form, Nav, Navbar, Alert, Row } from 'react-bootstrap'

import '../../assets/CSS/bootstrap.min.css'
import axios from 'axios'

class UpdateUser extends Component {
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
       imageValue: null,
      progressVisibility: "invisible",
      id: id,
      meta_data: {
        name: "",
        email: "",
        image_url: this.initialImage,
        phone_number: ""
        },
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
      var url = "https://api.hellometbd.com/user?id=" + id;
      console.log(url);
      axios.get(url)
        .then(result => {
          console.log("response.data");

          var rider = result.data[0];
          console.log(rider.meta_data);
          this.setState({
            meta_data: {
                name: rider.meta_data.name,
                email: rider.meta_data.email,
                image_url: rider.meta_data.image_url,
                phone_number: rider.meta_data.phone_number
            },
            auth:{
                phone_number: rider.auth.phone_number,
                password: rider.auth.password
            }
          })
        }

        )
        .catch(function (error) {
          // handle error
          // console.log(error);
        })
      console.log(++this.count);
    }
    this.updateUser = this.updateUser.bind(this);

  }


  onTextChangeHandler(event) {
    var component = event.target.name;
    var value = event.target.value

    var meta_data = {...this.state.meta_data}
    console.log("meta_data[component]");
    console.log(meta_data[component]);

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
          this.updateUser(this.state.id, this.state.meta_data, this.state.auth); 

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
              this.updateUser(this.state.id, this.state.meta_data, this.state.auth);
            })
        }
      } else {
        //Perform Add
      }
    }


  }

  onImageChangeHandler(event) {
    this.setState({ imageFile: event.target.files[0] });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {

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

  updateUser(id, meta_data, auth) {
    console.log(this.state.meta_data.image_url);
    var user = {_id: id, meta_data: meta_data, auth: auth};
    console.log("user");
    console.log(user);
    axios.patch("https://api.hellometbd.com/user/"+id, user)
    .then(result=>{
      console.log(result);
      this.setState({ progressVisibility: "invisible" });
      alert("User Update Successfully.")
    }).catch(function (error) {
      // handle error
      console.log(error);
      this.setState({ progressVisibility: "invisible" });
    })
  }

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

            <Form.Group controlId="email">
              <Form.Control
                as="textarea" rows={1}
                name="email"
                className="mx-auto" style={{ width: '700px' }}
                onChange={this.onTextChangeHandler}
                type="text" placeholder="Email"
                value={this.state.meta_data.email} />
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
            {this.state.id !== null ? "Update User" : "Add User"}
          </Button>
        </div>

      </div>

    );
  }

}

export default UpdateUser;;