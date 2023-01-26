import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDotsVertical } from 'react-icons/bs'
import styles from '../../styles/Dropdown.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomDropdown = ({ updateHabit, setShowConfirmModal }) => {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          className={styles['my-toggle']}
          ref={ref}
          onClick={e => {
            e.preventDefault();
            onClick(e);
          }}
        >
            <BsThreeDotsVertical className={styles['my-toggle']}/>
          {children}
        </a>
    ));
    return (
        <Dropdown drop={'start'}>
            <Dropdown.Toggle as={CustomToggle}/>
            <Dropdown.Menu align={'end'}> 
            <Dropdown.Item onClick={updateHabit}>Edit Habit</Dropdown.Item>
            <Dropdown.Item onClick={() => setShowConfirmModal(true)}>Delete Habit</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropdown