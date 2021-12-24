import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import Dropdown from './Dropdown';


const NavBar = ({handleSearch}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownToggle = () => setDropdownOpen(prevState => !prevState);

  const handleDropdownItemClick = (item) => {
    //alert(name);
    console.log(item.path);
  } 

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  var medicineDropdownItems = [];

  medicineDropdownItems.push({id:0, path: "/medicine/add",value: "Add Medicine", description: "You can Add Medicine here"})
  medicineDropdownItems.push({id:1, path: "/medicine",value: "Manage Medicine", description: "Here you are able to manage all Medicine"})

  var orderDropdownItems = [];
  orderDropdownItems.push({id:0, path: "/order",value: "Manage Order", description: "Here you are able to manage all Order"})

  var userDropdownItems = [];
  userDropdownItems.push({id:0, path: "/user",value: "Manage User", description: "Here you are able to manage all User"})

  var pharmacyDropdownItems = [];
  pharmacyDropdownItems.push({id:0, path: "/pharmacy",value: "Manage Pharmacy", description: "Here you are able to manage all Pharmacy"})

  var riderDropdownItems = [];
  riderDropdownItems.push({id:0, path: "/rider",value: "Manage Rider", description: "Here you are able to manage all Rider"})
  
  var sliderDropdownItems = [];
  sliderDropdownItems.push({id:0, path: "/slider/add",value: "Add Slider Image", description: "You can Add Slider Image here"})
  sliderDropdownItems.push({id:1, path: "/slider",value: "Manage Slider", description: "Here you are able to manage Slider"})

  var fcmDropdownItems = [];
  fcmDropdownItems.push({id:0, path: "/fcm",value: "Manage Fcm", description: "Here you are able to manage Fcm"})

  return (
    <div className="mr-0">
      {/* bg="dark" variant="dark" */}
      <Navbar fixed="top" className="nav" light expand="md" isOpen >
        <NavbarBrand >
          <NavLink className="navlink" to="/">
            Home</NavLink>
            </NavbarBrand>
        <NavbarToggler onClick={toggle} />


        <Collapse isOpen={isOpen} navbar>

          <Nav className="ml-auto" navbar>

         



        <Dropdown  className="mb-0 mt-0"
        dropdownOpen={dropdownOpen}
         dropdownToggle={dropdownToggle}
          heading="Medicine" 
          items={medicineDropdownItems}
          handleDropdownItemClick={handleDropdownItemClick}/>

      <Dropdown  
        dropdownOpen={dropdownOpen}
         dropdownToggle={dropdownToggle}
          heading="Order" 
          items={orderDropdownItems}
          handleDropdownItemClick={handleDropdownItemClick}/>

      <Dropdown  
        dropdownOpen={dropdownOpen}
         dropdownToggle={dropdownToggle}
          heading="User" 
          items={userDropdownItems}
          handleDropdownItemClick={handleDropdownItemClick}/>

      <Dropdown  
        dropdownOpen={dropdownOpen}
         dropdownToggle={dropdownToggle}
          heading="Pharmacy" 
          items={pharmacyDropdownItems}
          handleDropdownItemClick={handleDropdownItemClick}/>

      <Dropdown  
        dropdownOpen={dropdownOpen}
         dropdownToggle={dropdownToggle}
          heading="Rider" 
          items={riderDropdownItems}
          handleDropdownItemClick={handleDropdownItemClick}/>

          <Dropdown  
        dropdownOpen={dropdownOpen}
         dropdownToggle={dropdownToggle}
          heading="Slider" 
          items={sliderDropdownItems}
          handleDropdownItemClick={handleDropdownItemClick}/>

      <Dropdown  
        dropdownOpen={dropdownOpen}
         dropdownToggle={dropdownToggle}
          heading="Fcm" 
          items={fcmDropdownItems}
          handleDropdownItemClick={handleDropdownItemClick}/>

          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};


// NavBar.propTypes = {
//     light: PropTypes.bool,
//     dark: PropTypes.bool,
//     fixed: PropTypes.string,
//     color: PropTypes.string,
//     role: PropTypes.string,
//     expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
//     // pass in custom element to use
//   }

export default NavBar;

