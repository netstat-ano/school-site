import React from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
const SubjectsForm: React.FC<{}> = () => {
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <Input input={{ type: "text", placeholder: `Subject's name` }} />
            <Button button={{ type: "submit" }}>Add subject</Button>
        </form>
    );
};
export default SubjectsForm;
