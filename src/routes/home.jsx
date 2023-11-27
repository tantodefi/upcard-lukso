import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Loading from './components/LoadingSpinner'
import { CheckIcon, ChromeIcon, BraveIcon } from './components/icons'
import toast, { Toaster } from 'react-hot-toast'
import slide1 from './../assets/atenyuncard.png'
import slide2 from './../assets/tantocard.png'
import styles from './Home.module.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { useAuth } from './../contexts/AuthContext'

function Home({ title }) {
  Title(title)
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  const handleConnect = () => {
    auth.connectWallet().then((addr) => {
      if (typeof addr !== 'undefined') {
        toast(`UP Address fetched`, { icon: '🆙', duration: 6000 })
        auth.setWallet(addr)
        auth.fetchProfile(addr).then((profile) => {
          toast(`UP Metadata fetched`, { icon: '🆙', duration: 6000 })
          auth.setProfile(profile)
        })
      }
    })
  }

  return (
    <>
      {isLoading && <Loading />}

      <section className={styles.section}>
        <div className={`__container text-center`} data-width="small">
      
            {auth.isUPinstalled() === false && <>Please install Universal Profile to use this Dapp!</>}

            <h6 className="mb-10">
              <b>Get your UPcard NFT</b>
            </h6>
            <p>
             Add more value and data to your next web3 address
            </p>
            <div className={`mt-30 ${styles.slider}`}>
              <Carousel>
              <div>
                  <img src={slide1} />
                  <p className="legend">@atenyun</p>
                </div>
                <div>
                  <img src={slide2} />
                  <p className="legend">@tentodefi</p>
                </div>
              </Carousel>
            </div>

            {auth.isWalletConnected && auth.wallet ? (
              <>
                <button className={`btn animate__animated animate__fadeInUpBig`} onClick={() => navigate(`/usr/${auth.wallet}`)}>
                 <span className='animate__animated animate__heartBeat animate__infinite' style={{display:'inline-block'}}>🦄</span>
                  Get Yours
                </button>
              </>
            ) : (
              <>
                <button className="btn" onClick={() => handleConnect()}>
                  <span className='animate__animated animate__swing animate__infinite' style={{display:'inline-block'}}>🆙</span>
                  Connect Wallet
                </button>
              </>
            )}

            <UPExtension />
          </div>
      </section>
    </>
  )
}

const UPExtension = () => {
  return (
    <div className={styles.UPextension}>
      Don't have Universal Profile on your browser?
      <a href="https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn" target="_blank">
        <ChromeIcon />
      </a>
      <a href="https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn" target="_blank">
        <BraveIcon />
      </a>
    </div>
  )
}

export default Home
