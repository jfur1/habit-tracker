import React from 'react'
import styles from '../../styles/ToDoCard.module.scss'
import { FaHeart, FaIdCard, FaCarrot, FaPaw, FaTrashAlt, FaPhoneAlt, FaRunning } from 'react-icons/fa'
import { MdSmokeFree, MdNoFood, MdVideogameAssetOff, MdVideogameAsset, MdHomeRepairService } from 'react-icons/md'
import { IoIosWater, IoFastFoodOutline } from 'react-icons/io'
import { AiFillFire, AiFillCar, AiOutlineStar } from 'react-icons/ai'
import { BsCreditCard2Back } from 'react-icons/bs'
import { CgGym } from 'react-icons/cg'
import { FiMail } from 'react-icons/fi'


export const ICONS = [
    { iconName: 'running', icon: <FaRunning/>},
    { iconName: 'no-smoking', icon: <MdSmokeFree/>},
    { iconName: 'no-gaming', icon: <MdVideogameAssetOff/>},
    { iconName: 'diet', icon: <MdNoFood/>},
    { iconName: 'water', icon: <IoIosWater/>},
    { iconName: 'healthy', icon: <FaCarrot/>},
    { iconName: 'gym', icon: <CgGym/>},
    { iconName: 'phone', icon: <FaPhoneAlt/>},
    { iconName: 'heart', icon: <FaHeart/>},
    { iconName: 'fire', icon: <AiFillFire/>},
    { iconName: 'pet', icon: <FaPaw/>},
    { iconName: 'trash', icon: <FaTrashAlt/>},
    { iconName: 'mail', icon: <FiMail/>},
    { iconName: 'car', icon: <AiFillCar/>},
    { iconName: 'card', icon: <BsCreditCard2Back/>},
    { iconName: 'personal', icon: <FaIdCard/>},
    { iconName: 'repair', icon: <MdHomeRepairService/>},
    { iconName: 'favorite', icon: <AiOutlineStar/>},
];


const Icon = ({ index, iconName, iconColor, onClick, name, value }) => { 

    let i = index

    if(!index && !iconName  && index !== 0){
        console.log('need an index or iconName');
        return null;
    }

    // No index, but have icon name
    if(!index && !!iconName && index !== 0){
        ICONS.forEach((icon, idx) => {
            if(iconName === icon.iconName){
                i = idx;
            }
        })
    }


    return (
        <div
            name={name}
            value={value}
            onClick={typeof(onClick) !== 'undefined' ? () => onClick(value) : null} 
            className={styles.iconContainer} style={ iconColor ? { color : iconColor} : '#222' }>
            {ICONS[i].icon}
        </div>
    )
}

export default Icon