import { useState, useRef } from "react";
import Student from "../../../models/Student";
const AddStudentForm: React.FC<{
    setAmountOfAddStudentForms: React.Dispatch<React.SetStateAction<number[]>>;
    setStudentsList: React.Dispatch<React.SetStateAction<Student[]>>;
    index: number;
    amountOfAddStudentForms: number[];
}> = (props) => {
    const [wasTouched, setWasTouched] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const surnameRef = useRef<HTMLInputElement>(null);
    const onChangeHandler = () => {
        const name = nameRef!.current!.value;
        const surname = surnameRef!.current!.value;
        if (!wasTouched) {
            props.setStudentsList((prevState) => {
                return prevState.filter(
                    (element, index) =>
                        props.amountOfAddStudentForms.length - 1 !== index
                );
            });
        } else {
            props.setStudentsList((prevState) => {
                prevState[props.index] = new Student(
                    name.trim(),
                    surname.trim(),
                    {},
                    `sid${Date.now()}`
                );
                return [...prevState];
            });
        }
        if (
            name.trim().length > 0 &&
            surname.trim().length > 0 &&
            !wasTouched
        ) {
            props.setAmountOfAddStudentForms((prevState) => [
                ...prevState,
                prevState.length,
            ]);
            setWasTouched(true);
        } else if (
            (nameRef!.current!.value.trim().length === 0 ||
                surnameRef!.current!.value.trim().length === 0) &&
            wasTouched
        ) {
            props.setAmountOfAddStudentForms((prevState) =>
                prevState.filter((element) => prevState.length - 1 !== element)
            );
            setWasTouched(false);
        }
    };
    return (
        <>
            <div>
                <label htmlFor="name">Imie</label>
                <input
                    onChange={onChangeHandler}
                    ref={nameRef}
                    name="name"
                ></input>
                <label htmlFor="surname">Nazwisko</label>
                <input
                    onChange={onChangeHandler}
                    ref={surnameRef}
                    name="surname"
                ></input>
            </div>
        </>
    );
};
export default AddStudentForm;
