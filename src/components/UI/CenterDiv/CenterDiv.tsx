import styles from "./CenterDiv.module.scss";
const CenterDiv: React.FC<{ children: JSX.Element }> = (props) => {
    return <div className={styles["center-div"]}>{props.children}</div>;
};
export default CenterDiv;
