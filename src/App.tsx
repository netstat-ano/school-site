import Homepage from "./pages/Homepage/Homepage";
import Admin from "./pages/Admin/Admin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import PostDetail from "./pages/PostDetail/PostDetail";
import Layout from "./components/Layout/Layout";
function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/homepage");
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/homepage" element={<Homepage />} />

                <Route
                    path="/admin"
                    element={
                        <Layout>
                            <Admin />
                        </Layout>
                    }
                />
                <Route
                    path="/post/:postId"
                    element={
                        <Layout>
                            <PostDetail />
                        </Layout>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
