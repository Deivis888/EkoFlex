import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import MarketPage from './pages/MarketPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import WorksPage from './pages/WorksPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ThankYouPage from './pages/ThankYouPage';
import EmployeeLoginPage from './pages/EmployeeLoginPage';
import EmployeeLayout from './components/EmployeeLayout';
import DashboardPage from './pages/employee/DashboardPage';
import ProfilePage from './pages/employee/ProfilePage';
import StartWorkPage from './pages/employee/StartWorkPage';
import WorkPage from './pages/employee/WorkPage';
import ToolsPage from './pages/employee/ToolsPage';
import VehiclePage from './pages/employee/VehiclePage';
import AddressesPage from './pages/employee/AddressesPage';
import DocumentsPage from './pages/employee/DocumentsPage';
import ProfessionPage from './pages/employee/ProfessionPage';
import SupervisorsPage from './pages/employee/SupervisorsPage';
import BusinessTripPage from './pages/employee/BusinessTripPage';
import BankPage from './pages/employee/BankPage';
import AdvancesPage from './pages/employee/AdvancesPage';
import SettingsPage from './pages/employee/SettingsPage';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { EmployeeProvider } from './contexts/EmployeeContext';

function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Detect language from browser if not set
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (!savedLanguage) {
      // Set Lithuanian as default language
      const lang = 'lt';
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary-50 dark:bg-gray-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary-600"></div>
          <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400">
            EkoFlex
          </h2>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <EmployeeProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="market" element={<MarketPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="works" element={<WorksPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsOfServicePage />} />
            <Route path="thank-you" element={<ThankYouPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          
          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLoginPage />} />
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="start" element={<StartWorkPage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="tools" element={<ToolsPage />} />
            <Route path="vehicle" element={<VehiclePage />} />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="profession" element={<ProfessionPage />} />
            <Route path="supervisors" element={<SupervisorsPage />} />
            <Route path="business-trip" element={<BusinessTripPage />} />
            <Route path="bank" element={<BankPage />} />
            <Route path="advances" element={<AdvancesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </EmployeeProvider>
    </ThemeProvider>
  );
}

export default App;