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
  uiColor: string
  aTokenExchangeRate?: number
  aTokenTotalSupply?: number
  aTokenTransactionCount?: number
  aTokenPriceInUsd?: number
  transactionCount?: number
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
  event_name: 'Borrow' | 'Deposit' | 'Repay' | 'Redeem' | 'Swap' | 'FlashLoan'
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

export interface UniswapArbitrage {
  accumulated_fees: number
  average_daily_volume_last_2_weeks: number
  average_daily_volume_last_30_days: number
  average_daily_volume_last_week: number
  contract_address: string
  current_pool_size_eth: number
  current_pool_size_tkn: number
  current_pool_size_total_eth: number
  current_price: number
  daily_volume_end_of_timeframe: number
  days: number
  end_price: number
  end_variation_daily_volume: number
  end_variation_daily_volume_looking_at_last_2_weeks: number
  end_variation_daily_volume_looking_at_last_30_days: number
  end_variation_pool_size: number
  end_variation_price: number
  equivalent_apr: number
  impermanent_loss: number
  percentage_yield_from_fees: number
  pool_size_2_weeks_total_eth: number
  pool_size_30_days_total_eth: number
  pool_size_eth_at_end_of_timeframe: number
  pool_size_last_week_total_eth: number
  price_2_weeks_ago: number
  price_30_days_ago: number
  price_last_week: number
  price_ratio: number
  projected_total_yield: number
  share_of_fees_owned: number
  share_of_pool_end_of_timeframe: number
  token_address: string
  token_name: string
  token_symbol: string
}

export interface ATokenStats {
  name: string
  exchangeRate: number
  totalSupply: number
  Transaction_count: number
  priceinUSD: number
}

export interface ReserveStats {
  name: string
  Transaction_count: number
}
