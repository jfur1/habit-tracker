import React, { useState } from 'react'
import styles from '../../styles/Dropdown.module.scss'

const Dropdown = () => {
    const [selectedValue, setSelectedValue] = useState('Orange')
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }
    return (
        <div className={styles['custom-select']}>
            <select 
                className={styles.select}
                value={selectedValue} 
                onChange={handleChange}
            >
                <option value="Orange">Orange</option>
                <option value="Pineapple">Pineapple</option>
                <option value="Cherry">Cherry</option>
                <option value="Banana">Banana</option>
                <option value="Pear">Pear</option>
            </select>
            <p className={styles.msg}>You selected {selectedValue}</p>
        </div>      
    )
}

export default Dropdown