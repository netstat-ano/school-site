import styles from "./DisabledButton.module.scss";
const DisabledButton: React.FC<{ children: string }> = (props) => {
    return (
        <button className={styles["disabled-button"]}>{props.children}</button>
    );
};
export default DisabledButton;
