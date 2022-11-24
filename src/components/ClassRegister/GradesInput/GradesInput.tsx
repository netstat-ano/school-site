import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import styles from "./GradesInput.module.scss";
import Student from "../../../models/Student";
import StudentClass from "../../../models/StudentClass";
import React, { useRef, useState } from "react";
import Grade from "../../../models/Grade";
import grades from "../../../models/grades";
import { useAppSelector } from "../../../hooks/use-app-selector";
import DisabledButton from "../../UI/DisabledButton/DisabledButton";
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
    const [description, setDescription] = useState("");
    const [grade, setGrade] = useState("");
    const [weight, setWeight] = useState("");
    const user = useAppSelector((state) => state.authentication.username);
    const onAddGradeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const indexOfUpdatedStudent = props.selectedClass!.students.findIndex(
            (student) => student.id === studentDetails.id
        );
        const updatedGrade = new Grade(
            grade,
            weight,
            `gid${Date.now()}`,
            description || "",
            user!,
            props.selectedSubject!
        );
        const updatedStudent = await updatedGrade.save({
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
    const onGradeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGrade(e.target.value);
    };
    const onWeightChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value);
    };
    const onDescriptionChangeGandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(e.target.value);
    };
    return (
        <div className={styles["grades-input"]}>
            <form onSubmit={onAddGradeHandler}>
                <Input
                    input={{
                        value: grade,
                        type: "number",
                        min: "1",
                        max: "6",
                        placeholder: "Ocena",
                        onChange: onGradeChangeHandler,
                    }}
                />
                <Input
                    input={{
                        value: weight,
                        onChange: onWeightChangeHandler,
                        type: "number",
                        min: "1",
                        max: "6",
                        placeholder: "Waga",
                    }}
                />
                <Input
                    input={{
                        value: description,
                        type: "text",
                        placeholder: "Za co",
                        onChange: onDescriptionChangeGandler,
                    }}
                />
                {grade && weight ? (
                    <Button button={{ type: "submit" }}>Add</Button>
                ) : (
                    <DisabledButton>Add</DisabledButton>
                )}
            </form>
        </div>
    );
};
export default GradesInput;
