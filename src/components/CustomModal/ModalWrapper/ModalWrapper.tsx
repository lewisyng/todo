import { useState } from "react";
import CustomModal from "../CustomModal";

export const ModalWrapper = ({children}: {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}) => {
    const [open, setOpen] = useState(false)

    return (
        <CustomModal open={open} onClose={() => setOpen(false)}>
            {children}
        </CustomModal>
    )
}

export default ModalWrapper;