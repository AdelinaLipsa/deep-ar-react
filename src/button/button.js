import { Component } from "react";

class Button extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/*If you want to see all the products on page*/}
        {/*<ul>*/}
        {/*  {this.props.products.map((item, index) => {*/}
        {/*    return <li key={index}>{JSON.stringify(item)}</li>*/}
        {/*  })}*/}
        {/*</ul>*/}
        <button>Incearca o culoare!</button>
      </>
    );
  }
}

export default Button;