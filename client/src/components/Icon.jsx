import React from 'react'
import styles from '../../styles/ToDoCard.module.scss'
import { FaHeart, FaUtensils, FaYinYang, FaUniversity, FaIdCard, FaCarrot, FaPaw, FaTrashAlt, FaPhoneAlt, FaRunning, FaWeight } from 'react-icons/fa'
import { MdSmokeFree, MdNoFood, MdVideogameAssetOff, MdVideogameAsset, MdHomeRepairService } from 'react-icons/md'
import { IoIosWater, IoFastFoodOutline } from 'react-icons/io'
import { AiFillFire, AiFillCar, AiOutlineStar } from 'react-icons/ai'
import { BsCreditCard2Back, BsPinFill } from 'react-icons/bs'
import { CgGym } from 'react-icons/cg'
import { FiMail, FiSun } from 'react-icons/fi'
import { GiMeditation, GiOpenBook, GiShoppingCart } from 'react-icons/gi'
import { GrYoga } from 'react-icons/gr'


export const ICONS = [
    { iconName: 'running', icon: <FaRunning/>},
    { iconName: 'no-smoking', icon: <MdSmokeFree/>},
    { iconName: 'no-gaming', icon: <MdVideogameAssetOff/>},
    { iconName: 'diet', icon: <MdNoFood/>},
    { iconName: 'meditate', icon: <GiMeditation/>},
    { iconName: 'yoga', icon: <GrYoga/>},
    { iconName: 'gym', icon: <CgGym/>},
    { iconName: 'scale', icon: <FaWeight/>},
    { iconName: 'water', icon: <IoIosWater/>},
    { iconName: 'healthy', icon: <FaCarrot/>},
    { iconName: 'read', icon: <GiOpenBook/>},
    { iconName: 'phone', icon: <FaPhoneAlt/>},
    { iconName: 'shopping', icon: <GiShoppingCart/>},
    { iconName: 'utensils', icon: <FaUtensils/>},
    { iconName: 'fire', icon: <AiFillFire/>},
    { iconName: 'yinyang', icon: <FaYinYang/>},
    { iconName: 'pet', icon: <FaPaw/>},
    { iconName: 'trash', icon: <FaTrashAlt/>},
    { iconName: 'mail', icon: <FiMail/>},
    { iconName: 'university', icon: <FaUniversity/>},
    { iconName: 'car', icon: <AiFillCar/>},
    { iconName: 'card', icon: <BsCreditCard2Back/>},
    { iconName: 'personal', icon: <FaIdCard/>},
    { iconName: 'repair', icon: <MdHomeRepairService/>},
    { iconName: 'sun', icon: <FiSun/>},
    { iconName: 'pin', icon: <BsPinFill/>},
    { iconName: 'favorite', icon: <AiOutlineStar/>},
    { iconName: 'heart', icon: <FaHeart/>},
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