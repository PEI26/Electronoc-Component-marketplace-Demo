pragma solidity ^0.6.0;

import "./ProductFactory.sol";

contract Product {
    uint public price;
    uint public paid;
    uint public index;
   
    
    ProductFactory parentContract;
    
    constructor(ProductFactory _parentContract ,uint _price, uint _index ) public {
        price = _price;
        index = _index;
        parentContract = _parentContract;
        }
      receive() external payable {
         require(paid == 0,"Paid already");
         require(price == msg.value  ,"Please pay full");
         paid += msg.value;
         (bool success,) = address(parentContract).call.value(msg.value)(abi.encodeWithSignature("placeOrder(uint256)",index));
         require(success, "transaction failed");
     }
     fallback() external{
         
     }
     
}