import React from 'react';

function SidebarToggle(props) {
  return (
    <div>
    { props.showSidebar
      ? <div className='sidebar-toggle__top' onClick={props.onSidebarToggleClick}>&times;</div>
      : <div className='sidebar-toggle__bottom' onClick={props.onSidebarToggleClick}><div className='sidebar-toggle__bottom-label'>Show list</div></div>
    }
    </div>
  );
}

export default SidebarToggle;
