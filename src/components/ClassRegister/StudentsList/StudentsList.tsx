import StudentListElement from "../StudentListElement/StudentListElement";
import Student from "../../../models/Student";
import styles from "./StudentsList.module.scss";
import StudentClass from "../../../models/StudentClass";
const StudentsList: React.FC<{
    classes?: StudentClass[] | undefined;
    setClasses?: React.Dispatch<
        React.SetStateAction<StudentClass[] | undefined>
    >;
    students: Student[];
    selectedSubject?: string;
    selectedClass?: StudentClass;
    setSelectedClass: React.Dispatch<React.SetStateAction<StudentClass>>;
}> = (props) => {
    return (
        <ul className={styles["students-list"]}>
            {props.students.map((studentDetails) => (
                <StudentListElement
                    classes={props.classes}
                    setClasses={props.setClasses}
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
