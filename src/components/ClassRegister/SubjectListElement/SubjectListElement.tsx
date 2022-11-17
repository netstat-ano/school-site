import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./SubjectListElement.module.scss";
import StudentClass from "../../../models/StudentClass";
const SubjectListElement: React.FC<{
    children: JSX.Element;
    subject: string;
    selectedClass: StudentClass | undefined;
    setSubjectList: React.Dispatch<React.SetStateAction<string[]>>;
    subjectsList: string[];
}> = (props) => {
    const onDeleteSubjectHandler = () => {
        props.setSubjectList((prevState) =>
            prevState.filter((element) => element !== props.subject)
        );
        const updatedClass = new StudentClass(
            props.selectedClass!.students,
            props.selectedClass!.name,
            props.selectedClass!.mainTeacher,
            props.selectedClass!.id,
            props.subjectsList.filter((element) => element !== props.subject)
        );
        updatedClass.save();
    };

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
