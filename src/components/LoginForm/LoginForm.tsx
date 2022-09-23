import styles from "./LoginForm.module.scss";
import Input from "../UI/Input/Input";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import { createRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const LoginForm: React.FC<{}> = () => {
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const signInStatus = await signInWithEmailAndPassword(
            auth,
            emailRef.current!.value,
            passwordRef.current!.value
        );
        console.log(signInStatus);
    };
    return (
        <div className={styles.form}>
            <form onSubmit={onSubmitHandler}>
                <div className={styles["input-controller"]}>
                    <Input
                        input={{
                            id: "email",
                            type: "text",
                            placeholder: "E-mail",
                            ref: emailRef,
                        }}
                    ></Input>
                </div>
                <div className={styles["input-controller"]}>
                    <Input
                        input={{
                            id: "password",
                            type: "password",
                            placeholder: "Password",
                            ref: passwordRef,
                        }}
                    ></Input>
                </div>
                <div className={styles["button-controller"]}>
                    <SuccessButton button={{ type: "submit" }}>
                        Log in
                    </SuccessButton>
                </div>
            </form>
        </div>
    );
};
export default LoginForm;
