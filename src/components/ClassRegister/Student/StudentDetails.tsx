import Student from "../../../models/Student";
import styles from "./StudentDetails.module.scss";
import { Link } from "react-router-dom";
import GradesInput from "../GradesInput/GradesInput";
import StudentClass from "../../../models/StudentClass";
const StudentDetails: React.FC<{
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
                {props.selectedSubject && (
                    <GradesInput
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
export default StudentDetails;
