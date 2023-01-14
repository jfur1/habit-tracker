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
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  useEffect(() => {
    if(timeframe === 1){
      var row = []
      var dow = today.getDay()
      for(var i = 0; i < 7; i++){
        row.push(days[i])
      }
      setLabels(row)
    }
    else if(timeframe === 2){
      const nDays = daysInMonth(today.getMonth(), today.getFullYear());
      setLabels([...Array(nDays).keys()])
    }
    else if(timeframe === 3){
      const startDate = new Date(habit.created)
      // To calculate the time difference of two dates
      var Difference_In_Time = today.getTime() - startDate.getTime();
      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      Difference_In_Days = Math.round(Difference_In_Days)
      // var row = []
      // for(var i = 0; i <= Difference_In_Days; i++){
      //   row.push()
      // }
      setLabels([...Array(Difference_In_Days).keys()])
    }

  }, [timeframe])
  

  // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
  const daysInMonth = (iMonth, iYear) => {
    return 32 - new Date(iYear, iMonth, 32).getDate();
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
        label: 'Goal Completion',
        data: entries?.map((entry) => entry.frequency),
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