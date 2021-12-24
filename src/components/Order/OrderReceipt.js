import React, { useState } from 'react';
import { Col, Image, Row, Table } from 'react-bootstrap';
import headerImage from '../../Image/header.png'
import footerImage from '../../Image/footer.PNG'

const OrderRowItem = ({ position, name, quantity, sub_total }) => {
    return (
        <tr>
            <td style={{alignItems:'center', textAlign:'center' , maxWidth: "50px"}} colSpan='.5'>
                {position}
            </td >
            <td style={{alignItems:'center', textAlign:'center', maxWidth:"100px"}} colSpan='1.5'>
               {name}
            </td>
            <td style={{alignItems:'center', textAlign:'center'}} colSpan='1'>
                {quantity}
            </td>
            <td  style={{alignItems:'center', textAlign:'center'}} colSpan='1'>
                {sub_total} Tk
</td>
        </tr>


    )
}

const OrderItemTableView = ({ order, orderPosition }) => {
    var position = 0;
    var orderPrice = 0;

    console.log(order)

    //  for (let index = 0; index < order.items.length; index++) {
    //     const item = order.items[index];
    //      orderPrice = orderPrice+ parseInt(item.sub_total);
    //}

    return (

        <tr style={{ padding: '0px', margin: '0px' }} >

            <td  style={{alignItems:'center', textAlign:'center'}}>{orderPosition}</td>

            <table border="1"  height="100%" width="100%" style={{tableLayout:'fixed', marginTop:'1px'}}>

                <thead>

                    <tr >
                    <th style={{alignItems:'center', textAlign:'center', width: "100px"}} colSpan='.5'>Items</th>

                         <th style={{alignItems:'center', textAlign:'center' }} colSpan='1.5'>
                            Order Id: {order._id}
                        </th>
                        <th style={{alignItems:'center', textAlign:'center'}}colSpan='1'>
                            Status: {order.meta_data.status}
                        </th>
                        <th style={{alignItems:'center', textAlign:'center'}} colSpan='1'>
                            Order Price: {orderPrice}
                        </th>
                    </tr>
                    
                </thead>

                <tbody>
                <tr>
                        

                        <td style={{fontWeight: 600, alignItems:'center', textAlign:'center', maxWidth: "50px"}} colSpan='.5'>Sc. No.</td>
                        <td style={{fontWeight: 600, alignItems:'center', textAlign:'center'}}  colSpan='1.5'>Medicine Name</td>
                        <td style={{fontWeight: 600, alignItems:'center', textAlign:'center'}} colSpan='1' >Quantity</td>
                        <td style={{fontWeight: 600, alignItems:'center', textAlign:'center'}} colSpan='1' >Sub Total</td>
                    </tr>

                    
                        {
                            order.items ?
                                (
                                    order.items.map(item => (
                                        <OrderRowItem className="mb-0 mt-0"
                                            position={++position}
                                            name={item.name}
                                            quantity={item.quantity}
                                            sub_total={item.sub_total}
                                        />
                                    ))
                                ) :
                                (
                                    <OrderRowItem className="mb-0 mt-0"
                                        position={++position}
                                        name={order.prescriptionImageUrls[0].substring(34, order.prescriptionImageUrls[0].length)}
                                        quantity={1}
                                        sub_total={order.meta_data.total_price}
                                    />
                                )
                        }
                    
                </tbody>

            </table>
           
                         
        </tr>
    )
}

const OrderReceipt = ({ orders, from, to }) => {
    console.log("orders4check");
    console.log(orders.length);
    orders = ((orders.length>0) && orders.filter(order=>order.meta_data.status==="Completed"))

    var position = 0;
    var totalPrice = 0;
    for (let index = 0; index < orders.length; index++) {
        const element = orders[index];
        totalPrice = totalPrice + parseFloat(element.meta_data.total_price);
        console.log(totalPrice);
    }
    
    return (
<div className="page-container">
{console.log("orders2Check")}
    {console.log(orders.length)}
    
{orders.length>0?(
    <div>

<header className="header">
                <Image 
        src={headerImage} />
                </header>



<div className="mainbody" style={{ marginLeft: 50, marginRight: 50 }}>


    <Row style={{ marginBottom: 10, marginLeft: 0 }}>

        <Col>
            <p className="mb-1 mt-2" style={{ fontSize: 30 }}><i>Pharmacy Info:</i></p>
            <p className="mb-0 mt-0 d-flex">
                <p className="mr-1 mb-0 mt-0"
                    style={{ fontWeight: 600 }}>Id: </p>
                {orders[0].meta_data.pharmacy_id}
            </p>

            <p className="mb-0 mt-0 d-flex">
                <p className="mr-1 mb-0 mt-0"
                    style={{ fontWeight: 600 }}>Name: </p>
                {orders[0].meta_data.pharmacy_name}
            </p>

            <p className="mb-0 mt-0 d-flex">
                <p className="mr-1 mb-0 mt-0"
                    style={{ fontWeight: 600 }}>Phone: </p>
                {orders[0].meta_data.pharmacy_phone_number}
            </p>

            <p className="mb-0 mt-0 d-flex">
                <p className="mr-1 mb-0 mt-0"
                    style={{ fontWeight: 600 }}>Address: </p>
                {orders[0].meta_data.pharmacy_address}
            </p>
        </Col>

        <Col>
            <p className="mb-1 mt-2" style={{ fontSize: 30 }}><i>Bill Receipt Info:</i></p>

            <p className="mb-0 mt-0 d-flex">
                <p className="mr-1 mb-0 mt-0"
                    style={{ fontWeight: 600 }}>From: </p>
                {from}
            </p>
            <p className="mb-0 mt-0 d-flex">
                <p className="mr-1 mb-0 mt-0"
                    style={{ fontWeight: 600 }}>To: </p>
                {to}
            </p>
            <p className="mb-0 mt-0 d-flex">
                <p className="mr-1 mb-0 mt-0"
                    style={{ fontWeight: 600 }}>Status: </p>
            Paid
        </p>
            <p className="mb-0 mt-0 d-flex">
                <p className="mr-1 mb-0 mt-0"
                    style={{ fontWeight: 600 }}>Date: </p>
            Date
        </p>
        </Col>
    </Row>

    <table border="1" cellSpacing="0" width="100%" style={{tableLayout:'auto'}}>
        <thead >
            <tr>
                <th style={{alignItems:'center', textAlign:'center', maxWidth: "50px"}} colSpan="1" width= "50px">Sc. No.</th>
                <th style={{alignItems:'center', textAlign:'center', maxWidth: "50px"}} colSpan="4">Orders</th>
            </tr>
        </thead>

        <tbody className="mb-0 mt-0">
            {console.log("order check")}
            {orders.map(order => (
                <OrderItemTableView order={order} orderPosition={++position} />
            ))}

            
        </tbody>
    </table>
    
    <table style={{tableLayout:'fixed', width:'100%', height:"100%"}}>
            <td width="150px" colSpan="1"></td>
            <td colSpan="1"></td>
            <td colSpan="1"></td>
            
        <td style={{ textAlign: 'center', paddingTop:5, paddingBottom:5}} colSpan="1">
            <b className="mr-1">Total Price: {totalPrice} Tk</b>
            </td>
            </table>   
            <div MaxHeight="842px"></div>
            

</div>

<Image style={{ width: "100%" , height:200, marginTop:50}}
        src={footerImage} />
        </div>
):(
    <p style={{marginTop:50,  display:'flex', justifyContent:'center', alignItems:'center'}}>No Completed Order Found</p>
)

}

</div>
    );
};

export default OrderReceipt;