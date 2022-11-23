import Student from "../../../models/Student";
import styles from "./StudentListElement.module.scss";
import { Link } from "react-router-dom";
import GradesInput from "../GradesInput/GradesInput";
import StudentClass from "../../../models/StudentClass";
import GradesList from "../GradesList/GradesList";
const StudentListElement: React.FC<{
    classes?: StudentClass[] | undefined;
    setClasses?: React.Dispatch<
        React.SetStateAction<StudentClass[] | undefined>
    >;
    studentDetails: Student;
    selectedSubject?: string;
    selectedClass?: StudentClass;
    setSelectedClass: React.Dispatch<React.SetStateAction<StudentClass>>;
}> = (props) => {
    return (
        <li className={styles["student-list__item"]}>
            <div className={styles["student-list_student"]}>
                <div>
                    <Link
                        className={styles["student-list__link"]}
                        to={`/class-register/student/${props.studentDetails.id}`}
                    >
                        {props.studentDetails.name}{" "}
                        {props.studentDetails.surname}
                    </Link>
                </div>
                {props.selectedSubject &&
                    props.studentDetails.grades &&
                    props.studentDetails.grades[`${props.selectedSubject}`] && (
                        <GradesList
                            className={styles["grades-list"]}
                            selectedSubject={props.selectedSubject}
                            grades={props.studentDetails.grades}
                        />
                    )}
                {props.selectedSubject && (
                    <GradesInput
                        classes={props.classes}
                        setClasses={props.setClasses}
                        setSelectedClass={props.setSelectedClass}
                        selectedClass={props.selectedClass}
                        studentDetails={props.studentDetails}
                        selectedSubject={props.selectedSubject}
                    />
                )}
            </div>
        </li>
    );
};
export default StudentListElement;
