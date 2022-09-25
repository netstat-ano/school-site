import Textarea from "../UI/Textarea/Textarea";
import { useRef } from "react";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import styles from "./PostCreator.module.scss";
const PostCreator: React.FC<{}> = (props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    return (
        <div className={styles.container}>
            <section>
                <h3>Create a post</h3>
                <Textarea ref={textareaRef} />
                <div>
                    Categories:
                    <select>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div>
                    <SuccessButton>Add post</SuccessButton>
                </div>
            </section>
        </div>
    );
};
export default PostCreator;
