import React from 'react'
import Axios from 'axios'
import styles from '../styles/Stats.module.scss'
import NavBar from '../src/components/NavBar.jsx'
import Dropdown from '../src/components/Dropdown.jsx'
import { AuthContext, useAuth } from '../src/contexts/auth-context.js'
import { useDataContext } from '../src/contexts/data-context.js'

const stats = () => {
  const { user } = useAuth();
  const { habits, entries } = useDataContext();

  return (
    <div className={styles["main"]}>
      <h1 className={styles["title"]}>Stats</h1>
      <Dropdown/>
      <NavBar currentIdx={3}/>
    </div>
  )
}

// // This gets called on every request
// export async function getServerSideProps(context) {
//     const authContext = useAuth();
//     const headers = {
//           "Authorization": "Bearer " + user.token,
//           "Content-Type": 'application/json',
//           "id": user.user_id
//         }
//     try {
//         // Fetch data from external API
//         const res = await Axios.get(process.env.API_URL + 'habits')
//         const data = await res.json()
//         return data;
//     } catch (err) {
//         console.error(err);
//         // context.res.writeHead(307, {
//         //     Location: '/login'
//         // })
//         // context.res.end();
//         return {
//           redirect: {
//             destination: '/login',
//             permanent: false,
//           },
//         }
//     }
//   // Pass data to the page via props
//   return { props: { data } }
// }

export default stats