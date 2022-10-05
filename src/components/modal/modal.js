const Modal = ({ product  }) => (
    <section className="modal">
      <div className="flex">
        <img src="https://avatars.githubusercontent.com/u/62628408?s=96&v=4" width="50px" height="50px" alt="user"/>
        <button className="btn-close">⨉</button>
      </div>
      <div>
        <h3>Stay in touch</h3>
        <p>
          This is a dummy newsletter form so don't bother trying to test it. Not
          that I expect you to, anyways. :)
        </p>
      </div>

      <input type="email" id="email" placeholder="brendaneich@js.com"/>
      <button className="btn">Do Something</button>
    </section>
);

export default Modal;