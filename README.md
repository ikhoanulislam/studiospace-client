# StudioSpace — Studio Rental & Booking Platform

StudioSpace is a web-based platform that helps users discover and book creative spaces such as photography studios, podcast studios, and other rental spaces. Hosts can list and manage their studios, while users can explore available spaces and manage their bookings.

## Live Website

**Live URL:** https://studiospace-client-swart.vercel.app/

## Features

- **User Authentication:** Register and log in using email and password.
- **Google Login:** Sign in using Google authentication.
- **Explore Studios:** Browse available studios and view their details.
- **Studio Details:** View studio descriptions, pricing, amenities, capacity, and host information.
- **Studio Booking:** Submit booking requests by selecting a date and time.
- **My Bookings:** View booking history and cancel eligible bookings.
- **Host Dashboard:** Manage studio bookings and confirm booking requests.
- **Studio Management:** Hosts can add, edit, and delete their studio listings.
- **Host Application:** Users can apply to become hosts.
- **Admin Dashboard:** Administrators can manage host applications and platform information.
- **Responsive Design:** Designed for desktop and mobile devices.
- **Light & Dark Mode:** Switch between light and dark themes.

## Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Google OAuth

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Project Structure

```text
studiospace-client/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── add-studio/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── host/
│   │   ├── login/
│   │   ├── my-bookings/
│   │   ├── my-listings/
│   │   ├── profile/
│   │   ├── signup/
│   │   └── studios/
│   └── components/
├── package.json
└── README.md
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ikhoanulislam/studiospace-client.git
```

### 2. Navigate to the Project

```bash
cd studiospace-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

Add the required environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5002
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Use the actual variable names referenced in the project source code. Configure Google OAuth credentials if Google Login is enabled.

Never upload real credentials or secret keys to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open:

`http://localhost:3000`

Make sure the StudioSpace backend is also running.

## Backend Repository

[StudioSpace Server](https://github.com/ikhoanulislam/studiospace-server)

## Developer

**Ikhoanul Islam**

Civil Engineering Student  
Gopalganj Science and Technology University

---

*StudioSpace — Find Your Perfect Creative Space.*
