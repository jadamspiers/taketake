import React from "react";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/admin-page";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { ProtectedPage } from "./pages/protected-page";
import { PublicPage } from "./pages/public-page";
import './index.css';
import { LandingPage } from "./pages/landing-page";
import { TestingPage } from "./pages/testing-page";
import { PlayPage } from "./pages/play-page";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { SignUpPage } from "./pages/signup-page";
import { useAuth } from "./hooks/useAuth";
import { SuccessPage } from "./pages/success-page";
import { SignIn } from "./pages/signin-page";
Amplify.configure(awsconfig);

export const App: React.FC = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <div>TakeTake</div>
      <div>
        {auth.isAuthenticated
          ? "STATUS: Logged in"
          : "STATUS: Not logged in"}
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
        <Route path="/public" element={<PublicPage />} />
        <Route
          path="/protected"
          element={<AuthenticationGuard component={ProtectedPage} />}
        />
        <Route
          path="/admin"
          element={<AuthenticationGuard component={AdminPage} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};