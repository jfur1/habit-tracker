import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from '../../styles/BarChart.module.scss'

const BarChart = ({ entries, habit, setCurrentStreak, setBestStreak, setTotalCompleted, setTotal }) => {
  const [completed, setCompleted] = useState([]);
  const [incompleted, setIncompleted] = useState([]);

  useEffect(() => {
    getValues(habit);
  }, [habit, entries])

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    // MUST BE SLASH
    return [year, month, day].join('/');
  }

  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const getValues = (habit) => {
    if(typeof(habit) === 'undefined' || !habit)
      return;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var targetDays = habit.schedule.split(',')
    var tmpEntries = {}, dates = [], today = new Date()
    var complete = [0, 0, 0, 0, 0, 0, 0], incomplete = [0, 0, 0, 0, 0, 0, 0]
    var maxStreak = 0, currentStreak = 0, nTotal = 0, streak = 0, total = 0

    entries?.forEach((entry) => {
      tmpEntries[entry.ymd.split('T')[0].replace(/-/g, '\/')] = {
        nCompleted: entry.frequency,
        nIncomplete: habit.frequency - entry.frequency,
        nTarget: habit.frequency,
      }
    })
    console.log('tmpEntries:', tmpEntries)
    const startDate = entries[0]?.ymd 
    console.log('First entry for the selected goal:', formatDate(startDate))

    // Base case: startDate === today
    const startDateStr = formatDate(startDate)
    const todayDateStr = formatDate(today)
    if(startDateStr === todayDateStr){
      dates.push(todayDateStr)
      labels.push(todayDateStr)
    } else {
      // To set two dates to two variables
      var date1 = new Date(startDate);
      // To calculate the time difference of two dates
      var Difference_In_Time = today.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      console.log("Number of days since start date:", Difference_In_Days)
      var j = Difference_In_Days
      for(var i = Difference_In_Days; i >= 0; i--){
        var dateOffset = (24*60*60*1000) * j;
        var dateString = formatDate(new Date(today.getTime() - dateOffset))
        dates.push(dateString)
        labels.push(dateString)
        j--;
      }
    }

    console.log("dates:", dates)

    dates.forEach((date) => {
      var dowIdx = new Date(date).getDay();
      // console.log('date:', date)
      var dayName = days[dowIdx]
      total = total + 1
      // console.log('dayName:', dayName)
      if(!tmpEntries.hasOwnProperty(date) || tmpEntries[date].nCompleted === 0){
        // No entry for this date... Check to see if habit occurs on current DOW
        if(targetDays.indexOf(dayName) >= 0){
          incomplete[dowIdx] = incomplete[dowIdx] - habit?.frequency;
          maxStreak = Math.max(maxStreak, streak)
          streak = 0;
        }
      }
      else{
        if(targetDays.indexOf(dayName) >= 0){
          complete[dowIdx] = complete[dowIdx] + tmpEntries[date].nCompleted;
          incomplete[dowIdx] = incomplete[dowIdx] - tmpEntries[date].nIncomplete;
          nTotal = nTotal + tmpEntries[date].nCompleted
          streak = streak + 1
        } 
      }
    })

    // console.log("complete:", complete)
    // console.log("incomplete:", incomplete)
    // console.log("streak:", streak)
    // console.log("bestStreak:", maxStreak)
    // console.log("nTotal:", nTotal)
    setTotalCompleted(nTotal)
    setTotal(total)
    setCurrentStreak(streak)
    setBestStreak(Math.max(maxStreak, streak))
    setCompleted(complete)
    setIncompleted(incomplete)
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Completion Frequency by Day',
      },
      legend: {
        position: 'top' ,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  
  const labels = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Completed',
        data: completed,
        backgroundColor: 'rgb(53, 162, 235)',
      },
      {
        label: 'Incomplete',
        data: incompleted,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  
  return (
    <Bar options={options} data={data} />
  )
}

export default BarChart