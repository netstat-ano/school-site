import styles from "./AddClass.module.scss";
import AddStudentForm from "../AddStudentForm/AddStudentForm";
import { useEffect, useState } from "react";
const AddClass: React.FC<{}> = () => {
    const [amountOfAddStudentForms, setAmountOfAddStudentForms] = useState([0]);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <div className={styles["add-class"]}>
            <form onSubmit={onSubmitHandler}>
                <>
                    <div>
                        <label htmlFor="name">Nazwa klasy</label>
                        <input name="name"></input>
                    </div>
                    <div>
                        <label htmlFor="teacher">Wychowawca</label>
                        <input name="teacher"></input>
                    </div>
                    {amountOfAddStudentForms.map((index) => (
                        <AddStudentForm
                            setAmountOfAddStudentForms={
                                setAmountOfAddStudentForms
                            }
                            key={index}
                        />
                    ))}
                </>
            </form>
        </div>
    );
};
export default AddClass;
