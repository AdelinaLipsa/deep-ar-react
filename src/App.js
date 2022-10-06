import Button from "./components/button/button";
import CustomIframe from './components/iframe/customIframe';
import Modal from "./components/modal/modal";
import { useState, useEffect } from "react";
import './App.scss';

const App = () => {
  let modal, randomProduct;

  const [products, setProducts] = useState([]);
  const [showFiltersModal, setFiltersModal] = useState(false);

  /*@TODO:remove cors anywhere from the beginning of the URL*/
  useEffect(() => {
    return () => {
      fetch('https://cors-anywhere.herokuapp.com/https://staging1.farmec.ro/rest/V1/farmec/deeparProducts/')
        .then(response => response.json())
        .then((productsJson) => setProducts(productsJson));
    };
  }, []);

  /*@TODO:remove this in production and give actual product in current shown page*/
  if (products.length) {
    randomProduct = Object.values(products[0])[1];
  }

  if (showFiltersModal) {
    modal = <Modal product={randomProduct} hideModal={()=>setFiltersModal(false)}/>;
  }

  return (
    <div>
     {/*<CustomIframe className='custom-iframe'>*/}
      <Button showModal={() => setFiltersModal(true)}/>
      {modal}
     {/*</CustomIframe>*/}
    </div>
  );
}

export default App;
