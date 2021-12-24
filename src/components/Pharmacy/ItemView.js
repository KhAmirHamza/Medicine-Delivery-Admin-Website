import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, ListGroup, Row, Image, Collapse, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemView = ({pharmacy, deletePharmacy}) => {
    const [showDeleteAlart, setShowDeleteAlart] = useState(false);

    return (
        <ListGroup.Item className="container-listitem">
        <Container >
            <Row >
                {/* xs={6} */}
                <Col md={4}>
                    <Image className={["mx-auto", "mt-1",]} style={{ height: "200px", width: "200px", display: "flex" }}
                        src={pharmacy.meta_data.image_url} />
                </Col>

                {/* xs={12} */}
                <Col md={8}>
                    <label className="mb-0 mt-0" >Name: </label>
                    <p className="mb-0 mt-0" style={{ fontSize: 25 }}>{pharmacy.meta_data.name}</p>
                    <label className="mb-0 mt-0" >Founder: {pharmacy.meta_data.founder}</label>
                    {/* <p className="mb-0 mt-0">{pharmacy.meta_data.founder}</p> */}
                    {/* <label className="mb-0 mt-0" >Phone Number: {pharmacy.meta_data.phone_number}</label> */}
                    <p className="mb-0 mt-0">Phone Number: {pharmacy.meta_data.phone_number}</p>
                    <label className="mb-0 mt-0" >Address: </label>
                    <p className="mb-0 mt-0">{pharmacy.meta_data.address + "    ("+pharmacy.meta_data.latitude+","+pharmacy.meta_data.longitude+")"}</p>
                    <label className="mb-0 mt-0" >Status: {pharmacy.meta_data.status}</label>
                    {/* <p className="mb-0 mt-0">{pharmacy.meta_data.status}</p> */}


                    <div className="mb-0 mt-2 mt-1 d-flex ">
                        <Link className="navlink" to={"/pharmacy/update?id="+pharmacy._id}>
                            <Button className="ml-3" variant="outline-success">Edit Pharmacy</Button>{' '}
                        </Link>

                        <Button className="ml-3" variant="outline-danger" onClick={() => setShowDeleteAlart(!showDeleteAlart)}>Delete Pharmacy</Button>{' '}

                    </div>
                    <Alert className="mt-1" show={showDeleteAlart} variant="warning">
                        <Alert.Heading>Please Make Sure...</Alert.Heading>
                        <p>
                        Do you want to delete the User? If you do this you will never get it again!
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShowDeleteAlart(!showDeleteAlart)} variant="outline-secondary">
                                Cancel
                            </Button>

                            <Button className="ml-2" onClick={() => deletePharmacy(pharmacy._id)} variant="outline-danger">
                                Force Delete
                            </Button>
                        </div>
                    </Alert>
                </Col>
            </Row>
        </Container>
    </ListGroup.Item> 
    );
};

export default ItemView;