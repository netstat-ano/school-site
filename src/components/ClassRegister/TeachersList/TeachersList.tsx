import { useEffect, useState } from "react";
import Teacher from "../../../models/Teacher";
import TeacherSubjectRelation from "../TeacherSubjectRelation/TeacherSubjectRelation";
import StudentClass from "../../../models/StudentClass";
const TeachersList: React.FC<{}> = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]);
    useEffect(() => {
        const fetchTeachersAndSubjects = async () => {
            const fetchedTeachers = await Teacher.getAllTeachers();
            const subjects = await StudentClass.getSubjects();
            setTeachers(fetchedTeachers);
            setSubjects(subjects);
        };
        fetchTeachersAndSubjects();
    }, []);
    return (
        <div>
            {teachers.map((teacher) => (
                <TeacherSubjectRelation subjects={subjects} teacher={teacher} />
            ))}
        </div>
    );
};
export default TeachersList;
