import Student from "../../../models/Student";
import styles from "./StudentDetails.module.scss";
import { Link } from "react-router-dom";
const StudentDetails: React.FC<{
    studentDetails: Student;
    selectedSubject?: string;
}> = (props) => {
    return (
        <li>
            <div className={styles["student-list_student"]}>
                <Link
                    className={styles["student-list__link"]}
                    to={`/class-register/student/${props.studentDetails.id}`}
                >
                    {props.studentDetails.name} {props.studentDetails.surname}
                </Link>
                {/* {props.selectedSubject && (
                    props.studentDetails.grades[`${props.selectedSubject}`]
                )} */}
            </div>
        </li>
    );
};
export default StudentDetails;
