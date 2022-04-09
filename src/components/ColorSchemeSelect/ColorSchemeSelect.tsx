import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { setColorScheme } from 'src/store/Config/config.actions';
import ColorSchemesModal from '../CustomModal/ColorSchemesModal/ColorSchemesModal';
import styles from './ColorSchemeSelect.module.css';
import { useAppDispatch } from '../../hooks/redux';

export const ColorSchemeSelect = () => {
    const [colorSchemesModalOpen, setColorSchemesModalOpen] = useState(false);

    const dispatch = useAppDispatch()

    useEffect(() => {
        
    })

    return (
        <div className={styles.colorSchemeSelect}>
            <Button
                onClick={() => setColorSchemesModalOpen(true)}
                variant="outlined"
                sx={{color: "white", border: "1px solid white"}}
            >
                Colorschemes
            </Button>

            <ColorSchemesModal
                open={colorSchemesModalOpen}
                onSelect={colorScheme => dispatch(setColorScheme(colorScheme))}
                handleClose={() => setColorSchemesModalOpen(false)}
            />
        </div>
    );
};

export default ColorSchemeSelect;
