import React from 'react';
import jQuery from 'jquery';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.state = {
      isOpen: false,
      isClosed: true,
      isOpening: false,
      isClosing: false,
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOpening = this.onOpening.bind(this);
    this.onClosing = this.onClosing.bind(this);
  }

  onOpening(e) {
    this.setState({
      isOpening: true,
      isOpen: false,
      isClosed: false,
      isClosing: false,
    });

    this.props.onOpening && this.props.onOpening(e);
  }

  onOpen(e) {
    this.setState({
      isOpening: false,
      isOpen: true,
      isClosed: false,
      isClosing: false,
    });

    this.props.onOpen && this.props.onOpen(e);
  }

  onClosing(e) {
    this.setState({
      isOpening: false,
      isOpen: false,
      isClosed: false,
      isClosing: true,
    });

    this.props.onClosing && this.props.onClosing(e);
  }

  onClose(e) {
    this.setState({
      isOpening: false,
      isOpen: false,
      isClosed: true,
      isClosing: false,
    });

    this.props.onClose && this.props.onClose(e);
    this.props.show && this.props.onCancel && this.props.onCancel(e);
  }

  detachEvents() {
    jQuery(this.ref.current).off('show.bs.modal', this.onOpening);
    jQuery(this.ref.current).off('shown.bs.modal', this.onOpen);
    jQuery(this.ref.current).off('hide.bs.modal', this.onClosing);
    jQuery(this.ref.current).off('hidden.bs.modal', this.onClose);
  }

  attachEvents() {
    jQuery(this.ref.current).on('show.bs.modal', this.onOpening);
    jQuery(this.ref.current).on('shown.bs.modal', this.onOpen);
    jQuery(this.ref.current).on('hide.bs.modal', this.onClosing);
    jQuery(this.ref.current).on('hidden.bs.modal', this.onClose);
  }

  openModal() {
    if (!this.state.isOpening && !this.state.isOpen) {
      jQuery(this.ref.current).modal('show');
    }
  }

  closeModal() {
    if (!this.state.isClosing && !this.state.isClosed) {
      jQuery(this.ref.current).modal('hide');
    }
  }

  updateModal() {
    this.detachEvents();
    this.attachEvents();

    if (!this.state.isClosing) {
      if (this.props.show) {
        this.openModal();
      } else {
        this.closeModal();
      }
    }
  }

  componentDidMount() {
    this.updateModal();
  }

  componentDidUpdate() {
    this.updateModal();
  }

  componentWillUnmount() {
    this.closeModal();
  }

  getModalHeader() {
    if (this.props.header) {
      return <div className='modal-header'>{this.props.header}</div>;
    } else if (!this.props.header && this.props.title) {
      return (
        <div className='modal-header'>
          <h5 className='modal-title'>{this.props.title}</h5>
          <button
            type='button'
            className='close'
            data-dismiss='modal'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      );
    }
  }

  getModalFooter() {
    if (this.props.footer) {
      return <div className='modal-footer'>{this.props.footer}</div>;
    }
  }

  getModalClasses() {
    return `modal-dialog
      ${this.props.isCentered ? ' modal-dialog-centered' : ''}
      ${this.props.isScrollable ? ' modal-dialog-scrollable' : ''}
      ${this.props.size ? ` modal-${this.props.size}` : ''}`;
  }

  getModal() {
    return (
      <div className='modal' ref={this.ref} tabIndex='-1' role='dialog'>
        <div className={this.getModalClasses()}>
          <div className='modal-content'>
            {this.getModalHeader()}

            <div className='modal-body'>
              {this.props.show && this.props.children}
            </div>

            {this.getModalFooter()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const modal = this.getModal();
    if (this.props.parent) {
      const el = document.querySelector(this.props.parent);
      return ReactDOM.createPortal(modal, el);
    }
    return modal;
  }
}

Modal.propTypes = {
  title: PropTypes.node,
  header: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  parent: PropTypes.string,
  isCentered: PropTypes.bool,
  isScrollable: PropTypes.bool,
  size: PropTypes.string,
  show: PropTypes.bool,
  onOpening: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onClosing: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Modal;
