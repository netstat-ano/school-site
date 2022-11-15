import React, { useRef, useState } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import StudentClass from "../../../models/StudentClass";
const SubjectsForm: React.FC<{
    selectedClass: StudentClass | undefined;
    setSubjectsList: React.Dispatch<React.SetStateAction<string[]>>;
    subjectsList: string[];
}> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.setSubjectsList((prevState) => [
            ...prevState,
            inputRef.current!.value,
        ]);
        const updatedClass = new StudentClass(
            props.selectedClass!.students,
            props.selectedClass!.name,
            props.selectedClass!.mainTeacher,
            props.selectedClass!.id,
            [...props.subjectsList, inputRef.current!.value]
        );
        await updatedClass.save();
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <Input
                ref={inputRef}
                input={{ type: "text", placeholder: `Subject's name` }}
            />
            <Button button={{ type: "submit" }}>Add subject</Button>
        </form>
    );
};
export default SubjectsForm;
