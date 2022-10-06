import styles from "./CanceledButton.module.scss";
const CanceledButton: React.FC<{ children: string; button?: {} }> = (props) => {
    return (
        <button {...props.button} className={styles.button}>
            {props.children}
        </button>
    );
};
export default CanceledButton;
