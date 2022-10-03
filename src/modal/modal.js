import { Component } from "react";

class Modal extends Component{
  constructor(props) {
    super(props);

    this.state = {
      product: {}
    };
  }

  render() {
    return (
      <div>Hello World {this.props.product.name}</div>
    );
  }
}

export default Modal;