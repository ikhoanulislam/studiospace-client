# StudioSpace — Studio Rental & Booking Platform

StudioSpace is a peer-to-peer creative workspace rental platform where creators can discover and book photography studios, music recording spaces, podcast rooms, and other creative workspaces. Hosts can list and manage their studios, while users can explore spaces and manage their bookings.

## Live Website

**Live URL:** https://studiospace-client-swart.vercel.app/

## Features

- **User Authentication:** Register and log in using email and password.
- **Google Authentication:** Sign in using Google.
- **Explore Studios:** Browse available creative spaces.
- **Studio Details:** View descriptions, pricing, amenities, capacity, and host information.
- **Studio Booking:** Submit booking requests by selecting dates and times.
- **My Bookings:** View booking history and cancel eligible bookings.
- **Host Dashboard:** Manage studio listings and booking requests.
- **Studio Management:** Add, update, and delete studio listings.
- **Host Application:** Apply to become a studio host.
- **Admin Dashboard:** Manage host applications and platform information.
- **Events & Experiences:** Explore creative events and experiences.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Light & Dark Mode:** Switch between light and dark themes.

## Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Authentication
- Email and Password Authentication
- Google OAuth

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
│   │   ├── events/
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

```env
NEXT_PUBLIC_API_URL=http://localhost:5002
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Use valid credentials and the actual environment variable names required by the source code. Never commit real secrets to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Make sure the StudioSpace backend is also running.

## Backend Repository

[StudioSpace Server](https://github.com/ikhoanulislam/studiospace-server)

## Examiner Test Credentials

Add your working demo account details here before submission:

- **User Email:** YOUR_TEST_EMAIL
- **User Password:** YOUR_TEST_PASSWORD
- **Admin Email:** YOUR_ADMIN_EMAIL
- **Admin Password:** YOUR_ADMIN_PASSWORD

Use dedicated demo accounts, not personal account credentials.

## Developer

**Ikhoanul Islam**

Civil Engineering Student  
Gopalganj Science and Technology University

---

*StudioSpace — Find Your Perfect Creative Space.*
