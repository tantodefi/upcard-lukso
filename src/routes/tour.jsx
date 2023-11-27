import { useState, Suspense, useEffect } from 'react'
import { defer, Await, useNavigate, useLoaderData } from 'react-router-dom'
import { getTour } from '../util/api'
import { Title } from './helper/DocumentTitle'
import Shimmer from './helper/Shimmer'
import Icon from './helper/MaterialIcon'
import styles from './Tour.module.scss'
import AddNetworkButton from './components/AddNetworkButton'
import Loading from './components/LoadingSpinner'
import { CheckIcon, ChromeIcon, BraveIcon } from './components/icons'
import upcardqr from '../assets/upcardQRcode.png'
import GetUPButtonChrome from './components/GetUPButtonChrome'
import GetUPButtonFirefox from './components/GetUPButtonBrave'

export const loader = async () => {
  return defer({
    tour: [
      {
        title: 'UPcard',
        description: 'Generate an awesome QR code and mint a web3 debit UPcard!',
      },
      {
        title: 'You need 🆙',
        description: 'Make sure you have a Universal Profile',
      },
      {
        title: 'UP your game',
        description: 'Mint yours today for Lukso Mainnet',
      },
    ],
    isTourSeen: await localStorage.getItem('tour'),
  })
}

function Tour({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState()
  const [data, setData] = useState([])
  const [activeTour, setActiveTour] = useState(0)
  const navigate = useNavigate()

  const handleStart = () => {
    localStorage.setItem('tour', true)
    navigate('/home')
  }

  useEffect(() => {
    if (JSON.parse(loaderData.isTourSeen)) navigate('/home')
  }, [])

  return (
    <section className={styles.section}>
      <Suspense fallback={<Loading />}>
        <Await
          resolve={loaderData.tour}
          errorElement={<div>Could not load data 😬</div>}
          children={(data) => (
            <>
              {activeTour > 0 && (
                <div className={styles.arrowBack}>
                  <button onClick={() => setActiveTour((activeTour) => activeTour - 1)} className="animate__animated animate__fadeIn">
                    <Icon name={`navigate_before`} />
                  </button>
                </div>
              )}

              {data
                .filter((item, i) => i == activeTour)
                .map((item, b) => (
                  <div className="d-flex flex-column align-items-center justify-content-center animate__animated animate__fadeIn" key={b}>
                    {activeTour === 0 && <img src={upcardqr} style={{height: '200px'}}/>}
                    <b>{item.title}</b>
                    <p>{item.description}</p>
                    {activeTour === 1 && (
                      <>
                        <GetUPButtonFirefox />
                        <GetUPButtonChrome />
                        <AddNetworkButton />
                      </>
                    )}
                    <div className={`${styles.pagination}`}>
                      {data.map((item, i) => (
                        <span className={`${activeTour == i ? styles.active : ''}`} key={i}></span>
                      ))}
                    </div>
                  </div>
                ))}

              {activeTour < 2 && (
                <div className={styles.arrowNext}>
                  <button onClick={() => setActiveTour((activeTour) => activeTour + 1)}>
                    <Icon name={`navigate_next`} />
                  </button>
                </div>
              )}

              {activeTour === 2 && (
                <div className={styles.arrowDone}>
                <button onClick={() => handleStart()}>
                  <Icon name={`done`} />
                </button>
                </div>
              )}
            </>
          )}
        />
      </Suspense>
    </section>
  )
}

const TourShimmer = () => {
  return (
    <>
      <ul className={styles.shimmer}>
        <li></li>
        <li></li>
      </ul>
    </>
  )
}

export default Tour
