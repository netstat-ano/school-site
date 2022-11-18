import StudentDetails from "../Student/StudentDetails";
import Student from "../../../models/Student";
import styles from "./StudentsList.module.scss";
import StudentClass from "../../../models/StudentClass";
const StudentsList: React.FC<{
    students: Student[];
    selectedSubject?: string;
    selectedClass?: StudentClass;
    setSelectedClass: React.Dispatch<React.SetStateAction<StudentClass>>;
}> = (props) => {
    return (
        <ul className={styles["students-list"]}>
            {props.students.map((studentDetails) => (
                <StudentDetails
                    setSelectedClass={props.setSelectedClass}
                    selectedClass={props.selectedClass}
                    selectedSubject={props.selectedSubject}
                    studentDetails={studentDetails}
                />
            ))}
        </ul>
    );
};
export default StudentsList;
