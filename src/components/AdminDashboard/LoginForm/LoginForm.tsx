import styles from "./LoginForm.module.scss";
import Input from "../../UI/Input/Input";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import { authenticationActions } from "../../../store/authentication";
import { useDispatch } from "react-redux";
import { createRef } from "react";
import { authenticationLogin } from "../../../store/authentication";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { auth } from "../../../firebase";
const LoginForm: React.FC<{}> = () => {
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const dispatch = useAppDispatch();
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            authenticationLogin({
                email: emailRef.current!.value,
                password: passwordRef.current!.value,
            })
        );
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
