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
    classes?: StudentClass[] | undefined;
    setClasses?: React.Dispatch<
        React.SetStateAction<StudentClass[] | undefined>
    >;
    studentDetails: Student;
    selectedSubject?: string;
    selectedClass?: StudentClass;
    setSelectedClass: React.Dispatch<React.SetStateAction<StudentClass>>;
}> = (props) => {
    const { studentDetails } = props;
    const gradeRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const user = useAppSelector((state) => state.authentication.username);
    const onAddGradeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const indexOfUpdatedStudent = props.selectedClass!.students.findIndex(
            (student) => student.id === studentDetails.id
        );
        const grade = new Grade(
            gradeRef.current!.value,
            weightRef.current!.value,
            `gid${Date.now()}`,
            "",
            user!,
            props.selectedSubject!
        );
        const updatedStudent = await grade.save({
            studentDetails: studentDetails,
            selectedSubject: props.selectedSubject!,
            selectedClass: props.selectedClass!,
        });
        if (props.setClasses) {
            props.setClasses((prevState) => {
                if (prevState) {
                    const students = [...props.selectedClass!.students];
                    students[indexOfUpdatedStudent] = updatedStudent;
                    const indexOfUpdatedClass = prevState?.findIndex(
                        (prevState) => prevState.id === props.selectedClass!.id
                    );
                    prevState[indexOfUpdatedClass].students = students;
                    return [...prevState];
                }
                return [];
            });
        }
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
