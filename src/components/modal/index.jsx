import React, { Component } from 'react';

class Modal extends Component {
  state = {

  }

  render() { 
    return (
      <div className="modal">
        <header className="modal__header"></header>
        <div className="modal__body"></div>
        <footer className="modal__footer"></footer>
      </div>
    );
  }
}
 
export default Modal;