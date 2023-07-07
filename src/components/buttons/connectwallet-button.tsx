import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { init, useConnectWallet, useWallets, useNotifications } from '@web3-onboard/react'; 
import injectedModule from '@web3-onboard/injected-wallets';
import blocknativeIcon from '../../icons/blocknative-icon';
import blocknativeLogo from '../../icons/blocknative-logo';

const injected = injectedModule()

const infuraKey = '41ef22565fa44e12b22948ce23c0f5ce'

// initialize Onboard
const initWeb3Onboard: any = init({
    wallets: [injected],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum',
        rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`
      },
      {
        id: '0xAA36A7',
        token: 'ETH',
        label: 'Sepolia',
        rpcUrl: `https://sepolia.infura.io/v3/${infuraKey}`
      },
      {
        id: '0x5',
        token: 'ETH',
        label: 'Goerli',
        rpcUrl: `https://goerli.infura.io/v3/${infuraKey}`
      },
      {
        id: '0x539',
        token: 'ETH',
        label: 'Hardhat',
        rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`
      }
    ],
    appMetadata: {
       name: 'Blocknative Web3-Onboard',
       icon: blocknativeIcon, // svg string of icon
       logo: blocknativeLogo, // svg string of logo
       description: 'Demo app for Web3-Onboard',
       recommendedInjectedWallets: [
         { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
         { name: 'MetaMask', url: 'https://metamask.io' }
       ],
       agreement: {
         version: '1.0.0',
         termsUrl: 'https://www.blocknative.com/terms-conditions',
         privacyUrl: 'https://www.blocknative.com/privacy-policy'
       },
       gettingStartedGuide: 'https://blocknative.com', // DApp guide to getting started
       explore: 'https://blocknative.com'
     },
     apiKey: '3039429b-4c44-466a-944c-d29db4ca33c9',
     notify: {
       desktop: {
         enabled: true,
         position: 'topRight',
         transactionHandler: transaction => {
           console.log({ transaction })
           console.log("submitting transaction")
           if (transaction.eventCode === 'txPool') {
             return {
               autoDismiss: 5000,
               // message: 'Your transaction is in the pool, hope you brought a towel',
               // or you could use onClick for when someone clicks on the notification itself
               onClick: () =>
                 window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`)
             }
           }
         }
       },
       mobile: {
         enabled: true,
         position: 'bottomRight', // mobile defaults to top and bottom 
         // so the left/right is ignored in this case
         transactionHandler: transaction => {
           console.log({ transaction })
           if (transaction.eventCode === 'txPool') {
             return {
               autoDismiss: 0,
               message: 'Your transaction message on mobile',
             }
           }
         }
       }
     }
   })


export const ConnectWalletButton: React.FC = () => {
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    // const [{ connectedChain }, setChain] = useSetChain()
    const [notifications] = useNotifications()
    const connectedWallets = useWallets()
    
    const [web3Onboard, setWeb3Onboard] = useState(null)
    
    // const [toAddress, setToAddress] = useState('')
    // const [notifyPosition, setNotifyPosition] = useState('bottomRight')

    useEffect(() => {
      setWeb3Onboard(initWeb3Onboard)
    }, [])

    useEffect(() => {
      console.log(notifications)
    }, [notifications])

    useEffect(() => {
        if (!connectedWallets.length || !wallet) return
        console.log('connectedWallets: ', connectedWallets)
        console.log('primary wallet: ', wallet)
    }, [connectedWallets, wallet])

    useEffect(() => {
        let provider: any = null;
        if (!wallet?.provider) {
            provider = null
            console.log("no provider: " + provider);
        } else {
            provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
            console.log("Changed provider: " + provider);
        }
    }, [wallet])

    // const readyToTransact = async () => {
    //     if (!wallet) {
    //         const walletSelected = await connect()
    //         if (!walletSelected) return false
    //     }

    //     if (connectedChain && connectedChain.id === '0x5') {
    //         // prompt user to switch to Sepolia for test
    //         await setChain({ chainId: '0x5' })
    //     }

    //     return true
    // }

    // const sendTransaction = async () => {
    //     if (!toAddress) {
    //         alert('An Ethereum address to send Eth to is required.')
    //         return
    //     }

    //     const signer = provider.getUncheckedSigner()

    //     await signer.sendTransaction({
    //         to: toAddress,
    //         value: 100000000000000
    //     })
    // }

    // const sendHash = async () => {
    //     if (!toAddress) {
    //       alert('An Ethereum address to send Eth to is required.')
    //       return
    //     }
      
    //     const signer = provider.getUncheckedSigner()
      
    //     await signer.sendTransaction({
    //       to: toAddress,
    //       value: 1000000000000000
    //     })
    //   }


    if (!web3Onboard) return <div>Loading...</div>
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={connecting}
            onClick={() =>
                wallet ? disconnect({ label: wallet.label }) : connect()
        }
        >
        {connecting
            ? 'Connecting'
            : wallet
            ? 'Disconnect'
            : 'Connect'}
        </button>
 
    )
}