import { getStoredCart } from "../utilities/fakedb";

export const ProductsAndCartLoader = async() =>{
    // get product
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    // get cart
    const savedCart = getStoredCart();
    // console.log('save', savedCart);
    const initialCart = [];
    for(const id in savedCart){
        // console.log(id);
        const addedProduct = products.find(product => product.id === id);
        // console.log(addedProduct)
        if(addedProduct){
            const quantity = savedCart[id];
            // console.log(id, quantity);
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
            
        }
        
    }
    

    return {products, initialCart};

}