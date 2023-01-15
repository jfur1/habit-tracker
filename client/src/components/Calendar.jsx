import React, { useState, useEffect } from 'react'
import styles from '../../styles/Calendar.module.scss'
import { BiChevronDown } from 'react-icons/bi'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Calendar = ({ entries, habit }) => {

  var today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  const [selectYear, setSelectYear] = useState(currentYear)
  const [selectMonth, setSelectMonth] = useState(currentMonth)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthsFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // d: Date
  // Function returns entry for a given date, and [] if none exists
  // Compares Date.toString() === entries[x].ymd.split('T')[0]
  //      i.e, Compare dates, while ignoring timestamps
  const getEntryForDate = (d) => {
    // Pad month & date if needed
    const monthIdx = (d.getMonth() <= 8) ? ('0'+ (d.getMonth() + 1)): (d.getMonth() + 1)
    const dayIdx = (d.getDate() <= 9) ? ('0'+ d.getDate()) : d.getDate()
    const tmpYmd = d.getFullYear() + '-' + monthIdx + '-' + dayIdx

    return entries?.filter((entry) => entry.ymd.split('T')[0] === tmpYmd)
  }
  
  // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
  const daysInMonth = (iMonth, iYear) => {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  const daysInPrevMonth = (iMonth, iYear) => {
    let tmpMonth = iMonth
    let tmpYear = iYear

    // If we want nDays in prev month, when current month is January (idx = 0), 
    // then "dencrement" month from 0 to 11 and decrement year by 1
    if(iMonth === 0)
      tmpMonth = 11
      tmpYear = iYear - 1

    return 32 - new Date(tmpYear, tmpMonth, 32).getDate();
  }

  const next = () => {
    if(selectMonth === 11)
      setSelectYear(selectYear + 1)

    setSelectMonth((selectMonth + 1) % 12)
  }

  const previous = () => {
      console.log('PREVIOUS -- selectMonth: ', selectMonth)
      console.log('PREVIOUS -- selectYear: ', selectYear)
      if(selectMonth === 0){
        setSelectYear(selectYear - 1)
        setSelectMonth(11)
      }

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
      <tr className={styles['calendar-table-row'] + ' ' + styles['day-names']}>
      {weekdayshort.map(day => (
          <span key={day} className={styles['week-day'] + ' ' + (day === weekdayshort[todayIdx] && currentYear === selectYear ? styles['today'] : '')}>
            {day.substring(0, 2)}
          </span>
      ))}
      </tr>
    )
  }

  // Takes hex value and a desired opacity, and returns rgba value as a string
  const hexToRgbA = (hex, opacity) => {
      var opacitySuffix = `, ${opacity})`
      var c;
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          c= hex.substring(1).split('');
          if(c.length== 3){
              c= [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c= '0x'+c.join('');
          return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+opacitySuffix;
      }
      throw new Error('Bad Hex');
  }


  const CalendarDays = ({ month, year }) => {
    let firstDay = (new Date(year, month)).getDay();
    let largestPrevBlankDate = daysInPrevMonth(month, year);
    let j = firstDay

    console.log(firstDay)
    let blanks = [];

    for (let i = 0; i < firstDay; i++) {
      blanks.push(
        <td key={'front-empty-'+i} className={styles["calendar-day"] + ' ' + styles["empty"]}>{largestPrevBlankDate - j}</td>
      );
      j--;
    }

    let weeklyRows = [];
    let nDaysInMonth = daysInMonth(month, year)
    let tmpEntry, tmpDate, dateString, shortDayName
    var cellStyle = {}
    const startYMD = !!entries ? entries[0]?.ymd.split('T')[0].replace(/-/g, '\/') : firstDay
    var startDate = new Date(startYMD);
    console.log("startDate:",startDate)

    for (let d = 1; d <= nDaysInMonth; d++) {
      // Get entry for this day
      tmpDate = new Date(year, month, d)
      dateString = tmpDate.toDateString()
      shortDayName = dateString.split(' ')[0]
      tmpEntry = getEntryForDate(tmpDate)
      cellStyle = {
        background: '',
        outline: '',
      };
      
      if(tmpEntry?.length > 0){
        console.log('Calendar found entry for date: ', tmpEntry[0].ymd)
        console.log('nCompleted on this date: ', tmpEntry[0].frequency)
        console.log('nTarget for this date: ', habit.frequency)
        
        // Case 2: Semi-Complete (tmpEntry[0].frequency > 0 && tmpEntry[0].frequency < habit.frequency)
        if(tmpEntry[0].frequency >= 0 && tmpEntry[0].frequency < habit.frequency){
          cellStyle.outline = '1px solid' + habit.color
          var opacityPercent = (tmpEntry[0].frequency / habit.frequency).toString()
          // console.log('opacity:', opacityPercent)
          var rgba = hexToRgbA(habit.color, opacityPercent)
          // console.log("RGBA VALUE: ", rgba)
          cellStyle.backgroundColor = rgba

        }

        // Case 3: Complete (tmpEntry[0].frequency === habit.frequency)
        else if(tmpEntry[0].frequency === habit.frequency){
          cellStyle.backgroundColor = habit.color
        }
        console.log(cellStyle)
      } 
      // Blanks -- must occur in same month and only according to habit.schedule
      else if(tmpDate.getTime() <= today.getTime() && tmpDate.getTime() >= startDate.getTime() && habit?.schedule.indexOf(shortDayName) >= 0) {
        // Case 1: Incomplete (tmpEntry[0].frequency === 0) && ymd less than today
        cellStyle.outline = '1px solid' + habit?.color
      }
      weeklyRows.push(
        <td
          key={'calendar-day-'+d} 
          style={{
            backgroundColor: cellStyle.backgroundColor,
            outline: cellStyle.outline
          }}
          className={styles["calendar-day"] + ' ' + (d === today.getDate() && currentYear === selectYear ? styles['today'] : '')}
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
          let nTrailingBlanks = 6 - (i % 7)

          for(let n=0; n < nTrailingBlanks; n++){
            cells.push(
              <td key={'back-empty-'+n} className={styles["calendar-day"] + ' ' + styles["empty"]}>{n+1}</td>
            )
          }

          rows.push(cells);
        }
      }); 
    return (
      rows.map((d, i) => {
        // console.log(i)
        return <tr key={'row-'+i} className={styles['calendar-table-row']}>{d}</tr>;
      })
    )
  }

  return (
    <div className={styles["calendar"]}>

        <div className={styles['calendar-header']}>
          <IoIosArrowBack className={styles["previous"]} onClick={previous}/> 

          <div className={styles["center"]}>
            <h2 className={styles["monthName"]}>{months[selectMonth]} {selectYear}</h2>
            {/* <BiChevronDown className={styles["dropdown"]}/> */}
          </div>

          <IoIosArrowForward
            className={styles["next"] + ' ' + (currentMonth === selectMonth && currentYear === selectYear ? styles['invisible'] : null)}
            onClick={next}
          />
      </div>


      <div className={styles['calendar-card-body']}>
        <DayNames/>
        <CalendarDays month={selectMonth} year={selectYear}/>
      </div>

    </div>
  )
}

export default Calendar