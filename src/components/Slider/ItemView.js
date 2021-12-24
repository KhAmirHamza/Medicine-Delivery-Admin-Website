import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, ListGroup, Row, Image, Collapse, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemView = ({slider, deleteSlider}) => {
    const [showDeleteAlart, setShowDeleteAlart] = useState(false);

    return (
        <ListGroup.Item className="container-listitem">
        <Container >
            <Row >
                {/* xs={6} */}
                <Col md={4}>
                    <Image className={["mx-auto", "mt-1",]} style={{ height: "200px", width: "200px", display: "flex" }}
                        src={slider.data.image_url} />
                </Col>

                {/* xs={12} */}
                <Col md={8}>
                    <label className="mb-0 mt-0" >Id: </label>
                    <p className="mb-0 mt-0" style={{ fontSize: 25 }}>{slider._id}</p>
                    <label className="mb-0 mt-0" >Title: </label>
                    <p className="mb-0 mt-0">{slider.data.title}</p>


                    <div className="mb-0 mt-2 mt-1 d-flex ">
                        <Link className="navlink" to={"/slider/update?id="+slider._id}>
                            <Button className="ml-3" variant="outline-success">Edit Slider</Button>{' '}
                        </Link>

                        <Button className="ml-3" variant="outline-danger" onClick={() => setShowDeleteAlart(!showDeleteAlart)}>Delete Slider</Button>{' '}

                    </div>
                    <Alert className="mt-1" show={showDeleteAlart} variant="warning">
                        <Alert.Heading>Please Make Sure...</Alert.Heading>
                        <p>
                        Do you want to delete the Slider data? If you do this you will never get it again!
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShowDeleteAlart(!showDeleteAlart)} variant="outline-secondary">
                                Cancel
                            </Button>

                            <Button className="ml-2" onClick={() => deleteSlider(slider._id)} variant="outline-danger">
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