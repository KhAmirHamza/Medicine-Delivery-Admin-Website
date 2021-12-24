import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, ListGroup, Row, Image, Collapse, Button, Tooltip, Alert } from 'react-bootstrap';
import axios from 'axios'
import { Link } from 'react-router-dom';
import CustomAlert from '../Alert';
import { Overlay, Popover } from 'react-bootstrap';
import { ScrollSpy } from 'bootstrap';


const ListItem = ({ medicine, deleteMedicine}) => {
    const [showDeleteAlart, setShowDeleteAlart] = useState(false);

    var meta_data = [];
    [meta_data] = [medicine.meta_data]
    //console.log(medicine);
    var path = "/medicine/add?id=" + medicine._id;
    const [collapse, setCollapse] = useState(false)
    return (

        <ListGroup.Item className="container-listitem">
            <Container >
                <Row >
                    {/* xs={6} */}
                    <Col md={4}>
                        <Image className={["mx-auto", "mt-1",]} style={{ height: "200px", width: "200px", display: "flex" }}
                            src={meta_data.image_url} />
                    </Col>

                    {/* xs={12} */}
                    <Col md={8}>
                        <p className="mb-0 mt-0" style={{ fontSize: 25 }}>{meta_data.name}</p>
                        <p className="mb-2 mt-0">{meta_data.features}</p>
                        <label className="mb-0 mt-0" >Indication: </label>
                        <p className="mb-0 mt-0">{meta_data.indication}</p>

                        <div className="mb-0 mt-2 mt-1 d-flex ">
                            <p className="mb-0 mt-0" style={{ fontSize: 25 }} >{meta_data.price} Tk</p>
                            <Button className="ml-auto" variant="outline-info" onClick={() => setCollapse(!collapse)}>View Details</Button>{' '}
                            <Link className="navlink" to={path}>
                                <Button className="ml-3" variant="outline-success">Edit Medicine</Button>{' '}
                            </Link>


                            <Button className="ml-3" variant="outline-danger" onClick={() => setShowDeleteAlart(!showDeleteAlart)}>Delete Medicine</Button>{' '}


                        </div>
                        <Alert className="mt-1" show={showDeleteAlart} variant="warning">
                            <Alert.Heading>Please Make Sure...</Alert.Heading>
                            <p>
                            Do you want to delete the medicine? If you do this you will never get it again!
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setShowDeleteAlart(!showDeleteAlart)} variant="outline-secondary">
                                    Cancel
                                </Button>
                               
                                <Button className="ml-2" onClick={() => deleteMedicine(medicine._id)} variant="outline-danger">
                                    Force Delete
                                </Button>
                            </div>
                        </Alert>
                    </Col>
                </Row>

                <Collapse onClick={() => setCollapse(!collapse)} className="mb-0 mt-1 " in={collapse}>
                    <div id="example-collapse-text"><b>Description: </b>
          {meta_data.description}
        </div>
                </Collapse>
            </Container>
        </ListGroup.Item>
    )

}






const MedicineListView = ({ medicines, deleteMedicine}) => {

    //const initialValues = [{_id:"", meta_data:{}}]

    //const [medicines,setMedicines] = useState([])

    const [count, setCount] = useState(0);





    return (

        <div>
            {/* <p>{medicines.length}:{count}</p> */}
            {


                <ListGroup>
                    {
                        medicines.map((medicine => (
                            <ListItem medicine={medicine} deleteMedicine={deleteMedicine}></ListItem>
                            //console.log(medicine.meta_data)

                        )))
                    }
                </ListGroup>}
        </div>
    );
};

export default MedicineListView;