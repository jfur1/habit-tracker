import React, { useState } from 'react'
import styles from '../styles/newHabit.module.scss'
import NavBar from '../src/components/NavBar.jsx'
import { FaCheck } from 'react-icons/fa'

const NewHabit = ({ setShowNewHabitForm }) => {
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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const { title, description } = formData

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
                <span className={styles.submit} data-modal-close="" aria-label="Submit new goal" onClick={() => {}}>
                  Submit
                </span>
              </div>

              <div className={styles.modalContent}>
                <form>
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
                        <p className={styles.scheduleOption}>Everyday</p>
                        <p className={styles.scheduleOption}>Weekdays</p>
                        <p className={styles.scheduleOption}>Weekends</p>
                        
                      </div>
                      <p className={styles.subtitle}>Or create a custom schedule</p>

                      <div className={styles.row}>
                        {weekdays.map((day) => {
                          return <p className={styles.scheduleOption}>{day}</p>
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
                      <textarea rows={4} className={styles.descInput} placeholder={`Why is this goal important?`}/>
                      
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