import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import styles from "./GradesInput.module.scss";
import Student from "../../../models/Student";
import StudentClass from "../../../models/StudentClass";
import { useRef } from "react";
import Grade from "../../../models/Grade";
import grades from "../../../models/grades";
import { useAppSelector } from "../../../hooks/use-app-selector";
const GradesInput: React.FC<{
    studentDetails: Student;
    selectedSubject?: string;
    selectedClass?: StudentClass;
    setSelectedClass: React.Dispatch<React.SetStateAction<StudentClass>>;
}> = (props) => {
    const { studentDetails } = props;
    const gradeRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const user = useAppSelector((state) => state.authentication.username);
    const onAddGradeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const grades: grades = {};
        if (
            studentDetails.grades &&
            studentDetails.grades[`${props.selectedSubject}`]
        ) {
            for (const key in studentDetails.grades) {
                grades[`${key}`] = studentDetails.grades[`${key}`];
            }
            grades[`${props.selectedSubject}`] = [
                ...studentDetails.grades[`${props.selectedSubject}`],
                {
                    grade: gradeRef.current!.value,
                    weight: weightRef.current!.value,
                    id: `gid${Date.now()}`,
                    from: "",
                    teacher: user!,
                    subject: props.selectedSubject!,
                },
            ];
        } else {
            for (const key in studentDetails.grades) {
                grades[`${key}`] = studentDetails.grades[`${key}`];
            }
            grades[`${props.selectedSubject}`] = [
                {
                    grade: gradeRef.current!.value,
                    weight: weightRef.current!.value,
                    id: `gid${Date.now()}`,
                    from: "",
                    teacher: user!,
                    subject: props.selectedSubject!,
                },
            ];
        }
        const updatedStudent = new Student(
            studentDetails.name,
            studentDetails.surname,
            grades,
            studentDetails.id
        );
        const indexOfUpdatedStudent = props.selectedClass!.students.findIndex(
            (student) => student.id === studentDetails.id
        );
        const updatedStudents = [...props.selectedClass!.students];
        updatedStudents[indexOfUpdatedStudent] = updatedStudent;
        updatedStudent.save(props.selectedClass!.id, updatedStudents);
        props.setSelectedClass((prevState: StudentClass) => {
            const students = [...prevState.students];
            students[indexOfUpdatedStudent] = updatedStudent;
            const updatedStudentClass = new StudentClass(
                [...students],
                prevState.name,
                prevState.mainTeacher,
                prevState.id,
                prevState.subjects
            );
            return updatedStudentClass;
        });
    };
    return (
        <div className={styles["grades-input"]}>
            <form onSubmit={onAddGradeHandler}>
                <Input
                    ref={gradeRef}
                    input={{ type: "number", min: "1", max: "6" }}
                />
                <Input
                    ref={weightRef}
                    input={{ type: "number", min: "1", max: "6" }}
                />
                <Button button={{ type: "submit" }}>Add</Button>
            </form>
        </div>
    );
};
export default GradesInput;
