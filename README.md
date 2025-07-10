
# Campus Hustle Hub

A comprehensive platform for Kenyan university students to trade skills, post tasks, and earn through peer collaboration. Connect with fellow students, solve problems together, and build your campus reputation!

🔗 **Live Demo:** [Campus Hub](https://effulgent-tarsier-3723cb.netlify.app/)

## 🌟 Features Overview

### 🔐 Authentication & User Management
- **Secure Authentication**: Email/password registration and login using Supabase Auth
- **Email Verification**: Required email confirmation for account activation
- **User Profiles**: Complete profile management with personal information
- **Student Verification**: School ID upload requirement for verification
- **Trust Score System**: Reputation-based rating system for user reliability

### 📝 Task Management System
- **Task Posting**: Create detailed task requests with:
  - Title and description (with character limits for clarity)
  - Category selection (Tech, Academic, Creative, Services, Other)
  - Flexible offer types: Cash payments or skill/service trades
  - Deadline setting with calendar picker
  - Real-time status tracking (Open → In Progress → Finished)

- **Task Browsing**: Advanced discovery features including:
  - Real-time search with title/description filtering
  - Category-based filtering
  - Price range filtering for cash offers
  - Status-based filtering
  - Responsive grid layout with task cards

### 💰 Bidding System
- **Smart Bidding**: Place competitive bids on tasks with:
  - Custom bid amounts (validated with maximum limits)
  - Personalized messages to task owners
  - Bid history tracking and management
  - Real-time bid count updates

- **Bid Management**: Task owners can:
  - View all received bids with detailed information
  - Compare bidder profiles and trust scores
  - Accept bids to assign tasks
  - Track bid status and communication

### 💬 Real-time Communication
- **In-app Messaging**: Seamless communication between users
- **Task-specific Chat**: Dedicated chat channels for each task
- **Message Status**: Read/unread tracking for better communication flow
- **Instant Notifications**: Real-time updates for new messages and bids

### 💳 Payment Integration
- **Payment Processing**: Secure payment handling for completed tasks
- **Payment Intents**: Track payment status and history
- **Multiple Payment Methods**: Support for various payment options
- **Transaction Security**: Secure payment flow with proper validation

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Mode**: Theme switching with system preference detection
- **Modern UI**: Clean, intuitive interface using Shadcn UI components
- **Real-time Updates**: Live data synchronization across all features
- **Error Handling**: Comprehensive error management with user-friendly messages

## 🏗️ System Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling with custom design system
- **Shadcn UI** for consistent, accessible component library
- **React Router** for client-side routing and navigation
- **React Query** for efficient data fetching and state management

### Backend Services
- **Supabase** as Backend-as-a-Service providing:
  - PostgreSQL database with Row Level Security (RLS)
  - Real-time subscriptions for live updates
  - Authentication and user management
  - File storage for profile pictures and documents
  - Edge functions for serverless backend logic

### Database Schema

#### Core Tables
- **profiles**: User information and verification status
- **hustles**: Task posts with offers, deadlines, and status
- **bids**: Competitive offers from users on tasks
- **chat_messages**: Real-time messaging between users
- **payment_intents**: Transaction tracking and payment processing

#### Security Features
- **Row Level Security (RLS)**: Ensures users can only access their own data
- **Authentication Integration**: Seamless auth flow with profile creation
- **Data Validation**: Server-side validation for all user inputs
- **Secure File Uploads**: Protected storage for user documents

## 🔧 How It Works

### 1. User Onboarding & Authentication
1. **Registration**: New users sign up with email/password on `/register`
2. **Email Confirmation**: 
   - Supabase sends a confirmation email to the registered address
   - Users must click the confirmation link to activate their account
   - Account remains inactive until email is verified
3. **Profile Setup**: Complete profile with academic and personal information including:
   - Personal details (name, age, phone, gender)
   - Academic information (school, course, year of study)
   - School ID upload for student verification
4. **Login**: Once email is confirmed, users can log in at `/login`
5. **Trust Score**: Start with baseline trust score (3.0/5.0)

### 2. Task Lifecycle
1. **Creation**: Users post tasks with detailed requirements
2. **Discovery**: Other users browse and search available tasks
3. **Bidding**: Interested users place competitive bids
4. **Assignment**: Task owner reviews and accepts best bid
5. **Execution**: Direct communication and work completion
6. **Payment**: Secure payment processing upon completion
7. **Rating**: Mutual rating system to build trust scores

### 3. Communication Flow
1. **Initial Contact**: Bidders can send introductory messages
2. **Task Assignment**: Dedicated chat channels open upon bid acceptance
3. **Progress Updates**: Real-time communication during task execution
4. **Completion**: Final confirmations and payment processing

### 4. Payment Processing
1. **Intent Creation**: Payment intents created upon task completion
2. **Secure Processing**: Multiple payment methods supported
3. **Status Tracking**: Real-time payment status updates
4. **Confirmation**: Automatic completion upon successful payment

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Supabase account and project setup
- Environment variables configured

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd campus-hustle-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase URL and keys

# Start development server
npm run dev
```

### Environment Setup
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Authentication Setup (Important)
For proper authentication flow:

1. **Supabase Configuration**:
   - In your Supabase dashboard, go to Authentication → Settings
   - Set Site URL to your application URL (e.g., `https://yourdomain.com`)
   - Add redirect URLs for both development and production
   - For development: `http://localhost:5173`
   - For production: your deployed URL

2. **Email Confirmation**:
   - By default, Supabase requires email confirmation
   - Users will receive a confirmation email after registration
   - To disable for testing: Go to Authentication → Settings → "Enable email confirmations" (toggle off)
   - **Recommended**: Keep email confirmation enabled for production

## 📊 Database Setup

The application requires several Supabase tables with proper RLS policies. Run the provided SQL migrations to set up:

1. **User Profiles Table**: Store extended user information
2. **Hustles Table**: Main task/job postings
3. **Bids Table**: User bids on tasks
4. **Chat Messages Table**: Real-time messaging
5. **Payment Intents Table**: Payment processing

All tables include comprehensive Row Level Security policies to ensure data privacy and security.

## 🎯 Key Features in Detail

### Smart Task Discovery
- **Advanced Filtering**: Multi-criteria search and filtering
- **Real-time Updates**: Live task status and bid count updates
- **Category Organization**: Structured task categorization
- **Price-based Filtering**: Filter by offer amounts and types

### Secure Bidding System
- **Validation**: Bid amount and message validation
- **Competition Tracking**: Real-time bid counts and competition levels
- **Profile Integration**: Bidder information and trust scores
- **Assignment Flow**: Streamlined bid acceptance and task assignment

### Integrated Communication
- **Context-aware Messaging**: Task-specific communication channels
- **Real-time Delivery**: Instant message delivery and read receipts
- **User Safety**: Moderated communication with report functionality
- **History Tracking**: Complete message history for reference

### Payment Security
- **Intent-based Processing**: Secure payment intent creation
- **Status Tracking**: Real-time payment status monitoring
- **Multiple Methods**: Support for various payment options
- **Transaction History**: Complete payment audit trail

## 🔐 Security Features

### Authentication Security
- **Email Verification**: Mandatory email confirmation prevents fake accounts
- **Secure Password Handling**: Supabase handles password hashing and validation
- **Session Management**: Automatic token refresh and secure session handling
- **Protected Routes**: Route-level authentication guards

### Data Security
- **Row Level Security (RLS)**: Database-level access control
- **User Data Isolation**: Users can only access their own data
- **File Upload Security**: Secure storage with access controls
- **Input Validation**: Client and server-side validation

## 🔮 Future Enhancements

- **Mobile Application**: Native iOS and Android apps
- **Advanced Analytics**: User activity and platform metrics
- **AI Matching**: Smart task-user matching algorithms
- **Reputation System**: Enhanced trust scoring with reviews
- **Notification System**: Push notifications for important updates
- **Payment Integration**: Advanced payment gateway integration
- **Dispute Resolution**: Automated conflict resolution system

## 🤝 Contributing

This project welcomes contributions! Please ensure all changes maintain the existing code quality and follow the established patterns for:
- Component structure and reusability
- TypeScript type safety
- Database security with RLS
- User experience consistency



---

**Campus Hustle Hub** - Connecting students, solving problems, building community! 🎓✨
