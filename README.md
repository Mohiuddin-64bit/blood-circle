# BloodCircle - Blood Donation Platform

BloodCircle is a comprehensive platform built to connect blood donors and seekers. Users can search for available donors by filtering based on blood group, last donation date, and more. Donors can register their profiles, and update them regularly, ensuring accurate and timely data for those in need.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Donor Search and Filter**: Users can search for donors by blood group, donation date, and location.
- **Donor Registration**: Donors can fill out a comprehensive form with personal details, including blood group, last donation date, and health-related information.
- **Profile Management**: Donors can update their profiles at any time.
- **Authentication**: Secured user login and registration using AppWrite's built-in authentication.
- **Efficient Form Handling**: Reusable form components using `useFormHook` for better user experience and code efficiency.
- **Responsive Design**: Built with Tailwind CSS and Shaxian, ensuring compatibility across all devices.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Shaxian
- **Backend**: AppWrite (Authentication, Storage, Database)
- **Form Management**: useFormHook, ReusableForm Components
- **Database**: AppWrite's built-in database
- **Deployment**: [Platform or Service Name]

## Getting Started

### Prerequisites

To run this project, you will need:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **AppWrite** server running (refer to AppWrite documentation for setup)

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/bloodcircle.git
cd bloodcircle
```

Install dependencies:

```bash
npm install
```

Or, if you use Yarn:

```bash
yarn install
```

### Running Locally

Create an `.env.local` file in the root directory and add your AppWrite API keys and project ID:

```bash
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_API_KEY=your_api_key
NEXT_PUBLIC_APPWRITE_ENDPOINT=http://localhost/v1
```

Start the development server:

```bash
npm run dev
```

Or, if you use Yarn:

```bash
yarn dev
```

The app will be running locally at `http://localhost:3000`.

## Usage

- Visit `http://localhost:3000` in your browser.
- Users can search for donors or register as a donor.
- Donors can create and manage their profiles, including updating donation dates, personal details, and health information.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and make necessary changes. Then submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
