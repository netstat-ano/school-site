import { useState, useRef } from "react";
const AddStudentForm: React.FC<{
    setAmountOfAddStudentForms: React.Dispatch<React.SetStateAction<number[]>>;
}> = (props) => {
    const [wasTouched, setWasTouched] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const surnameRef = useRef<HTMLInputElement>(null);
    const onChangeHandler = () => {
        if (
            nameRef!.current!.value.trim().length > 0 &&
            surnameRef!.current!.value.trim().length > 0 &&
            !wasTouched
        ) {
            props.setAmountOfAddStudentForms((prevState) => [
                ...prevState,
                prevState.length + 1,
            ]);
            setWasTouched(true);
        } else if (
            (nameRef!.current!.value.trim().length === 0 ||
                surnameRef!.current!.value.trim().length === 0) &&
            wasTouched
        ) {
            props.setAmountOfAddStudentForms((prevState) =>
                prevState.filter((element) => prevState.length !== element)
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
            <div>
                <button type="submit">Dodaj ucznia</button>
            </div>
        </>
    );
};
export default AddStudentForm;
