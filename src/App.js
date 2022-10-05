import './index.css';
import Button from "./components/button/button";
import CustomIframe from './components/iframe/customIframe';
import Modal from "./components/modal/modal";
import { useState, useEffect } from "react";

const App = () => {
  let modal, randomProduct;

  const [products, setProducts] = useState([]);
  const [showFiltersModal, setFiltersModal] = useState(false);

  useEffect(() => {
    return () => {
      fetch('https://cors-anywhere.herokuapp.com/https://staging1.farmec.ro/rest/V1/farmec/deeparProducts/')
        .then(response => response.json())
        .then((productsJson) => setProducts(productsJson));
    };
  }, []);

  if (products.length) {
    randomProduct = Object.values(products[0])[1];
  }

  if (showFiltersModal) {
    modal = <Modal/>;
  }

  console.log(showFiltersModal);

  return (
    <CustomIframe className='custom-iframe'>
      <Button handleModal={() => setFiltersModal(true)}/>
      {modal}
    </CustomIframe>
  );
}

export default App;
