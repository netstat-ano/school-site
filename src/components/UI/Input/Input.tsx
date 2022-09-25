import styles from "./Input.module.scss";
import { forwardRef } from "react";
const Input = forwardRef<HTMLInputElement, { input?: {} }>(
    (props: { input?: {} }, ref: React.ForwardedRef<HTMLInputElement>) => {
        return (
            <input ref={ref} className={styles.input} {...props.input}></input>
        );
    }
);
export default Input;
