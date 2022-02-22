import React from 'react';

const { __ } = window.wp.i18n;

function EmailIcon( { onClick } ) {

  return (
    <div>
      <a title={ __('Email this cart', 'wcssc') } href="#" onClick={ onClick } title="Email">
        <i className="fas fa-envelope"></i>
        <p class="icon-text">Email Cart Link</p>
      </a>
    </div>
);
}

export default EmailIcon;
