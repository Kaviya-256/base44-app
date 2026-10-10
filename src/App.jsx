import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { RevoraProvider } from '@/lib/revoraStore';
// Add page imports here
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import VerifyOtp from '@/pages/VerifyOtp';
import Dashboard from '@/pages/Dashboard';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import BookingAddress from '@/pages/BookingAddress';
import BookingSchedule from '@/pages/BookingSchedule';
import BookingProfessional from '@/pages/BookingProfessional';
import BookingReview from '@/pages/BookingReview';
import BookingPayment from '@/pages/BookingPayment';
import BookingConfirmation from '@/pages/BookingConfirmation';
import BookingDetails from '@/pages/BookingDetails';
import CarePlans from '@/pages/CarePlans';
import CarePlanPackages from '@/pages/CarePlanPackages';
import CarePlanReview from '@/pages/CarePlanReview';
import ProfessionalProfile from '@/pages/ProfessionalProfile';
import ProfessionalLogin from '@/pages/ProfessionalLogin';
import ProfessionalDashboard from '@/pages/ProfessionalDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import TermsAndConditions from '@/pages/TermsAndConditions';
import CancellationPolicy from '@/pages/CancellationPolicy';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import About from '@/pages/About';
import HomePassport from '@/pages/HomePassport';
import RevoraShieldDetail from '@/pages/RevoraShieldDetail';
import RevoraShieldBooking from '@/pages/RevoraShieldBooking';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Add your page Route elements here */}
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/booking/address" element={<BookingAddress />} />
      <Route path="/booking/schedule" element={<BookingSchedule />} />
      <Route path="/booking/professional" element={<BookingProfessional />} />
      <Route path="/booking/review" element={<BookingReview />} />
      <Route path="/booking/payment" element={<BookingPayment />} />
      <Route path="/booking/confirmation" element={<BookingConfirmation />} />
      <Route path="/bookings/:id" element={<BookingDetails />} />
      <Route path="/care-plans" element={<CarePlans />} />
      <Route path="/care-plans/:planId/packages" element={<CarePlanPackages />} />
      <Route path="/care-plans/:planId" element={<CarePlanReview />} />
      <Route path="/professionals/:id" element={<ProfessionalProfile />} />
      <Route path="/professional-login" element={<ProfessionalLogin />} />
      <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/cancellation-policy" element={<CancellationPolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/about" element={<About />} />
      <Route path="/home-passport" element={<HomePassport />} />
      <Route path="/care-plans/shield" element={<RevoraShieldDetail />} />
      <Route path="/care-plans/shield/book" element={<RevoraShieldBooking />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <RevoraProvider>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </RevoraProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
