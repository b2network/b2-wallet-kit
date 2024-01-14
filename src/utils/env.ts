import { Address } from "viem"

export const BUNDLER_RPC_URL = import.meta.env.VITE_BUNDLER_RPC_URL
export const ENTRYPOINT_ADDRESS = import.meta.env.VITE_ENTRYPOINT_ADDRESS as Address
export const KERNEL_IMPL_ADDRESS = import.meta.env.VITE_KERNEL_IMPL_ADDRESS as Address
export const PM_BASE_URL = import.meta.env.VITE_PM_BASE_URL || ''
export const SW_VALIDATOR_ADDRESS = import.meta.env.VITE_SW_VALIDATOR_ADDRESS as Address
export const KERNEL_FACTORY_ADDRESS = import.meta.env.VITE_KERNEL_FACTORY_ADDRESS as Address