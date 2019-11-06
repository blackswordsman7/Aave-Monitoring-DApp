import Web3 from 'web3'

export const getWeb3 = async () => {
  let web3: Web3

  // Modern dApp browsers
  if (window.ethereum) {
    const ethereum = window.ethereum
    web3 = new Web3(ethereum)

    try {
      // tslint:disable-next-line:no-any
      await (ethereum as any).enable()
    } catch (error) {
      console.log(error)
    }
  } else if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.web3.currentProvider)
  } else {
    console.log('No web3? You should consider trying MetaMask!')

    // Fallback
    web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://kovan.infura.io/v3/cd9719fe5cba4a22b5052e6ff6bb85e8'
      )
    )
  }

  // Get accounts from web3
  const accounts = await web3.eth.getAccounts()

  // Get network from web3
  const networkId = await web3.eth.net.getId()

  return {
    accounts,
    networkId,
    web3
  }
}
