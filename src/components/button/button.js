const Button = (props) => {

  const overlay = document.querySelector(".overlay");

  const handleModal = () => {
    // overlay.classList.add("hidden");
    return props.showModal;
  };

  return (
      <div>
        <input type="button" value="Incearca o culoare!" onClick={handleModal()} className={"btn btn-open"}/>
        <div className={"overlay hidden"}></div>
      </div>
  );
}

export default Button;