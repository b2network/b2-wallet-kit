import type { FC, ReactNode } from 'react';
import { WalletCollection } from '../types/types';
type GlobalContextType = {
    openConnectModal: boolean;
    hanldeCloseConnectModal: () => void;
    handleOpenConnectModal: () => void;
    handleOpenDisconnectModal: () => void;
    handleCloseDisconnectModal: () => void;
    handleSetWalletCollection: (w: WalletCollection) => void;
};
export declare const useB2Modal: () => GlobalContextType;
export declare const B2ModalProvider: FC<{
    children: ReactNode;
}>;
export {};
