const Button = (props) => {

  const overlay = document.querySelector(".overlay");

  const handleModal = () => {
    if(overlay)
      overlay.classList.add("hidden");
    return props.showModal;
  };

  return (
      <div>
        <input type="button" value="Încearcă o culoare!" onClick={handleModal()} className={"btn btn-open"}/>
        <div className={"overlay hidden"}></div>
      </div>
  );
}

export default Button;