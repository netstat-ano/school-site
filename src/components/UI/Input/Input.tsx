import styles from "./Input.module.scss";
import { forwardRef } from "react";
const Input = forwardRef<HTMLInputElement, { input?: {}; className?: string }>(
    (
        props: { input?: {}; className?: string },
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <input
                ref={ref}
                className={`${styles.input} ${
                    props.className ? props.className : ""
                }`}
                {...props.input}
            ></input>
        );
    }
);
export default Input;
