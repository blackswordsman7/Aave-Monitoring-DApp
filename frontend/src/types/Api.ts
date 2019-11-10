export interface TokenReserve {
  name: string
  symbol: string
  currencyType: string
  decimals: number
  aTokenAddress: string
  aTokenInitialExchangeRate: string
  usageAsCollateralEnabled: boolean
  borrowingEnabled: boolean
  fixedBorrowRateEnabled: boolean
  isActive: boolean
  address: string
  priceInEth: string
  priceInUsd: string
  baseLTVasCollateral: string
  reserveLiquidationThreshold: string
  variableBorrowIndex: string
  totalLiquidity: string
  availableLiquidity: string
  totalBorrows: string
  totalBorrowsFixed: string
  totalBorrowsVariable: string
  liquidityRate: string
  variableBorrowRate: string
  fixedBorrowRate: string
  utilizationRate: string
  liquidityIndex: string
  lastUpdateTimestamp: number
}

export interface UsersCount {
  [key: string]: number
}

export interface UserHealth {
  Roles: Array<'Active' | 'Risky' | 'Whale'>
  address: string
  currentliquidationthreshold: string
  healthfactor: string
  ltv: string
  totalborrowseth: string
  totalcollateral: string
  totliquidityeth: string
}

export interface UserHistory {
  address: string
  amount: string
  event_name: 'Borrow' | 'Deposit' | 'Repay' | 'Redeem' | 'Swap' | 'Flashloan'
  id?: number
  reserve: string
  target: string
  timestamp: number
  token?: TokenReserve
  txhash: string
}

export interface UserReserve {
  reserve: string
  currentATokenBalance: number
  currentUnderlyingBalance: number
  currentBorrowBalance: number
  principalBorrowBalance: number
  borrowRateMode: number
  borrowRate: number
  liquidityRate: number
  originationFee: number
  variableBorrowIndex: number
  lastUpdateTimestamp: number
}
