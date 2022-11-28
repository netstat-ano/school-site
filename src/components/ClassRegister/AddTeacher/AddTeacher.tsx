import React, { useState } from "react";
import Input from "../../UI/Input/Input";
import Teacher from "../../../models/Teacher";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import DisabledButton from "../../UI/DisabledButton/DisabledButton";
const AddTeacher: React.FC<{}> = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const onChangeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const onChangePasswordHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(e.target.value);
    };
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const teacher = new Teacher(email, name, password, []);
        await teacher.save();
        setEmail("");
        setName("");
        setPassword("");
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="teacher-email">Teacher email: </label>
                <Input
                    input={{
                        id: "teacher-email",
                        onChange: onChangeEmailHandler,
                    }}
                />
            </div>
            <div>
                <label htmlFor="teacher-name">Teacher name: </label>
                <Input
                    input={{
                        id: "teacher-name",
                        onChange: onChangeNameHandler,
                    }}
                />
            </div>
            <div>
                <label htmlFor="teacher-password">Teacher password: </label>
                <Input
                    input={{
                        id: "teacher-password",
                        onChange: onChangePasswordHandler,
                    }}
                />
            </div>
            <div>
                {email && name && password ? (
                    <SuccessButton button={{ type: "submit" }}>
                        Create user
                    </SuccessButton>
                ) : (
                    <DisabledButton>Create user</DisabledButton>
                )}
            </div>
        </form>
    );
};
export default AddTeacher;
