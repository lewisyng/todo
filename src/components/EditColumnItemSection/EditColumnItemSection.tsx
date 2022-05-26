import styles from './EditColumnItemSection.module.css';
import { Label } from '../ui/Label/Label';
import IconWrapper from '../ui/IconWrapper/IconWrapper';

export const EditColumnItemSection = ({
    htmlFor,
    title,
    icon,
    children,
}: {
    htmlFor?: string;
    title?: string | React.ReactNode;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) => {
    return (
        <div className={styles.editColumnItemSection}>
            <div className={styles.editColumnItemSection__icon}>
                {icon && <IconWrapper icon={icon} />}
            </div>

            <div className={styles.editColumnItemSection__content}>
                {title && (
                    <div className={styles.editColumnItemSectionContent__label}>
                        <Label htmlFor={htmlFor} title={title} />
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default EditColumnItemSection;
