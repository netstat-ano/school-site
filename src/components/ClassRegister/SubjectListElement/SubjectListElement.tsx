import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./SubjectListElement.module.scss";
const SubjectListElement: React.FC<{ children: JSX.Element }> = (props) => {
    const onDeleteSubjectHandler = () => {};

    return (
        <li className={styles["list-element"]}>
            {props.children}{" "}
            <span>
                <FontAwesomeIcon
                    onClick={onDeleteSubjectHandler}
                    className={styles["list-element__icon"]}
                    icon={faXmark}
                />
            </span>
        </li>
    );
};
export default SubjectListElement;
