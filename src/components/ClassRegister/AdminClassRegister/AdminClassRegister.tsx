import Sidebar from "../../UI/Sidebar/Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import Students from "../Students/Students";
import AddClass from "../AddClass/AddClass";
import CenterDiv from "../../UI/CenterDiv/CenterDiv";
import Grades from "../Grades/Grades";
import Subjects from "../Subjects/Subjects";
import StudentDetails from "../StudentDetails/StudentDetails";
import Overlay from "../../UI/Overlay/Overlay";
import GradeDetails from "../GradeDetails/GradeDetails";
import AddTeacher from "../AddTeacher/AddTeacher";
import TeachersList from "../TeachersList/TeachersList";
import { useAppSelector } from "../../../hooks/use-app-selector";
const AdminClassRegister: React.FC<{}> = () => {
    const userType = useAppSelector((state) => state.authentication.type!);
    let sidebarElements = [<>Error</>];
    if (userType === "Admin") {
        sidebarElements = [
            <Link to="grades">Oceny</Link>,
            <Link to="subjects">Przedmioty</Link>,
            <Link to="students">Uczniowie</Link>,
            <Link to="add-class">Dodaj klase</Link>,
            <Link to="add-teacher">Dodaj nauczyciela</Link>,
            <Link to="teachers-list">Nauczyciel-przedmiot</Link>,
        ];
    } else if (userType === "teacher") {
        sidebarElements = [
            <Link to="grades">Oceny</Link>,
            <Link to="subjects">Przedmioty</Link>,
        ];
    }
    return (
        <div>
            <Sidebar elements={sidebarElements} />
            <CenterDiv>
                <Overlay>
                    <Routes>
                        <Route
                            path="teachers-list"
                            element={<TeachersList />}
                        />
                        <Route path="add-teacher" element={<AddTeacher />} />
                        <Route
                            path="grade-details/:gradeId"
                            element={<GradeDetails />}
                        />
                        <Route
                            path="student/:studentId"
                            element={<StudentDetails />}
                        />
                        <Route path="subjects" element={<Subjects />} />
                        <Route path="subjects" element={<Subjects />} />
                        <Route path="grades" element={<Grades />} />
                        <Route path="students" element={<Students />} />
                        <Route path="add-class" element={<AddClass />} />
                    </Routes>
                </Overlay>
            </CenterDiv>
        </div>
    );
};
export default AdminClassRegister;
