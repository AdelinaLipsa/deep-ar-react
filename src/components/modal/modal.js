const Modal = (props) => {
  const colors = props.product.Variations;
  const overlay = document.querySelector(".overlay");

  const handleModal = () => {
    overlay.classList.remove("hidden");
    return props.hideModal;
  };

  return (
      <section className={"modal"}>
        <div className={"btn-wrapper"}>
          <button className={"btn-close"} onClick={handleModal()}>⨉</button>
        </div>
        <div>
          <h3>Incearca produsul selectand una din culori</h3>
          <div className={"colors-wrapper"}>
            {colors.map((color, index) => {
              return <div key={index} onClick={() => alert(index)}>{JSON.stringify(color.filterData)}</div>;
            })}
          </div>
        </div>
      </section>
    );
};

export default Modal;