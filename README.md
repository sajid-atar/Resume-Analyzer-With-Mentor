# Resume Analyzer

A modern web application that helps users analyze and improve their resumes using AI-powered insights and recommendations.

## Features

- **Resume Analysis**

  - ATS Compatibility Check
  - Keyword Match Analysis
  - Content Quality Assessment
  - Grammar & Style Review
  - Impact Statement Analysis
  - Word Count and Readability Metrics

- **Interactive Dashboard**

  - Overall Resume Score
  - Detailed Section Scores
  - Priority-based Improvement Suggestions
  - Visual Progress Indicators

- **Export Options**

  - PDF Report Generation
  - DOCX Export Support
  - Online Resume Sharing

- **AI-Powered Features**
  - Smart Content Recommendations
  - Industry-specific Keyword Suggestions
  - Writing Style Improvements
  - Chat with AI Mentor

## Tech Stack

- **Frontend**

  - Next.js 14 (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Lucide Icons

- **Backend**

  - Next.js API Routes
  - Prisma ORM
  - NextAuth.js
  - PDFKit
  - docx

- **Authentication**
  - NextAuth.js with Credentials Provider
  - JWT Session Handling

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A local or remote database (PostgreSQL recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

### Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

1. Build the application:

```bash
npm run build
# or
yarn build
```

2. Start the production server:

```bash
npm run start
# or
yarn start
```

The production build will be available at the URL specified in your `NEXTAUTH_URL` environment variable.

## Usage

1. **Upload Resume**

   - Support for PDF, DOCX, and TXT formats
   - Optional job description input for targeted analysis

2. **View Analysis**

   - Get instant feedback on your resume
   - See detailed scores and suggestions
   - Access AI-powered improvements

3. **Export Report**
   - Download comprehensive PDF reports
   - Share resume analysis online
   - Export to different formats

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- PDF generation using [PDFKit](http://pdfkit.org/)
- DOCX support via [docx](https://docx.js.org/)
