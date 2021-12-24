import React, { useEffect, useState } from 'react';
import axios from 'axios'
import MedicineListView from './MedicineListView';
import { Button, Form, FormControl, Navbar } from 'react-bootstrap';
import NavBar from '../Nav';

const ManageMedicine = () => {

    const [medicines, setMedicines] = useState([]);

    const deleteMedicine = (id) => {
        console.log("Delete medicine is called");
        // axios.delete("https://hellometbd.com/medicine/"+id)
        // .then(result =>{
        //     setMedicines(medicines.filter(medicine=>medicine._id!==id))
        //     alert("Medicine is Deleted!")
        // })
        // .catch(error=> {
        //     console.log(error);
        // })
    }

    const handleMedicineSearch = (searchText) => {
        console.log("handle Search");
        var url = "https://api.hellometbd.com/medicine?name=" + searchText;
        console.log(url);
        console.log(searchText);
        axios.get(url)
            .then(function (response) {
                setMedicines(response.data);
                console.log("response.data");
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            })

        console.log("searchText");
        console.log(searchText);

    }

    useEffect(() => {
        axios.get("https://api.hellometbd.com/medicine/")
            .then(function (response) {
                setMedicines(response.data);
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            })
    }, []);

    return (
        <div>

            <div>
            <NavBar  />
                <Form inline className="d-flex justify-content-center">
                    <FormControl type="text" placeholder="Search"  style={{ width: 500}}
                        onChange={(e) => handleMedicineSearch(e.target.value)}
                    />
                    <Button variant="outline-info" style={{ width: 150 }}>Search</Button>
                </Form>
            </div>
            <div style={{ marginTop: 5 }}>
                <MedicineListView medicines={medicines} deleteMedicine={deleteMedicine} />
            </div>

        </div>

    );
};

export default ManageMedicine;