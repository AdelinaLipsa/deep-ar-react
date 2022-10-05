import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './iframe.styles.css';

const CustomIframe = ({
                        children,
                        ...props
                      }) => {
  const [contentRef, setContentRef] = useState(null)

  const mountNode =
    contentRef?.contentWindow?.document?.body

  return (
    <iframe {...props} ref={setContentRef} title='title' className='custom-iframe'>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}

export default CustomIframe;
