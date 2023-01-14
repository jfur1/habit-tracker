import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import styles from '../../styles/Graph.module.scss'
import { Line } from 'react-chartjs-2';

const Graph = ({ entries, habit, timeframe }) => {
  var today = new Date();
  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  useEffect(() => {
    console.log(entries)
    getValues(timeframe)
  }, [habit, timeframe])
  
  const getValues = (timeframe) => {
    var labels = [], data = [], dates = [], tmpEntries = {}, today = new Date()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    entries?.forEach((entry) => {
      tmpEntries[entry.ymd.split('T')[0]] = entry.frequency
    })
    console.log('tmpEntries:', tmpEntries)

    // Past 7 days
    if(timeframe === 1){
      const dow = today.getDay();
      var i = (dow - 1 < 0) ? 6 : dow - 1;
      var dateOffset = (24*60*60*1000) * 7; // 7 days
      var j = 6
      while(true){
        if(i === dow)
          break;
        labels.push(days[i])
        var dateOffset = (24*60*60*1000) * j;
        var dateString = formatDate(new Date(today.getTime() - dateOffset))
        dates.push(dateString)
        i = (i - 1 < 0) ? 6 : i - 1;
        j--;
      }
      labels.push(days[dow]);
      var dateString = formatDate(today)
      dates.push(dateString)
    } 
    // Past 31 Days (past month)
    else if(timeframe === 2){
      const nDaysThisMonth = 31
      var j = 31
      for(var i = nDaysThisMonth; i >= 0; i--){
        var dateOffset = (24*60*60*1000) * j;
        var dateString = formatDate(new Date(today.getTime() - dateOffset))
        dates.push(dateString)
        labels.push(dateString)
        j--;
      }
      labels.push(formatDate(today))
    } 
    // From StartDate -- Today
    else if(timeframe === 3){
      const startDate = entries[0].ymd
      console.log('First entry for the selected goal:', formatDate(startDate))
      // To set two dates to two variables
      var date1 = new Date(startDate);
      // To calculate the time difference of two dates
      var Difference_In_Time = today.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      console.log("Difference_In_Days:", Difference_In_Days)
      var j = Difference_In_Days
      for(var i = Difference_In_Days; i >= 0; i--){
        var dateOffset = (24*60*60*1000) * j;
        var dateString = formatDate(new Date(today.getTime() - dateOffset))
        dates.push(dateString)
        labels.push(dateString)
        j--;
      }
      // console.log("dates:", dates)
    }

    dates.forEach((date) => {
      if(!tmpEntries.hasOwnProperty(date))
        data.push(0)
      else
        data.push(tmpEntries[date])
    })

    console.log("Actual Entries:", entries)
    console.log('data:', data)
    console.log('labels:', labels)
    setLabels(labels);
    setValues(data);
  }

  // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
  const daysInMonth = (iMonth, iYear) => {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  )

  const options = {
    responsive: true,
    scales: {
      y: {
          beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        lineTension: 0.5,
        label: 'Goal Completion',
        data: values,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.25)',
      },
    ],
  };

  return (
    <Line options={options} data={data} />
  )
}

export default Graph