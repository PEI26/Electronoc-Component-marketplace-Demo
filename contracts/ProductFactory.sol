pragma solidity ^0.6.0;
import"./Product.sol";
import "./Ownable.sol";

contract ProductFactory is Ownable{
    
    enum Steps{ Posted , Paid , Delivered }
    
    struct ProductStruct {
        ProductFactory.Steps _step;
        string _productName;
        uint _price;
        Product _product;
    }
    mapping(uint => ProductStruct) public products;
    
    uint index;
    
    event Process(uint _productIndex , uint _steps, address _address);
    
    function postProduct(string memory _productName , uint _price)public onlyOwner {
        Product product = new Product(this, _price, index);
        products[index]._product = product;
        products[index]._productName = _productName;
        products[index]._price = _price;
        products[index]._step = Steps.Posted;
        emit Process( index , uint(products[index]._step), address(product));
        index++;
    }
    function placeOrder(uint _productIndex )public payable {
        require(products[_productIndex ]._price == msg.value,"You have to pay full !");
        require(products[_productIndex ]._step == Steps.Posted,"The product doesn't exist.");
        products[_productIndex ]._step = Steps.Paid;
         emit Process( _productIndex  , uint(products[_productIndex ]._step), address(products[_productIndex ]._product));
    }
    function deliver(uint _productIndex ) public onlyOwner{
        require(products[_productIndex ]._step == Steps.Paid,"The product hasn't been paid.");
        products[_productIndex ]._step = Steps.Delivered;
         emit Process( _productIndex  , uint(products[_productIndex ]._step), address(products[_productIndex ]._product));
    }
        
}