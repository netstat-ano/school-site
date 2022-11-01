import { forwardRef } from "react";
import styles from "./AttachPhotos.module.scss";
import { useState } from "react";
const AttachPhotos = forwardRef<
    HTMLInputElement,
    {
        name: string;
        multiple: boolean;
        accept: string;
        children: JSX.Element | string;
        input?: {};
    }
>((props, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const onInputHandler = () => {
        setIsEmpty(false);
    };
    return (
        <div className={styles["attach-photos"]}>
            <label
                className={!isEmpty ? styles["attach-photos__not-empty"] : ""}
                htmlFor={props.name}
            >
                {props.children}
            </label>
            <input
                onInput={onInputHandler}
                {...props.input}
                className={styles["attach-photos__input"]}
                accept={props.accept}
                ref={ref}
                multiple={props.multiple}
                id={props.name}
                type="file"
            ></input>
        </div>
    );
});
export default AttachPhotos;
