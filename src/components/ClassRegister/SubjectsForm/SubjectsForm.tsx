import React, { useRef, useState } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import StudentClass from "../../../models/StudentClass";
import DisabledButton from "../../UI/DisabledButton/DisabledButton";
const SubjectsForm: React.FC<{
    selectedClass: StudentClass | undefined;
    setSubjectsList: React.Dispatch<React.SetStateAction<string[]>>;
    subjectsList: string[];
}> = (props) => {
    const [subjectName, setSubjectName] = useState("");
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.setSubjectsList((prevState) => [...prevState, subjectName]);
        const updatedClass = new StudentClass(
            props.selectedClass!.students,
            props.selectedClass!.name,
            props.selectedClass!.mainTeacher,
            props.selectedClass!.id,
            [...props.subjectsList, subjectName]
        );
        await updatedClass.save();
        setSubjectName("");
    };
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectName(e.target.value);
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <Input
                input={{
                    type: "text",
                    placeholder: `Subject's name`,
                    onChange: onChangeHandler,
                    value: subjectName,
                }}
            />
            {subjectName && (
                <Button button={{ type: "submit" }}>Add subject</Button>
            )}
            {!subjectName && <DisabledButton>Add subject</DisabledButton>}
        </form>
    );
};
export default SubjectsForm;
