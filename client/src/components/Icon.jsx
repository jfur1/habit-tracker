import React from 'react'
import styles from '../../styles/ToDoCard.module.scss'
import { FaHeart, FaPhoneAlt, FaRunning } from 'react-icons/fa'
import { MdSmokeFree } from 'react-icons/md'

const Icon = ({ index, iconName, iconColor }) => {

    let i = index
    const ICONS = [
        { iconName: 'running', icon: <FaRunning/>},
        { iconName: 'smoking', icon: <MdSmokeFree/>},
        { iconName: '', icon: null},
        { iconName: 'phone', icon: <FaPhoneAlt/>},
        { iconName: 'heart', icon: <FaHeart/>},
        { iconName: '', icon: null},
        { iconName: '', icon: null},
        { iconName: '', icon: null},
    ];

    if(!index && !iconName){
        console.log('need an index or iconName');
        return null;
    }

    // No index, but have icon name
    if(!index && !!iconName){
        ICONS.forEach((icon, idx) => {
            if(iconName === icon.iconName){
                i = idx;
            }
        })
    }


    return (
        <div className={styles.iconContainer} style={ iconColor ? { color : iconColor} : null }>
            {ICONS[i].icon}
        </div>
    )
}

export default Icon