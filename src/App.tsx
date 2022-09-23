import Homepage from "./pages/Homepage/Homepage";
import Admin from "./components/Admin/Admin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router";
function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/homepage");
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
    );
}

export default App;
