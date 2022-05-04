import React from 'react';

class SelectedNumberRow extends React.Component{
    render(){
        const { number, isLocked, onLockClick } = this.props;

        return(
            <li className="list-group-item">
                {number}
                <button className="ml-3 btn btn-primary" onClick={onLockClick}>{isLocked ? 'Unlock' : 'Lock'}</button>
            </li>
        )
    }
}

export default SelectedNumberRow;