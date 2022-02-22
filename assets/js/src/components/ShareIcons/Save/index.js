import React from 'react';

const { __ } = window.wp.i18n;

function SaveIcon( { onClick } ) {

  return (
    <div>
      <a target="_blank" title={ __('Save the cart', 'wcssc') } href="#" onClick={ onClick }>
        <i className="fas fa-save"></i>
        <p class="icon-text">Save To Account</p>
      </a>
    </div>
);
}

export default SaveIcon;
