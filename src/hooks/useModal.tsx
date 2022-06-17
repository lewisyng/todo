import {
    createContext,
    FC,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

export interface IModalContext {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
}

const defaultModalState = {
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
    toggleModal: () => {},
}

export const ModalContext = createContext<IModalContext>(defaultModalState);

export const ModalUIProvider: FC = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(() => setIsOpen(true), [setIsOpen]);

    const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const toggleModal = useCallback(
        () => setIsOpen(!isOpen),
        [isOpen, setIsOpen]
    );

    const modalContext = useMemo(() => {
        return {
            isModalOpen: isOpen,
            openModal,
            closeModal,
            toggleModal,
        };
    }, [isOpen, openModal, closeModal, toggleModal]);

    return (
        <ModalContext.Provider value={modalContext}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext<IModalContext>(ModalContext);
};
