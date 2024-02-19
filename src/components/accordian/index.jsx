import { useState } from 'react'
import data from './data'
import './styles.css'

//single Selection
//multiple selection

export default function Accordian() {

    const [selected, setSelected] = useState(null)
    const [enableMultiSeletion, setEnableMultiSeletion] = useState(false)
    const [multiple, setMultiple] = useState([])

    function handleSingleSelection (getCurrentId) {
        //console.log(getCurrentId)
        setSelected(getCurrentId === selected ? null : getCurrentId)
    }

    function handleMultiSelection(getCurrentId) {
        let copyMultiple = [...multiple]
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)
        //console.log(findIndexOfCurrentId)
        if(findIndexOfCurrentId === -1){
            copyMultiple.push(getCurrentId)
        }else{
            copyMultiple.splice(findIndexOfCurrentId, 1)
        }

        setMultiple(copyMultiple)
    }

    //console.log(selected)

    return(
        <div className='wrapper'>
            <button onClick={() => setEnableMultiSeletion(!enableMultiSeletion)}>Enable Multi Selection</button>
            <div className='accordian'>
                { data && data.length > 0 ? 
                data.map(dataItem => <div className='item'>
                    <div onClick={enableMultiSeletion 
                        ? () => handleMultiSelection(dataItem.id) 
                        :() => handleSingleSelection(dataItem.id)} className='title'>
                        <h3>{dataItem.question}</h3>
                        <span>+</span>
                    </div>
                    {
                        enableMultiSeletion ? 
                        multiple.indexOf(dataItem.id) !== -1 && 
                        <div className='content'>{dataItem.answer}</div> : 
                        selected === dataItem.id && <div className='content'>{dataItem.answer}</div>
                    }
                    {/* {
                        selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? 
                        <div className='content'>{dataItem.answer}</div>
                        : null
                    } */}
                </div>)
                : <div>Not data found!</div>}
            </div>
        </div>
    )
}