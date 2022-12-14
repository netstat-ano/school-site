import Input from "../UI/Input/Input";
import Textarea from "../UI/Textarea/Textarea";
import styles from "./PostEditor.module.scss";
import { useEffect } from "react";
const PostEditor: React.FC<{
    setTitleValue: React.Dispatch<React.SetStateAction<string>>;
    setTextValue: React.Dispatch<React.SetStateAction<string>>;
    acceptation?: boolean;
    text: string;
    title: string;
}> = (props) => {
    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        props.setTitleValue(target.value);
    };
    const onTextChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        props.setTextValue(target.value);
    };
    useEffect(() => {
        props.setTextValue(props.text);
        props.setTitleValue(props.title);
    }, []);
    return (
        <div className={styles["post-editor"]}>
            <div className={styles["post-editor__input-controller"]}>
                <Input
                    input={{
                        onChange: onTitleChangeHandler,
                        type: "text",
                        placeholder: "Title",
                        defaultValue: props.title,
                    }}
                />
            </div>
            <div>
                <Textarea
                    textarea={{
                        onChange: onTextChangeHandler,
                        placeholder: "Message",
                        defaultValue: props.text,
                    }}
                />
            </div>
        </div>
    );
};
export default PostEditor;
