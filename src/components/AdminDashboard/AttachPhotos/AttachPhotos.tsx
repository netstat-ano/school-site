import { forwardRef } from "react";
import styles from "./AttachPhotos.module.scss";
const AttachPhotos = forwardRef<
    HTMLInputElement,
    {
        name: string;
        multiple: boolean;
        accept: string;
        children: JSX.Element | string;
    }
>(
    (
        props: {
            name: string;
            multiple: boolean;
            accept: string;
            children: JSX.Element | string;
        },
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div>
                <label htmlFor={props.name}>{props.children}</label>
                <input
                    className={styles.input}
                    accept={props.accept}
                    ref={ref}
                    multiple={props.multiple}
                    id={props.name}
                    type="file"
                ></input>
            </div>
        );
    }
);
export default AttachPhotos;
