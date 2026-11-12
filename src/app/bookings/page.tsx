import { redirect } from "next/navigation";

// Keep the legacy /bookings URL working while using the cookie-based
// authentication flow implemented by the current My Bookings page.
export default function BookingsRedirect() {
  redirect("/my-bookings");
}
