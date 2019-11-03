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
  event_name: 'Borrow' | 'Deposit' | 'Repay'
  reserve: string
  target: string
  timestamp: number
}
