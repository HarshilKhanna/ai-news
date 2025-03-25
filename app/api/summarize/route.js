import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  try {
    console.log('Received summarize request');
    const { articleUrl, articleContent } = await request.json();
    console.log('Article URL:', articleUrl);
    console.log('Article content length:', articleContent?.length || 0);

    // Log API key status (without exposing the actual key)
    const apiKey = process.env.GOOGLE_API_KEY;
    console.log('API Key status:', apiKey ? 'Present' : 'Missing');

    if (!apiKey) {
      console.error('Google API key is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Google API key is not configured',
        },
        { status: 500 }
      );
    }

    if (!articleUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article URL is required',
        },
        { status: 400 }
      );
    }

    if (!articleContent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article content is required',
        },
        { status: 400 }
      );
    }

    // Clean and validate content
    const cleanContent = articleContent.trim();
    console.log('Cleaned content length:', cleanContent.length);

    // Truncate content to fit within model limits while preserving complete sentences
    let truncatedContent = cleanContent.substring(0, 4000);
    const lastPeriod = truncatedContent.lastIndexOf('.');
    if (lastPeriod > 0) {
      truncatedContent = truncatedContent.substring(0, lastPeriod + 1);
    }
    console.log('Truncated content length:', truncatedContent.length);

    // Generate summary using Gemini
    console.log('Generating summary with Gemini');
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      const prompt = `Analyze this article and provide a STRONG, CONCISE summary with these requirements:

1. Start with a powerful, attention-grabbing headline
2. List 3-4 CRITICAL points that capture the essence of the article
3. Use strong, assertive language
4. Focus on the most impactful information
5. End with a compelling conclusion

Article:
${truncatedContent}

Format your response as:
HEADLINE: [Your attention-grabbing headline]

KEY POINTS:
• [Point 1]
• [Point 2]
• [Point 3]
• [Point 4]

CONCLUSION: [Your compelling conclusion]`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const summary = response.text();
      
      console.log('Summary generated successfully');

      return NextResponse.json({
        success: true,
        summary,
        originalLength: cleanContent.length,
        summarizedLength: summary.length
      });
    } catch (apiError) {
      console.error('Google API error:', apiError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to generate summary with Gemini',
          message: apiError.message,
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in summarize API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to summarize article. Please try again later.',
        message: error.message,
      },
      { status: 500 }
    );
  }
} 