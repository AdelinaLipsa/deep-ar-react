const Button = (props) => {
  return (
    <>
      {/*If you want to see all the products on page*/}
      {/*<ul>*/}
      {/*  {this.props.products.map((item, index) => {*/}
      {/*    return <li key={index}>{JSON.stringify(item)}</li>*/}
      {/*  })}*/}
      {/*</ul>*/}
      <button onClick={props.handleModal} id='btn'>Incearca o culoare!</button>
    </>
  );
}

export default Button;