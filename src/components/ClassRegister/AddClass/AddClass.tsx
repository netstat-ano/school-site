import styles from "./AddClass.module.scss";
import AddStudentForm from "../AddStudentForm/AddStudentForm";
import { useState, useRef, useEffect } from "react";
import Input from "../../UI/Input/Input";
import Student from "../../../models/Student";
import StudentClass from "../../../models/StudentClass";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import DisabledButton from "../../UI/DisabledButton/DisabledButton";
const AddClass: React.FC<{}> = () => {
    const [amountOfAddStudentForms, setAmountOfAddStudentForms] = useState([0]);
    const [studentsList, setStudentsList] = useState<Student[]>([]);
    const [isDataValid, setIsDataValid] = useState(false);
    const [className, setClassName] = useState("");
    const [mainTeacher, setMainTeacher] = useState("");
    const studentClassID = `scid${Date.now()}`;
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const studentClass = new StudentClass(
            studentsList,
            className,
            mainTeacher,
            studentClassID,
            []
        );
        studentClass.save();
    };
    const onInputClassNameHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setClassName(e.target.value);
    };
    const onInpuMainTeacherHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMainTeacher(e.target.value);
    };
    const validate = () => {
        const classNameLength = className.trim().length;
        const mainTeacherLength = mainTeacher.trim().length;

        if (
            classNameLength > 0 &&
            mainTeacherLength > 0 &&
            studentsList.length > 0
        ) {
            setIsDataValid(true);
        } else {
            setIsDataValid(false);
        }
    };
    useEffect(() => {
        validate();
    }, [className, studentsList, mainTeacher]);
    return (
        <div className={styles["add-class"]}>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="name">Nazwa klasy</label>
                    <Input
                        className={styles["add-class__input"]}
                        input={{
                            name: "name",
                            onInput: onInputClassNameHandler,
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="teacher">Wychowawca</label>
                    <Input
                        className={styles["add-class__input"]}
                        input={{
                            name: "teacher",
                            onInput: onInpuMainTeacherHandler,
                        }}
                    />
                </div>
                {amountOfAddStudentForms.map((index) => (
                    <AddStudentForm
                        amountOfAddStudentForms={amountOfAddStudentForms}
                        setStudentsList={setStudentsList}
                        setAmountOfAddStudentForms={setAmountOfAddStudentForms}
                        index={index}
                        key={index}
                    />
                ))}
                <div>
                    {isDataValid && (
                        <SuccessButton button={{ type: "submit" }}>
                            Dodaj klase
                        </SuccessButton>
                    )}
                    {!isDataValid && (
                        <DisabledButton>Dodaj klase</DisabledButton>
                    )}
                </div>
            </form>
        </div>
    );
};
export default AddClass;
