import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import AddMedicine from './components/Medicine/AddMedicine';
import ManageMedicine from './components/Medicine/ManageMedicine';
import OrderReceipt from './components/Order/OrderReceipt';
import ManageUser from './components/User/ManageUser';
import ManageRider from './components/Rider/ManageRider';
import ManagePharmacy from './components/Pharmacy/ManagePharmacy';
import AddUpdatePharmacy from './components/Pharmacy/AddUpdate';
import UpdateRider from './components/Rider/Update';
import UpdateUser from './components/User/Update';

import SignIn from './components/Auth/SignIn';
import Home from './components/Home';
import ManageOrder from './components/Order/ManageOrder';
import NotFound from './components/NotFound';
import AddUpdateImage from './components/Slider/AddUpdateImage';
import ManageSlider from './components/Slider/ManageSlider'
import ManageFcm from './components/Fcm/ManageFcm';


class App extends Component {
  tempOrderList = [
    {
      _id: "O5415454152",
      meta_data: {
          created_at: "30 Jan, 2021 06:36 PM",
          status: "Pending",
          total_price: "৳ 500",
          payment_method: "payment_method",
          payment_status: "Cash On Delivery",
          requirement: "requirement",
          user_id: "user_id",
          user_name: "user_name",
          user_phone_number: "user_phone_number",
          deliveryman_id: "deliveryman_id",
          deliveryman_name: "deliveryman_name",
          deliveryman_phone_number: "deliveryman_phone_number",
          pharmacy_id: "pharmacy_id",
          pharmacy_name: "Ma Medical Hall and Pharmacy",
          pharmacy_address: "pharmacy_address",
          pharmacy_phone_number: "pharmacy_phone_number"
      },
      items: [
          {
              medicine_id: "medicine_id",
              features: "features",
              name: "Napa",
              brand: "brand",
              price: "2",
              quantity: "3",
              sub_total: "6"
          },
          {
            medicine_id: "medicine_id",
            features: "features",
            name: "Paracetamol",
            brand: "brand",
            price: "2.5",
            quantity: "7",
            sub_total: "17.5"
        }]
  },
  {
    _id: "O5415454152",
    meta_data: {
        created_at: "30 Jan, 2021 06:36 PM",
        status: "Pending",
        total_price: "৳ 500",
        payment_method: "payment_method",
        payment_status: "Cash On Delivery",
        requirement: "requirement",
        user_id: "user_id",
        user_name: "user_name",
        user_phone_number: "user_phone_number",
        deliveryman_id: "deliveryman_id",
        deliveryman_name: "deliveryman_name",
        deliveryman_phone_number: "deliveryman_phone_number",
        pharmacy_id: "pharmacy_id",
        pharmacy_name: "Ma Medical Hall and Pharmacy",
        pharmacy_address: "pharmacy_address",
        pharmacy_phone_number: "pharmacy_phone_number"
    },
    items: [
        {
            medicine_id: "medicine_id",
            features: "features",
            name: "Napa",
            brand: "brand",
            price: "2",
            quantity: "3",
            sub_total: "6"
        },
        {
          medicine_id: "medicine_id",
          features: "features",
          name: "Paracetamol",
          brand: "brand",
          price: "2.5",
          quantity: "7",
          sub_total: "17.5"
      }]
  }
]

  constructor(props) {
    super(props);
    this.state = {
      displyDataList: [],
      cloneDisplayDataList: null,
      auth: false
    };
  }
  

  handleSearch = (searchText) => {
    console.log("handle Search");
    if(searchText && this.state.displyDataList.length>0){
      console.log("searchText");
      console.log(searchText);
      console.log(this.state.cloneDisplayDataList[0]._id);
            
    if ( //checking data is available or not
         this.state.cloneDisplayDataList[0].meta_data.name ||
       this.state.cloneDisplayDataList[0]._id)
      {
        console.log("main data is available");
        
        var filteredData = []
        for (let index = 0; index < this.state.cloneDisplayDataList.length; index++) {
          const element = this.state.cloneDisplayDataList[index];
          var rootDataForMatch;
          if (element.meta_data.name) {
            rootDataForMatch = element.meta_data.name;
          }else if(element._id){
            rootDataForMatch = element._id;
          }
           if (rootDataForMatch) {
            console.log("rootDataForMatch");
            console.log(rootDataForMatch);

            if (rootDataForMatch.indexOf(searchText)>-1) {
              filteredData.push(element);
            }

            if (index===(this.state.cloneDisplayDataList.length-1)) {
              this.setState({
                displyDataList: filteredData 
              })
            }
          }
        }
    }
    }else if (!searchText) {
      this.setState({displyDataList: this.state.cloneDisplayDataList})
    }
  }
  
  handleData = (data) => {
    this.setState({displyDataList: data})
    this.setState({ cloneDisplayDataList: this.state.displyDataList});
   console.log("handleData");
   console.log(this.state.displyDataList.length);
  }

  handleAuthAndNavigation = (result, path) =>{
    console.log(result);
    console.log(path);
    if (result) {

    this.handleAuth(true)
    //this.props.history.push(path)
     console.log(this.props);
    }
  }

  handleAuth(result){
    this.setState({auth: result});
  }



  handleReceipt = ()=>{

  }

  render() {
    return (
      <Router >


        <div style={{display:'flex', flexDirection:'column'}}>
       
         <div style={{marginTop:"60px"}}>
         <Switch>
            <Route exact path="/">
            <SignIn handleAuthAndNavigation = {this.handleAuthAndNavigation.bind(this)}/>
            </Route>

            <Route exact path="/home">
            {this.state.auth?<Home/>:<NotFound/>}
            </Route>

            <Route exact path="/medicine/add" component={AddMedicine}/>

            <Route  path="/medicine">

            {this.state.auth?
            <ManageMedicine handleData={this.handleData.bind(this)} dataList={this.state.displyDataList}
              handleSearch={this.handleSearch.bind.this}/>
            :<NotFound/>}
              
            </Route>

            <Route exact path="/user/update" component={UpdateUser}/>

            <Route  path="/user">
              
              {this.state.auth?
                <ManageUser />:<NotFound/>}
            </Route>

            <Route exact path="/rider/update" component={UpdateRider}/>
            
            <Route  path="/rider">
            {this.state.auth?<ManageRider />:<NotFound/>}
            </Route>
            
            <Route exact path="/pharmacy/update" component={AddUpdatePharmacy}/>

            <Route  path="/pharmacy">
            {this.state.auth?<ManagePharmacy />:<NotFound/>}
              
            </Route>
            

            <Route exact path="/order">

            {this.state.auth?
            <ManageOrder handleData={this.handleData.bind(this)} dataList={this.state.displyDataList}/>
            :<NotFound/>}
            </Route>

            <Route exact path="/order/receipt">

             <OrderReceipt
               handleReceipt={this.handleReceipt.bind(this)}
                orders={this.state.displyDataList}
                from= "FROM" to="to"/>

            </Route>

            <Route path="/slider/add" component={AddUpdateImage}/>
            <Route path="/slider/update" component={AddUpdateImage}/>

            <Route exact path="/slider">
            {this.state.auth?<ManageSlider />:<NotFound/>}
            </Route>

            <Route exact path="/fcm">
            {this.state.auth?<ManageFcm />:<NotFound/>}
            </Route>

          </Switch>
          
         </div>
        </div>
       
      </Router>
      
    );
  }
}

export default App;