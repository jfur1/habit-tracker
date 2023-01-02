import React, { useState, useEffect } from 'react'
import styles from '../../styles/Calendar.module.scss'

const Calendar = () => {

  var today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  const [selectYear, setSelectYear] = useState(currentYear)
  const [selectMonth, setSelectMonth] = useState(currentMonth)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthsFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
  const daysInMonth = (iMonth, iYear) => {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  const next = () => {
    if(selectMonth === 11)
      setSelectYear(selectYear + 1)

    setSelectMonth((selectMonth + 1) % 12)
  }

  const previous = () => {
      console.log('PREVIOUS -- selectMonth: ', selectMonth)
      console.log('PREVIOUS -- selectYear: ', selectYear)
      if(selectMonth === 0)
        setSelectYear(selectYear - 1)

      if(selectMonth === 0)
        setSelectMonth(11)
      else
        setSelectMonth(selectMonth - 1)
  }

  const jump = () => {
    showCalendar(selectMonth, selectYear);
  }

  const DayNames = () => {
    let weekdayshort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const todayIdx = today.getDay()
  
    return (
      <div className={styles.dayNames}>
      {weekdayshort.map(day => (
          <span key={day} className={styles['week-day'] + ' ' + (day === weekdayshort[todayIdx] ? styles['today'] : '')}>
            {day.substring(0, 2)}
          </span>
      ))}
      </div>
    )
  }

  const CalendarDays = ({ month, year }) => {
    let firstDay = (new Date(year, month)).getDay();

    let blanks = [];

    for (let i = 0; i < firstDay; i++) {
      blanks.push(
        <td className={styles["calendar-day"] + ' ' + styles["empty"]}>{""}</td>
      );
    }

    let weeklyRows = [];
    let nDaysInMonth = daysInMonth(month, year)

    for (let d = 1; d <= nDaysInMonth; d++) {
      weeklyRows.push(
        <td 
          key={d} 
          className={styles["calendar-day"] + ' ' + (d === today.getDate() ? styles['today'] : '')}
        >
          <p className={styles['number']}>{d}</p>
        </td>
      );
    }

    var totalSlots = [...blanks, ...weeklyRows];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
          cells.push(row); // if index not equal 7 that means not go to next week
        } else {
          rows.push(cells); // when reach next week we contain all td in last week to rows 
          cells = []; // empty container 
          cells.push(row); // in current loop we still push current row to new container
        }
        if (i === totalSlots.length - 1) { // when end loop we add remain date
          rows.push(cells);
        }
      }); 
    return (
      rows.map((d, i) => {
        // console.log(i)
        return <tr key={i} className={styles['calendar-table-row']}>{d}</tr>;
      })
    )
  }

  return (
    <div className={styles["calendar"]}>
      <div className={styles['calendar-card-body']}>
        <div className={styles['calendar-header']}>
          <p className={styles["previous"]} onClick={previous}>&larr;</p>
          <h2 className={styles["monthName"]}>{months[selectMonth]} {selectYear}</h2>
            <p className={styles["next"] + ' ' + (currentMonth === selectMonth && currentYear === selectYear ? styles['invisible'] : null)} onClick={next}>&rarr;</p>
        </div>
        <DayNames/>
        <CalendarDays month={selectMonth} year={selectYear}/>
      </div>
    </div>
  )
}

export default Calendar