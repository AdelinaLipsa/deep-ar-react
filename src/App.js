import './App.css';
import { Component } from "react";
import Button from "./button/button";
import CustomIframe from './iframe/customIframe';
import Modal from "./modal/modal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      showFiltersModal: false
    };

    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleShowModal() {
    this.setState({ showFiltersModal: true });
  }

  async componentDidMount() {
    await fetch('https://cors-anywhere.herokuapp.com/https://staging1.farmec.ro/rest/V1/farmec/deeparProducts/')
      .then(response => response.json())
      .then((productsJson) => {
          this.setState(
            () => {
              return { products: productsJson };
            })
        }
      );
  }

  render() {
    let showFiltersModal = this.state.showFiltersModal;
    let products = this.state.products;
    let randomProduct = [];
    let modal;

    if (products.length) {
      randomProduct = Object.values(products[0])[1];
    }

    if (showFiltersModal) {
      console.log('true');
      modal = <Modal product={randomProduct}/>;
    } else {
      console.log('false');
    }

    return (
      <CustomIframe>
        <Button onClick={() => this.handleShowModal()}/>
        {modal}
      </CustomIframe>
    );
  }
}

export default App;
