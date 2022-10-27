import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Spinner: React.FC<{}> = () => {
    return <FontAwesomeIcon className="fa-spin" icon={faSpinner} />;
};
export default Spinner;
