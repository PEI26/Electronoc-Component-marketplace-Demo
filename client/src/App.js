import React, { Component } from "react";
import ProductFactoryContract from "./contracts/ProductFactory.json";
import ProductContract from "./contracts/Product.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded:false, price:"", productName:""};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      
      this.productFactory = new this.web3.eth.Contract(
        ProductFactoryContract.abi,
        ProductFactoryContract.networks[this.networkId] && ProductFactoryContract.networks[this.networkId].address,
      );
      this.product= new this.web3.eth.Contract(
        ProductContract.abi,
        ProductContract.networks[this.networkId] && ProductContract.networks[this.networkId].address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenPlaceOrderEvent();
      this.setState({ loaded : true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
 listenPlaceOrderEvent =()=>{
   let self = this;
   this.productFactory.events.Process().on("data",async function (e) {
     if (e.returnValues._steps === "1") {
      let product = await self.productFactory.methods.products(e.returnValues._productIndex).call();
      console.log(product);
     alert(product._productName + " was fully paid , You can deliver." );
     };
      console.log(e);
   });
 }
 
  handleChange = (event)=>{
   const target =event.target;
   const value = target.type === "checkbox"? target.checked: target.value;
   const name = target.name;
   this.setState({
     [name]:value
   });
 }
 handleSubmit = async()=>{
   const {price, productName}=this.state;
   
   let result = await this.productFactory.methods.postProduct(productName,price).send({from:this.accounts[0]});
   console.log(result);
   alert(" Product address is  " + result.events.Process.returnValues._address);

 }
  

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Electronic Component Marketplace</h1>
        
        <h2>Product Information</h2>
       
        <h3 className="sansserif">Product Name : <input type="text" name="productName" value={this.state.productName}  onChange={this.handleChange}/></h3>
        <h3 className="sansserif">Price : <input className="input" type="text" name="price" value={this.state.price}  onChange ={this.handleChange}/></h3>
        
        
        <button className="button button1" type="button" onClick={this.handleSubmit}>Post New Product</button>
        
       
      </div>
    );
  }
}

export default App;
