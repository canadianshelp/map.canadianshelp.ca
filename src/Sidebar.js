import React from 'react';

function Sidebar(props) {
    if (!props.data) return null;
    const items = [];
    for (let [index, value] of props.data.entries()) {
        let item = (
            <div className='sidebar__item' key={index} onClick={() => props.onSidebarItemClick(value)}>
                <div className='sidebar__item-name'>{value.name}</div>
                <div>{value.email}</div>
                <div className='sidebar__item-services'>{value.services}</div>
                { !!value.distance && <div>{value.distance} km</div> }
                { index < props.data.length && <hr /> }
            </div>
        );
        items.push(item);
    }

    return (
        <div className='sidebar__container'>
            <div className='sidebar__header'>Canadians Help</div>
            <div className='sidebar__helptext'>Find local volunteers nearby willing to lend a hand</div>
            {items}
        </div>
    );
}

export default Sidebar;
