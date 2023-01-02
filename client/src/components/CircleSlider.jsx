import React from 'react'
import styles from '../../styles/CircleSlider.module.scss'

const CircleSlider = ({ squareSize, strokeWidth, numerator, denominator,color }) => {
    
    // Size of the enclosing square
    const sqSize = squareSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * (numerator / denominator); 
    
    return (
        <svg
            width={sqSize}
            height={sqSize}
            viewBox={viewBox}>
            <circle
            className={styles["circle-background"]}
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`calc(${strokeWidth}px - 2px)`} />
            <circle
            className={styles["circle-progress"]}
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            style={{
                stroke: color,
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset
            }} />
            <text
            className={styles["circle-text"]}
            style={{ fill: 'white' }}
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {`${numerator} / ${denominator}`}
            </text>
        </svg>
    );
}

CircleSlider.defaultProps = {
    sqSize: 200,
    percentage: 25,
    strokeWidth: 10
};

export default CircleSlider