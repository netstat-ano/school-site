import styles from "./LoginForm.module.scss";
import Input from "../../UI/Input/Input";
import SuccessButton from "../../UI/SuccessButton/SuccessButton";
import { createRef } from "react";
import { authenticationLogin } from "../../../store/authentication";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
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
        <div className={styles["login-form"]}>
            <form onSubmit={onSubmitHandler}>
                <div className={styles["login-form__input-controller"]}>
                    <Input
                        input={{
                            id: "email",
                            type: "text",
                            placeholder: "E-mail",
                            ref: emailRef,
                        }}
                    ></Input>
                </div>
                <div className={styles["login-form__input-controller"]}>
                    <Input
                        input={{
                            id: "password",
                            type: "password",
                            placeholder: "Password",
                            ref: passwordRef,
                        }}
                    ></Input>
                </div>
                <div className={styles["login-form__button-controller"]}>
                    <SuccessButton button={{ type: "submit" }}>
                        Log in
                    </SuccessButton>
                </div>
            </form>
        </div>
    );
};
export default LoginForm;
