import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'

import { Dropdown as DropdownRS, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown} from 'reactstrap';

const Dropdown = ({heading, items,dropdownOpen, dropdownToggle,handleDropdownItemClick}) => {

    return (
        <div  className="mb-0 mt-0">
            {/* <DropdownRS  className="mb-0 mt-0" isOpen={dropdownOpen} toggle={dropdownToggle}> */}

            <UncontrolledDropdown nav inNavbar >
            <DropdownToggle nav caret >
                    {heading}
                </DropdownToggle>
                {/*  <DropdownMenu isOpen={dropdownOpen} toggle={dropdownToggle}> */}
                <DropdownMenu className="dropdown-menu-right" style={{position: "absolute"}}>
                <DropdownItem header>Choose an option</DropdownItem>
                    {
                    items.map(item=>(
                        
                           <NavLink className="navlink" to={item.path}>
                            <DropdownItem onClick={()=>{handleDropdownItemClick(item)}} key={item.id}>
                            {item.value}
                            </DropdownItem>
                           </NavLink>
                        
                    ))
                    }
                    
                </DropdownMenu>

            </UncontrolledDropdown>
                
            {/* </DropdownRS> */}
        </div>
    );
};

export default Dropdown;