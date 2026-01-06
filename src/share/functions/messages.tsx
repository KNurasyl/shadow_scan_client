import { notification } from 'antd';
import { AppIcon } from '../../icons';
import styles from './messages.module.css';

export function showErrorMessage(content: string): void {
  notification.open({
    message: content,
    icon: <AppIcon icon="circle-x" className={styles.errorIcon} />,
    className: styles.errorMessage,
    duration: 5,
    placement: 'bottomRight',
    title: undefined,
  });
}

export function showSuccessMessage(content: string): void {
  notification.open({
    message: content,
    icon: <AppIcon icon="circle-check-filled" className={styles.successIcon} />,
    className: styles.successMessage,
    duration: 5,
    placement: 'bottomRight',
    title: undefined,
  });
}

export function showInfoMessage(content: string): void {
  notification.open({
    message: content,
    icon: <AppIcon icon="info-circle" className={styles.infoIcon} />,
    className: styles.infoMessage,
    duration: 5,
    placement: 'bottomRight',
    title: undefined,
  });
}
