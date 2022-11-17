import StudentDetails from "../Student/StudentDetails";
import Student from "../../../models/Student";
import styles from "./StudentsList.module.scss";
const StudentsList: React.FC<{
    students: Student[];
    selectedSubject?: string;
}> = (props) => {
    return (
        <ul className={styles["students-list"]}>
            {props.students.map((studentDetails) => (
                <StudentDetails
                    selectedSubject={props.selectedSubject}
                    studentDetails={studentDetails}
                />
            ))}
        </ul>
    );
};
export default StudentsList;
