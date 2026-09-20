import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ToastContainer } from './components/common/Toast';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { RoomsPage } from './pages/public/RoomsPage';
import { RoomDetailsPage } from './pages/public/RoomDetailsPage';
import { BookingPage } from './pages/public/BookingPage';
import { BookingConfirmationPage } from './pages/public/BookingConfirmationPage';
import { MyBookingsPage } from './pages/public/MyBookingsPage';
import { AboutPage } from './pages/public/AboutPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { ContactPage } from './pages/public/ContactPage';

// Admin pages
import { DashboardPage } from './pages/admin/DashboardPage';
import { BookingsAdminPage } from './pages/admin/BookingsAdminPage';
import { CalendarPage } from './pages/admin/CalendarPage';
import { RoomsAdminPage } from './pages/admin/RoomsAdminPage';
import { RoomTypesPage } from './pages/admin/RoomTypesPage';
import { CustomersPage } from './pages/admin/CustomersPage';
import { PaymentsPage } from './pages/admin/PaymentsPage';
import { ReviewsPage } from './pages/admin/ReviewsPage';
import { GalleryAdminPage } from './pages/admin/GalleryAdminPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public site */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/rooms" element={<PublicLayout><RoomsPage /></PublicLayout>} />
        <Route path="/rooms/:id" element={<PublicLayout><RoomDetailsPage /></PublicLayout>} />
        <Route path="/booking" element={<PublicLayout><BookingPage /></PublicLayout>} />
        <Route path="/booking-confirmation" element={<PublicLayout><BookingConfirmationPage /></PublicLayout>} />
        <Route path="/my-bookings" element={<PublicLayout><MyBookingsPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

        {/* Admin site */}
        <Route path="/admin" element={<AdminLayout><DashboardPage /></AdminLayout>} />
        <Route path="/admin/bookings" element={<AdminLayout><BookingsAdminPage /></AdminLayout>} />
        <Route path="/admin/calendar" element={<AdminLayout><CalendarPage /></AdminLayout>} />
        <Route path="/admin/rooms" element={<AdminLayout><RoomsAdminPage /></AdminLayout>} />
        <Route path="/admin/room-types" element={<AdminLayout><RoomTypesPage /></AdminLayout>} />
        <Route path="/admin/customers" element={<AdminLayout><CustomersPage /></AdminLayout>} />
        <Route path="/admin/payments" element={<AdminLayout><PaymentsPage /></AdminLayout>} />
        <Route path="/admin/reviews" element={<AdminLayout><ReviewsPage /></AdminLayout>} />
        <Route path="/admin/gallery" element={<AdminLayout><GalleryAdminPage /></AdminLayout>} />
        <Route path="/admin/reports" element={<AdminLayout><ReportsPage /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><SettingsPage /></AdminLayout>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
