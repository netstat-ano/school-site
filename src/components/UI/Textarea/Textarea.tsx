import React, { forwardRef, useState } from "react";
import styles from "./Textarea.module.scss";
const Textarea = forwardRef<HTMLTextAreaElement, { textarea?: {} }>(
    (props: { textarea?: {} }, ref) => {
        const [rows, setRows] = useState<number>(1);
        const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (e.target.clientHeight < e.target.scrollHeight) {
                setRows((prevState) => {
                    const newState = prevState + 1;
                    return newState;
                });
            }
        };
        return (
            <textarea
                onInput={onInputHandler}
                ref={ref}
                rows={rows}
                className={styles.textarea}
                {...props.textarea}
            ></textarea>
        );
    }
);
export default Textarea;
