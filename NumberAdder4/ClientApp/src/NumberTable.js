import React from 'react';
import {produce} from 'immer';
import NumberRow from './NumberRow';
import SelectedNumberRow from './SelectedNumberRow';


class NumberTable extends React.Component{
    state = {
        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    }

    onAddClick = () => {
        const newState = produce(this.state, draftState => {
            draftState.numbers.push(getRandomInt(1, 999))
        })
        this.setState(newState);
    }

    onSelectClick = i => {
        const newState = produce(this.state, draftState => {
            if (this.isSelected(i)){
                draftState.selectedNumbers = this.state.selectedNumbers.filter(s => s !== i);
            }
            else{
                draftState.selectedNumbers.push(i);
            }            
        })
        this.setState(newState);
    }

    isSelected = i => this.state.selectedNumbers.some(s => s === i); 

    onLockClick = numSlot => {
        const newState = produce(this.state, draftState => {
            if (this.isLocked(numSlot)){
                draftState.lockedNumbers = this.state.lockedNumbers.filter(l => l !== numSlot);
            }
            else{
                draftState.lockedNumbers.push(numSlot);
            }            
        })
        this.setState(newState);
    }

    isLocked = i => this.state.lockedNumbers.some(l => l === i);

    render(){
        const {numbers, selectedNumbers} = this.state;
        return(         
            <div className='container mt-5'>
                <button className='btn btn-success btn-block' onClick={this.onAddClick}>Add Number</button>
                <table className='mt-3 table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {numbers.map((num, i) => {
                            return <NumberRow 
                                number={num}
                                isSelected={this.isSelected(i)}
                                isLocked={this.isLocked(i)}
                                key={i}
                                onSelectClick={() => this.onSelectClick(i)} ></NumberRow>
                        })}
                    </tbody>
                </table>

                {!!selectedNumbers.length &&
                    <div className="row jumbotron">
                        <div className="col-md-6 col-md-offset-3">
                            <h3>Selected Numbers</h3>
                            <ul className='list-group'>
                                {selectedNumbers.map((numSlot, i) => {
                                    return <SelectedNumberRow
                                        number={numbers[numSlot]}
                                        key={i}
                                        isSelected={this.isSelected(numSlot)}
                                        isLocked={this.isLocked(numSlot)}
                                        onLockClick={() => this.onLockClick(numSlot)}></SelectedNumberRow>
                                })}
                            </ul>                
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default NumberTable;