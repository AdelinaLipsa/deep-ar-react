import Modal from "./components/modal/modal";
import { useState, useEffect, useRef } from "react";
import './App.scss';

const App = () => {
  const [products, setProducts] = useState([]);
  const [showFiltersModal, setFiltersModal] = useState(false);
  const overlay = useRef(null);

  /*@TODO:remove this in production*/
  useEffect(() => {
    return () => {
      fetch('https://cors-anywhere.herokuapp.com/https://staging1.farmec.ro/rest/V1/farmec/deeparProducts/')
        .then(response => response.json())
        .then((productsJson) => setProducts(productsJson));
    };
  }, []);

  // this shows the deepar canvas on page
  const handleModal = () => {
    overlay.current.display = "hidden";
    setFiltersModal(true);
  };

  /*@TODO:remove this in production and give the actual product shown in current shown page*/
    let randomProduct = products.length ? Object.values(products[0])[0] : null;

  return (
    <>
      {randomProduct ? <input type="button" value="Încearcă o culoare!" onClick={() => handleModal()} className={"btn btn-open"}/> : <></>}
      <div className={"overlay hidden"} ref={overlay}></div>
      {showFiltersModal ? <Modal product={randomProduct} hideModal={() => setFiltersModal(false)}/> : <div></div>}
    </>
  );
}

export default App;
