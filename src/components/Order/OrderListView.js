import React, {useState } from 'react';
import { Col, ListGroup, Row, Image, Collapse, Button, Form } from 'react-bootstrap';


const OrderItem = ({ item }) => {


    return (
        <div className="order-item" style={{ width: 1000 }}>
            <Row>
                <Col>
                    <p className="mb-0 mt-0 ml-auto" style={{ fontSize: 20 }}><b>{item.name}</b></p>
                    <p className="mb-0 mt-0" >{item.features}</p>
                </Col>

                <Col className="ml-auto d-flex">
                    <p className="mb-0 mt-0 ml-auto" ><b>{item.medicine_id}</b></p>
                </Col>
            </Row>
            <div className="d-flex">
                <p className="mb-0 mt-0" style={{ fontSize: 20 }}>{item.brand}</p>
                <p className="mb-0 mt-0 ml-auto" >{item.price} Tk || {item.quantity} Pcs || SubTotal: {item.sub_total} Tk</p>
            </div>
        </div>
    );
}


const OrderListItem = ({ order }) => {

    const [collapse, setCollapse] = useState(false)

    return (
        <div className="list-order-item" style={{ width: 1050 }}>

            <div className="center ">
                <Row className="center d-flex">
                    <Col className="center d-block ">
                        <p className="mb-1 mt-2" style={{ fontSize: 25 }}><i>Order Info:</i></p>


                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Order id:</p> {order._id}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Order status:</p> {order.meta_data.status}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Order Price:</p> {order.meta_data.total_price}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Order time:</p> {order.meta_data.created_at}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Payment method:</p> {order.meta_data.payment_method}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Payment status:</p> {order.meta_data.payment_status}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Client requirements:</p> {order.meta_data.requirement}
                        </p>


                    </Col>

                    <Col className="ml-auto d-block">

                        <p className="mb-1 mt-2 " style={{ fontSize: 25 }}><i>Pharmacy Info:</i></p>

                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Pharmacy id:</p> {order.meta_data.pharmacy_id}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Pharmacy name:</p> {order.meta_data.pharmacy_name}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Pharmacy adsress:</p> {order.meta_data.pharmacy_address}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Pharmacy phone number:</p> {order.meta_data.pharmacy_phone_number}
                        </p>


                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="mb-1 mt-2" style={{ fontSize: 25 }}><i>Client Info:</i></p>

                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Client id:</p> {order.meta_data.user_id}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Client name:</p> {order.meta_data.user_name}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Client phone number:</p> {order.meta_data.user_phone_number}
                        </p>

                    </Col>

                    <Col>
                        <p className="mb-1 mt-2" style={{ fontSize: 25 }}><i>Rider Info:</i></p>

                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Rider id:</p> {order.meta_data.deliveryman_id}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Rider name:</p> {order.meta_data.deliveryman_name}
                        </p>
                        <p className="mb-0 mt-0 d-flex">
                            <p className="mr-1 mb-0 mt-0" style={{ fontWeight: 600 }}>Rider phone number:</p> {order.meta_data.deliveryman_phone_number}
                        </p>

                    </Col>
                </Row>



            </div>
            <div className="circle mt-4 mb-5">
                <Button className="mr-5" variant="outline-info" style={{width:250}} onClick={() => setCollapse(!collapse)}>View Order Items</Button>
                {/* <Button className="mr-5" variant="outline-success" style={{width:250}} >Edit Order</Button> */}
                <Button  variant="outline-danger" style={{width:250}}  disabled>Delete Order</Button>
            </div>
            <Collapse className="mb-0 mt-1 mb-3"  in={collapse}>
                <div id="example-collapse-text">
                    {

                        //console.log(order)
                        //order.items.map((item)=>(

                        //var orderItem = {...item}


                        order.items ? (
                            order.items.map(item =>
                                //<h1>{item}</h1>
                                // console.log(item)
                                <OrderItem item={item} />
                            )
                        ) : (
                            <Image className={["mx-auto", "mt-1",]} style={{ height: "200px", width: "200px", display: "flex" }}
                                src={order.prescriptionImageUrls[0]} />
                            // <p>{order.items[0].features}</p>
                            //console.log(order)
                        )




                        //    )
                        //    )

                    }
                </div>
            </Collapse>
        
        </div>
    );
}

const OrderListView = ({orders,handleSelect, selectedList}) => {


    const onSelect = (value, index)=>{
        selectedList[index] = value;
        handleSelect(selectedList)
        console.log("selectedList.length");
        console.log(selectedList.length);
        console.log(selectedList);
        console.log("index");
        console.log(index);
    }

    return (
        <div >
            
            {
                <ListGroup className="center" style={{ width: 1050 }}>
                    {
                     
                   orders.map(((order, index) => (

                            <div className="d-flex align-items-center">
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" style={{transform:"scale(2)"}}
                                     
                                     checked={selectedList[index]}
                                     onClick={
                                        (event)=> onSelect(event.target.checked, index)}
                                    />
                                </Form.Group>
                                <OrderListItem order={order} />
                            </div>
                            
                        ))) 
                    }
                </ListGroup>
            }
        </div>
    );
};

export default OrderListView;