import Textarea from "../UI/Textarea/Textarea";
import { useRef } from "react";
import SuccessButton from "../UI/SuccessButton/SuccessButton";
import styles from "./PostCreator.module.scss";
import { useAppSelector } from "../../hooks/use-app-selector";
const PostCreator: React.FC<{}> = (props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const options = useAppSelector<string[]>((state) => state.categories);
    return (
        <div className={styles.container}>
            <section>
                <h3>Create a post</h3>
                <Textarea ref={textareaRef} />
                <div>
                    Categories:
                    <select>
                        {options.map((category, index) => (
                            <option key={index}>{category}</option>
                        ))}
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
