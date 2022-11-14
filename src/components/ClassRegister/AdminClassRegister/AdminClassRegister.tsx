import Sidebar from "../../UI/Sidebar/Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import Students from "../Students/Students";
import AddClass from "../AddClass/AddClass";
import CenterDiv from "../../UI/CenterDiv/CenterDiv";
import Grades from "../Grades/Grades";
import Subjects from "../Subjects/Subjects";
const AdminClassRegister: React.FC<{}> = () => {
    const sidebarElements = [
        <Link to="grades">Grades</Link>,
        <Link to="subjects">Subjects</Link>,
        <Link to="students">Students</Link>,
        <Link to="add-class">Add class</Link>,
    ];
    return (
        <div>
            <Sidebar elements={sidebarElements} />
            <CenterDiv>
                <Routes>
                    <Route path="subjects" element={<Subjects />} />
                    <Route path="grades" element={<Grades />} />
                    <Route path="students" element={<Students />} />
                    <Route path="add-class" element={<AddClass />} />
                </Routes>
            </CenterDiv>
        </div>
    );
};
export default AdminClassRegister;
