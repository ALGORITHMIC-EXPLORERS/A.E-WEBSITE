import DesignCourses from "./pages/DesignCourses"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/ui/learning-cohorts/Navbar";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LearningCohort from "./pages/LearningCohort";
import ModulesPage from "./pages/ModulesPage";
import ProductsPage from "./pages/ProductsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";

// Generic Pages included initially
import Guru from "./pages/Guru";
import GuruCircle from "./pages/GuruCircle";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import ModuleDetailPage from "./pages/ModuleDetailPage";
import QuizPage from "./pages/QuizPage";
import LeaderboardPage from "./pages/LeaderboardPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageModules from "./pages/admin/ManageModules";
import ManageQuizzes from "./pages/admin/ManageQuizzes";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import ManageTeam from "./pages/admin/ManageTeam";
import ViewUsers from "./pages/admin/ViewUsers";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cohorts" element={<LearningCohort />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/guru" element={<Guru />} />
          <Route path="/guru-circle" element={<GuruCircle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* AUTHENTICATED USER ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:id"
            element={
              <ProtectedRoute>
                <ModuleDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/modules"
            element={
              <ProtectedRoute requireAdmin>
                <ManageModules />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quizzes"
            element={
              <ProtectedRoute requireAdmin>
                <ManageQuizzes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute requireAdmin>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute requireAdmin>
                <ManageTestimonials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/team"
            element={
              <ProtectedRoute requireAdmin>
                <ManageTeam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requireAdmin>
                <ViewUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
