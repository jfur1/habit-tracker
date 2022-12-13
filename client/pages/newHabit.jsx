import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'
import styles from '../styles/newHabit.module.scss'
import NavBar from '../src/components/NavBar.jsx'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/router'

const NewHabit = ({ setShowNewHabitForm }) => {
  const router = useRouter()
  const colors = [
    '#E74C3C',
    '#F4D03F',
    '#2ECC71',
    '#3498DB',
    '#9B59B6',
    '#D2B48C',
    '#AAB7B8'
  ];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const [counter, setCounter] = useState(1);
  const [colorIdx, setColorIdx] = useState(0)
  const [selectedDays, setSelectedDays] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    schedule: '',
    frequency: 1,
    units: 'times',
    type: true,
    icon: 0
  });
  const { title, description, schedule, frequency, units, type, icon } = formData

  const onChange = (e) => {
      setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      }))
  }

  const handleFrequencyFilter = (selection) => {
    if(selection === 'everyday'){
      if(selectedDays.length === 7)
        setSelectedDays([])
      else
        setSelectedDays(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    }
    else if(selection === 'weekdays'){
      if(selectedDays.length===5 && !selectedDays.includes("Sat") && !selectedDays.includes("Sun"))
        setSelectedDays([])
      else 
        setSelectedDays([ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    }
    else if(selection === 'weekends'){
      if(selectedDays.length===2 && selectedDays.includes("Sat") && selectedDays.includes("Sun"))
        setSelectedDays([])
      else
        setSelectedDays(['Sun', 'Sat'])
    }

    else if(selectedDays.includes(selection)){
      const index = selectedDays.indexOf(selection);
      if (index > -1) { // only splice array when item is found
        selectedDays.splice(index, 1); // 2nd parameter means remove one item only
        setSelectedDays([...selectedDays])
      }
    }
    else{
      console.log('Adding ', selection)
      selectedDays.push(selection)
      setSelectedDays([...selectedDays])
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // if(!title || !schedule)

    const postData = async() => {

      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user.user_id;

      const habitData = {
          user_id: user_id,
          title: title,
          schedule: selectedDays.toString(),
          frequency: frequency,
          units: units,
          type: type,
          description: description,
          color: colors[colorIdx],
          icon: icon
        }
        const headers = {
          "Authorization": "Bearer " + user.token,
          "Content-Type": 'application/json'
        }
        const res = await Axios.post(process.env.API_URL + `habits/` + user_id, habitData, {
          headers: headers
        });

        return res;
    }

    postData().then((data) => {
      if(data.status === 201){
        console.log('Results after trying to create new habit:', data)
        // Close form after success
        setShowNewHabitForm(false)
      }
    })

  }


  return (
    <>
      <div id="modal" className={`${styles.modalOpen}`}>
        <div className={styles.contentTable}>
          <div className={styles.contentCell}>
            <div className={styles.modalInner}>
              <div className={styles.modalHeader}>
                <span className={styles.cancel} data-modal-close="" aria-label="Exit goal form" onClick={() => setShowNewHabitForm(false)}>
                  Cancel
                </span>
                <h2 className={styles.formTitle}>New Habit</h2>
                <span className={styles.submit} data-modal-close="" aria-label="Submit new goal" onClick={onSubmit}>
                  Submit
                </span>
              </div>

              <div className={styles.modalContent}>
                <form onSubmit={onSubmit}>
                    <input type="text" name="title" id='title' placeholder="Title" value={title} onChange={onChange} required/>
                    
                    <div className={styles.colorPicker}>
                    {colors.map((color, idx) => 
                      <span key={idx} className={styles.colorOption} style={{backgroundColor: color}} onClick={() => setColorIdx(idx)} >
                        {idx === colorIdx ? 
                          <FaCheck style={{margin: 0, padding: 0, color: '#fff'}}/>
                        : null}
                      </span>
                    )}
                    </div>

                    <span className={styles.horizontalLine}/>

                    <div className={styles.schedule}>
                      <h2 className={styles.title}>Schedule</h2>
                      <div className={styles.row}>
                        <p
                          className={styles.scheduleOption}
                          id={'everyday'}
                          value={`everyday`}
                          onClick={() => handleFrequencyFilter('everyday')}
                          style={selectedDays.length === 7 ? {backgroundColor: 'blue'} : {backgroundColor: 'transparent'}}
                        >Everyday</p>

                        <p 
                          className={styles.scheduleOption}
                          id={'weekdays'}
                          value={`weekdays`}
                          onClick={() => handleFrequencyFilter('weekdays')}
                          style={selectedDays.length===5 && !selectedDays.includes("Sat") && !selectedDays.includes("Sun") ? {backgroundColor: 'blue'} : {backgroundColor: 'transparent'}}
                        >Weekdays</p>
                        
                        <p 
                          className={styles.scheduleOption}
                          id={'weekends'}
                          value={`weekends`}
                          onClick={() => handleFrequencyFilter('weekends')}
                          style={selectedDays.length===2 && selectedDays.includes("Sat") && selectedDays.includes("Sun") ? {backgroundColor: 'blue'} : {backgroundColor: 'transparent'}}
                        >Weekends</p>
                        
                      </div>
                      <p className={styles.subtitle}>Or create a custom schedule</p>

                      <div className={styles.row}>
                        {weekdays.map((day, idx) => {
                          return (
                            <p 
                              className={styles.scheduleOption}
                              id={day}
                              key={idx}
                              value={day}
                              style={selectedDays.includes(day)
                                ? {backgroundColor: 'blue'} 
                                : {backgroundColor: 'transparent'}}
                              onClick={(e) => handleFrequencyFilter(day)}
                            >
                                {day}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                      
                    <span className={styles.horizontalLine}/>

                    <div className={styles.frequency}>
                      <h2 className={styles.title}>Frequency & Units</h2>
                      <div className={styles.counter}>
                        <span className={styles.counterBtn} onClick={() => setCounter(counter - 1)}>-</span>
                        <span className={styles.number}>{counter}</span>
                        <span className={styles.counterBtn} onClick={() => setCounter(counter + 1)}>+</span>
                        <p>times per day.</p>
                      </div>
                    </div>

                    <span className={styles.horizontalLine}/>

                    <div className={styles.description}>
                      <h2 className={styles.title}>Description</h2>
                      <textarea rows={3} className={styles.descInput} placeholder={`Why is this goal important?`} name='description' valuee={description} onChange={onChange}/>
                      
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewHabit