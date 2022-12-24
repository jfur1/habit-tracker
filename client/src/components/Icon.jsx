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
    { iconName: 'running', icon: <FaRunning />},
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


const Icon = ({ index, iconName, iconColor, onClick, name, value, squareSize, numerator, denominator, strokeWidth, showIcon, showRings, showStat }) => { 

    let i = index

    if(!index && !iconName && index !== 0){
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

    // Size of the enclosing square
    const sqSize = squareSize;
    // percent = parseFloat(numerator) / parseFloat(denominator)
    const percent = (parseFloat(parseFloat(numerator) / parseFloat(denominator)* 100)).toFixed(2);
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percent / 100;

    const fillColor = null;

    const Cirlces = () => {
        return (
            <svg
            width={sqSize}
            height={sqSize}
            viewBox={viewBox}>
            <circle
                className={styles.circleBackground}
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`} />
                <circle
                className={styles.circleProgress}
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                // Start progress marker at 12 O'Clock
                transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset,
                    stroke: iconColor
                }}/>
            </svg>
        )
    }

    return (


            <svg
                width={sqSize}
                height={sqSize}
                viewBox={viewBox}    
            >

                
              {showRings ?
                <>
                <Cirlces/>
                {showStat
                    ? 
                    <text
                        className={styles.circleText}
                        style={{fill: 'white'}}
                        x="50%"
                        y="50%"
                        dy=".3em"
                        textAnchor="middle"
                    >
                    {/* {percent} */}
                    ({numerator} / {denominator})
                    </text> 
                    : null}
                </>
                : null}
 
            {showIcon || !showRings
                ? 
                <g
                    onClick={typeof(onClick) !== 'undefined' ? () => onClick(value) : null}
                    style={{
                        transform: `translateY(25%) translateX(25%) scale(2.0)`,
                        color: iconColor
                    }}
                >
                    {ICONS[index].icon}
                </g>
                // ICONS[i].icon
            : null }
            
            </svg>
    )
}

Icon.defaultProps = {
    squareSize: 65,
    percentage: 25,
    strokeWidth: 4,
    numerator: 0,
    denominator: 7,
    showRings: false,
    showIcon: true,
    showStat: false,
  }; 
  

export default Icon