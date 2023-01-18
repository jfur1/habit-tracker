import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Settings.module.scss'

const help = () => {
  const router = useRouter();
  const goBack = () => {
    router.push('/settings')
  }
  return (
    <div className={styles["help"] + ' ' +  styles["container"]}>
      <div className={styles["top"]}>
          <span className={styles.backBtnContainer}>
              <p className={styles["backBtn"]} onClick={goBack}>&larr;</p>
          </span>
          <h1 className={styles["title"]}>Help & Support</h1>
      </div>

      <div className={styles["faq"]}>
        <h3 className={styles["title"]}>FAQ</h3>

        <p className={styles["question"]}>Why is the sky blue?</p>
        <p className={styles["answer"]}>
          {`As white light passes through our atmosphere, tiny air molecules cause it to 'scatter'. The scattering caused by these tiny air molecules (known as Rayleigh scattering) increases as the wavelength of light decreases. Violet and blue light have the shortest wavelengths and red light has the longest.`}
        </p>

        <p className={styles["question"]}>Lorem Ipsum</p>
        <p className={styles["answer"]}>
          {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis beatae quisquam enim voluptate non aliquid veniam voluptas voluptatem temporibus consectetur sunt eaque tenetur earum doloremque ut, fuga ex impedit.`}
        </p>


        <p className={styles["question"]}>Lorem Ipsum</p>
        <p className={styles["answer"]}>
          {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis beatae quisquam enim voluptate non aliquid veniam voluptas voluptatem temporibus consectetur sunt eaque tenetur earum doloremque ut, fuga ex impedit.`}
        </p>
      </div>

      <div className={styles["support"]}>
        <h3 className={styles["title"]}>Contact Us</h3>
        <p className={styles["subtitle"]}>Have questions? Get in touch, free of charge.</p>
        <p className={styles["email"]}>{`habit-tracker-support@gmail.com`}</p>
      </div>

    </div>
  )
}

export default help