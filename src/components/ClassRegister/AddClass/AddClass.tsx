import styles from "./AddClass.module.scss";
import AddStudentForm from "../AddStudentForm/AddStudentForm";
import { useEffect, useState, useRef } from "react";
import Student from "../../../models/Student";
import StudentClass from "../../../models/StudentClass";
const AddClass: React.FC<{}> = () => {
    const [amountOfAddStudentForms, setAmountOfAddStudentForms] = useState([0]);
    const [studentsList, setStudentsList] = useState<Student[]>([]);
    const classNameRef = useRef<HTMLInputElement>(null);
    const mainTeacherRef = useRef<HTMLInputElement>(null);
    const studentClassID = `scid${Date.now()}`;
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const studentClass = new StudentClass(
            studentsList,
            classNameRef!.current!.value,
            mainTeacherRef!.current!.value,
            studentClassID,
            []
        );
        studentClass.save();
    };
    return (
        <div className={styles["add-class"]}>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="name">Nazwa klasy</label>
                    <input ref={classNameRef} name="name"></input>
                </div>
                <div>
                    <label htmlFor="teacher">Wychowawca</label>
                    <input ref={mainTeacherRef} name="teacher"></input>
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
                    <button type="submit">Dodaj ucznia</button>
                </div>
            </form>
        </div>
    );
};
export default AddClass;
