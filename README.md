# Newsify - AI-Powered News Aggregator and Summarizer

Newsify is a modern web application that aggregates news from various trusted sources and provides AI-powered summaries using Google's Gemini AI. Built with Next.js and styled with Tailwind CSS, it offers a seamless news reading experience with dark mode support.

## Features

- **News Aggregation**: Collects news from multiple reputable sources via RSS feeds
- **Category Filtering**: Browse news by categories including:
  - General
  - Technology
  - Sports
  - Business
  - Health
  - Entertainment
- **AI Summaries**: Generate concise, structured summaries of articles using Google's Gemini AI
- **Search Functionality**: Search through articles by keywords
- **Responsive Design**: Fully responsive layout with mobile support
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **Frontend**: Next.js 15.2.4
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI with shadcn/ui
- **AI Integration**: Google Generative AI (Gemini)
- **RSS Parser**: rss-parser
- **Date Formatting**: date-fns
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-news
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```
GOOGLE_API_KEY=your_google_ai_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `GOOGLE_API_KEY`: Required for AI summarization feature (Get from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Features in Detail

### News Aggregation
- Fetches news from multiple RSS feeds
- Automatically updates with latest articles
- Handles various RSS feed formats and media content

### AI Summarization
- Generates structured summaries with:
  - Attention-grabbing headlines
  - 3-4 critical points
  - Compelling conclusions
- Handles content truncation for API limits
- Error handling for failed summarization attempts

### User Interface
- Responsive article cards with hover effects
- Clean and modern design
- Smooth transitions and animations
- Toast notifications for user feedback
- Accessible components with ARIA support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Harshil Khanna