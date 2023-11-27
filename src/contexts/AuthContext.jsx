import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// import { user } from '../util/api'
import { ERC725 } from '@erc725/erc725.js'
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json'
import toast, { Toaster } from 'react-hot-toast'
import Web3 from 'web3'

export const PROVIDER = window.lukso
export const web3 = new Web3(PROVIDER)

export const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}

export const isAuth = async () =>  await localStorage.getItem('accessToken')

export const chainID = async () => await web3.eth.getChainId()

/**
 * Fetch Universal Profile
 * @param {address} addr
 * @returns
 */
export const fetchProfile = async (addr) => {
  const erc725js = new ERC725(lsp3ProfileSchema, addr, PROVIDER, {
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
  })
  return await erc725js.fetchData('LSP3Profile')
}

/**
 * Connect wallet
 */
export const connectWallet = async () => {
  let loadingToast = toast.loading('Loading...')

  try {
    let accounts = await web3.eth.getAccounts()
    if (accounts.length === 0) await web3.eth.requestAccounts()
    accounts = await web3.eth.getAccounts()
    toast.dismiss(loadingToast)
    toast.success(`UP successfuly connected`)
    return accounts[0]
  } catch (error) {
    toast.error(error.message)
    toast.dismiss(loadingToast)
  }
}

/**
 * Connect wallet
 */
export const isWalletConnected = async () => {
  console.info('Check if wallet is connected...')

  try {
    let accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (error) {
    toast.error(error.message)
  }
}

export const isUPinstalled = () => {
  if (PROVIDER && PROVIDER.isUniversalProfileExtension) return true
  else return false
}

export function AuthProvider({ children }) {
  const [wallet, setWallet] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  function logout() {
    localStorage.removeItem('accessToken')
    navigate('/login')
    setUser(null)
  }
  function resetPassword() {}

  useEffect(() => {
    if (isUPinstalled()) {
      isWalletConnected().then((addr) => {
        if (typeof addr !== 'undefined') {
          setWallet(addr)
          fetchProfile(addr).then((profileData) => {
            setProfile(profileData)
          })
        }
      })
    }

    // isAuth().then((res) => {
    //   setLoading(false)
    //   if (res) {
    //     console.log(res)
    //     setUser(res)
    //   } else {
    //     navigate('/login')
    //   }
    // })
  }, [])

  const value = {
    wallet,
    setWallet,
    profile,
    isUPinstalled,
    fetchProfile,
    setProfile,
    isWalletConnected,
    connectWallet,
    logout,
    resetPassword,
  }

  //if (!wallet) return <>Loading... !user</>

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
