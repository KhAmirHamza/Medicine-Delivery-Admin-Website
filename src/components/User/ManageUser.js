import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import UserListView from './UserListView';
import NavBar from '../Nav';

const ManageUser = () => {

    const [users, setUsers] = useState([]);
    const [selectedList, setSelectedList] = useState([])

    const handleMultipleDelete = () =>{
        const filteredUserIds = [];
        users.map((user, index)=> selectedList[index]===true? filteredUserIds.push(user._id):{});
        console.log(filteredUserIds);

        if (filteredUserIds.length>0) {
            var url = "api.https://hellometbd.com/user/";
            console.log(url);
            console.log(filteredUserIds);
            var ids = {"ids":filteredUserIds};
            console.log(ids);
            axios.delete(url, { data: ids })
            .then(function (response) {
                console.log(response);
                console.log("orders deleted");
                alert("Orders Deleted..!")
                handleGetUsers();
                
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

    const deleteUser = (id) => {
        console.log("Delete User is Called");
        axios.delete("https://api.hellometbd.com/user/"+id)
        .then(result =>{
            setUsers(users.filter(user=>user._id!==id))
            alert("User is Deleted!")
        })
        .catch(error=> {
            console.log(error);
        })
    }
    const handleGetUsers = ()=>{
        axios.get("https://api.hellometbd.com/user/")
        .then(function (response) {
            setUsers(response.data);
        })
        .catch(function (error) {
            // handle error
           // console.log(error);
        })
        .then(function () {
            // always executed
        })
    }
    useEffect(()=>{
handleGetUsers();
     },[]);

     const handleUserSearch = (searchText) => {
        console.log("handle Search");
        var url = "https://api.hellometbd.com/user?name="+searchText;
        console.log(url);
        console.log(searchText);
          axios.get(url)
          .then(function (response) {
              setUsers(response.data);   
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


    return (
        <div>
            <NavBar/>
            <Form inline className="d-flex justify-content-center">
                <FormControl type="text" placeholder="Search" className="mr-sm-2 " style={{width:500}}
                onChange={(e)=>handleUserSearch(e.target.value)}
                />
                <Button variant="outline-info" style={{width:150}}>Search</Button>
                <Button variant="outline-danger" style={{width:140, marginLeft:10}} onClick={(e)=>{handleMultipleDelete()}}>Delete Selected</Button>
            </Form>
            <UserListView  users={users} deleteUser={deleteUser} handleSelect={handleSelect} selectedList={selectedList}/>
        </div>
    );
};

export default ManageUser;