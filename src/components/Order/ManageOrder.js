import React, { useEffect, useState } from 'react';
import { Col, Form, Row,  Button, FormControl, Navbar } from 'react-bootstrap';
import axios from 'axios'
import OrderListView from './OrderListView';
import { Link } from 'react-router-dom'
import NavBar from '../Nav';


const ManageOrder = ({dataList, handleData}) => {
   // const [order, setOrder] = useState()
    const [orderOwner, setOrderOwner] = useState();
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [ownerId, setOwnerId] = useState(null);
    const [selectedList, setSelectedList] = useState([])

    const handleMultipleDelete = () =>{
        const filteredOrderIds = [];
        dataList.map((order, index)=> selectedList[index]===true? filteredOrderIds.push(order._id):{});
        console.log(filteredOrderIds);

        if (filteredOrderIds.length> 0) {
            var url = "https://api.hellometbd.com/order/";
            console.log(url);
            console.log(filteredOrderIds);
            var ids = {"ids":filteredOrderIds};
            var ids2 = {"ids":["O9803861524", "O9522106183"]}
            console.log(ids);
            console.log(ids2);
            axios.delete(url, { data: ids })
            .then(function (response) {
                console.log(response);
                console.log("orders deleted");
                alert("Orders Deleted..!")
                handleGetOrders();
                
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            })
        }else{
            alert("Please select at least one to delete")
        }
    }


    const handleSelect = (selectedList) => {
        setSelectedList(selectedList);
        console.log("selectedList");
        console.log(selectedList);

    }

    const handleFilter = (e)=> {

        if (orderOwner && fromDate && toDate && ownerId) {

            var ownerQueryName= null;
            if(orderOwner && orderOwner==="Select"){
                ownerQueryName = null;
            }
            else if(orderOwner && orderOwner==="User"){
                ownerQueryName = "user_id"
            }
            else if(orderOwner && orderOwner==="User"){
                ownerQueryName = "user_id"
            }
            
            else if(orderOwner && orderOwner==="Pharmacy"){
                ownerQueryName = "pharmacy_id"
            }
            else if(orderOwner && orderOwner==="Rider"){
                ownerQueryName = "deliveryman_id"
            }
            if (ownerQueryName) {
                console.log("ownerQueryName");
                console.log(ownerQueryName);
            }

            var from = new Date(fromDate).toLocaleDateString()
        var to = new Date(toDate).toLocaleDateString()
        var url = "https://api.hellometbd.com/order/range?from_date="+from+"&"+ownerQueryName+"="+ownerId+"&to_date="+to;
            console.log(url);

            axios.get(url)
            .then(function (response) {
                console.log("filter.data");
                handleData(response.data);  
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            })
        }else{
            //handleGetOrders()
        }
    }

    const handleGetOrders = ()=>{
        axios.get("https://api.hellometbd.com/order/all/")
                .then(function (response) {
                    // handle success
                    handleData(response.data);
                    for (let index = 0; index < response.data.length; index++) {
                        selectedList[index] = false;
                    }
                    setSelectedList(selectedList)
                })
                .catch(function (error) {
                    // handle error
                    // console.log(error);
                })
                .then(function () {
                    // always executed
                })
    }
        useEffect(() => {
            handleGetOrders();
        }, []);

    return (
        <div >
            <NavBar/>
            <Row className="center-y order-search" style={{display:'flex',justifyContent: 'center',paddingLeft:"5px", paddingTop:10, paddingBottom: 10, paddingRight:5}}>
                <Col md={1.5} >
                <p className="my-auto mr-3 ml-3" style={{fontSize:'20px', marginLeft:0}}>Filter Order : </p>
                </Col>
                <Col className="center-y" md={2.5}>
                <p className="my-auto"  style={{fontSize:'20px', marginRight:"10px"}}>From:</p>
                <Form.Group className="my-auto"  controlId="dob">
                            <Form.Control  style={{width:170}} type="date" name="dob" placeholder="Date of Birth"
                            value={fromDate}
                            onChange={(e)=>setFromDate(e.target.value)} 
                            />
                        </Form.Group>
                </Col>
                
                <Col className="center-y ml-3" md={2.5}>
                <p className="center-y" style={{fontSize:'20px', marginRight:"10px"}}>To:</p>
                <Form.Group className="my-auto" controlId="dob">
                            <Form.Control  type="date" name="dob" placeholder="Date of Birth" style={{width:170}} 
                            value={toDate}
                            onChange={(e)=>setToDate(e.target.value)} 
                            />
                        </Form.Group>
                </Col>

                <Col className="center-y ml-3" md={2.5}>
               {/* <Form.Group className="d-flex" controlId="exampleForm.ControlSelect1"> */}
               <p className="center-y d-flex" style={{fontSize:'20px', marginRight:"10px", width:50}}>For:</p>
                    <Form.Control as="select" 
                    value={orderOwner}
                    onChange={(e)=>setOrderOwner(e.target.value)} 
                    >
                        <option>Select</option>
                        <option>User</option>
                        <option>Pharmacy</option>
                        <option>Rider</option>
                    </Form.Control>
                {/* </Form.Group> */}
                </Col>

                <Col className="center-y ml-3" md={2.5}>
                <p className="center-y" style={{fontSize:'20px', marginRight:"10px"}}>Id:</p>
                <FormControl type="text" placeholder="U1234567890" className="mr-sm-2" style={{width:150}}
                value={ownerId}
                onChange={(e)=>setOwnerId(e.target.value)} 
                />
                <Button  variant="outline-info" style={{width:150}} onClick={(e)=>{handleFilter(e)}}>Filter</Button>
                </Col>

            </Row>
            <div className="d-flex justify-content-center" md={2.5}>
                
                <Button variant="outline-warning" style={{width:200, marginRight:10}} onClick={(e)=>{handleGetOrders()}}>Reset</Button>
                <Button variant="outline-danger" style={{width:200, marginRight:10}} onClick={(e)=>{handleMultipleDelete()}}>Delete Selected</Button>
                
                <Link className="navlink" to="/order/receipt">
                <Button variant="outline-primary" style={{width:200}} orders={dataList}>Generate Receipt</Button>
                </Link>
                </div>
            {(dataList.length>0)&&<OrderListView orders={dataList} handleSelect={handleSelect} selectedList={selectedList}/>}
        </div>
    );
};

export default ManageOrder;