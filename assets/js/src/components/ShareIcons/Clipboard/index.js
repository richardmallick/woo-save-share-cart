import React from 'react';

const { __ } = window.wp.i18n;

function ClipIcon( { onClick } ) {

  return (
    <div>
      <a title={ __( 'Copy cart link to clipboard', 'wcssc' ) } href="#" onClick={ onClick }>
        <i className="fas fa-copy"></i>
        <p class="icon-text">Copy Cart Link</p>
      </a>
    </div>
);
}

export default ClipIcon;
