import styles from "./SuccessNotification.module.scss";
const SuccessNotification: React.FC<{ children: string }> = (props) => {
    return <div className={styles.container}>{props.children}</div>;
};
export default SuccessNotification;
