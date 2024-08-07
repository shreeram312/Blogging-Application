import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
// Import the error page
import { ProtectedRoute } from "./components/ProtectedRoute"; // Import the ProtectedRoute
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/error" element={<ErrorPage />} /> {/* Error page route */}
        <Route
          path="/blog/:id"
          element={<ProtectedRoute element={<Blog />} />}
        />
        <Route path="/blogs" element={<ProtectedRoute element={<Blogs />} />} />
        <Route
          path="/publish"
          element={<ProtectedRoute element={<Publish />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
