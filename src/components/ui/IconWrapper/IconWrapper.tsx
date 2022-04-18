import React from 'react';
import styles from './IconWrapper.module.css';

export const IconWrapper = ({ icon }: { icon: React.ReactNode }) => {
    return <div className={styles.iconWrapper}>{icon}</div>;
};

export default IconWrapper;
