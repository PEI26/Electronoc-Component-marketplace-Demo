const ProductFactory = artifacts.require("./ProductFactory.sol");

contract("ProductFactory", accounts => {
  it("...should allow to post products.", async () => {
    const productFactoryInstance = await ProductFactory.deployed();
    const productName = "First product";
    const productPrice = 10000;
    const result = await productFactoryInstance.postProduct(productName,productPrice, { from: accounts[0] });
    assert.equal(result.logs[0].args._productIndex, 0, "It is not the first product.");
    const product = await productFactoryInstance.products(0);
    assert.equal(product._productName,productName,"The product name is wrong.")
  });
});
