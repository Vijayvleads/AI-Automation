
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AutomationData } from '../types';

const getApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
  }
  return apiKey;
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    dailyRun: {
      type: Type.OBJECT,
      properties: {
        topUpdates: {
          type: Type.ARRAY,
          description: "A list of 3-5 top AI news updates, summarized.",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique ID for the article." },
              title: { type: Type.STRING, description: "The original title of the article." },
              link: { type: Type.STRING, description: "The source URL of the article." },
              source: { type: Type.STRING, description: "The name of the news source (e.g., 'OpenAI Blog')." },
              summary: { type: Type.STRING, description: "A concise summary of the article." },
            },
            required: ["id", "title", "link", "source", "summary"]
          }
        },
        postIdeas: {
          type: Type.ARRAY,
          description: "A list of 3 social media post ideas based on the top updates.",
          items: {
            type: Type.OBJECT,
            properties: {
              rank: { type: Type.INTEGER, description: "The ranking of the post idea from 1 to 3." },
              title: { type: Type.STRING, description: "A catchy title for the social media post idea." },
              summary: { type: Type.STRING, description: "A brief on the angle of the post." },
              sources: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of source URLs backing the claims in the post." },
              copies: {
                type: Type.OBJECT,
                properties: {
                  linkedIn: { type: Type.STRING, description: "The post copy tailored for LinkedIn (max 2800 chars)." },
                  x: { type: Type.STRING, description: "The post copy for X (formerly Twitter) (max 280 chars)." },
                  instagram: { type: Type.STRING, description: "The post copy for Instagram (max 2000 chars)." }
                },
                required: ["linkedIn", "x", "instagram"]
              },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of relevant hashtags." },
              imagePrompts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 1-2 detailed SDXL image prompts." }
            },
            required: ["rank", "title", "summary", "sources", "copies", "hashtags", "imagePrompts"]
          }
        }
      },
      required: ["topUpdates", "postIdeas"]
    },
    planner: {
      type: Type.ARRAY,
      description: "A list of scheduled posts for the planner view.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Unique ID for the scheduled post." },
          platform: { type: Type.STRING, enum: ["LinkedIn", "X", "Instagram"], description: "The social media platform." },
          content: { type: Type.STRING, description: "The text content of the post." },
          postTime: { type: Type.STRING, description: "The scheduled posting time in ISO 8601 format." },
          status: { type: Type.STRING, enum: ["Scheduled", "Posted", "Failed"], description: "The current status of the post." },
          postUrl: { type: Type.STRING, description: "The URL of the post after it has been published (optional)." }
        },
        required: ["id", "platform", "content", "postTime", "status"]
      }
    },
    logs: {
        type: Type.ARRAY,
        description: "A sequence of log entries simulating the automation process.",
        items: {
            type: Type.OBJECT,
            properties: {
                timestamp: { type: Type.STRING, description: "Timestamp in ISO 8601 format." },
                level: { type: Type.STRING, enum: ["INFO", "WARN", "ERROR"], description: "Log level." },
                step: { type: Type.STRING, description: "The automation step (e.g., 'FetchFeeds', 'GenerateContent')." },
                message: { type: Type.STRING, description: "The log message." }
            },
            required: ["timestamp", "level", "step", "message"]
        }
    },
    settings: {
        type: Type.OBJECT,
        description: "Mock settings data.",
        properties: {
            rssFeeds: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        url: { type: Type.STRING },
                        enabled: { type: Type.BOOLEAN }
                    },
                    required: ["id", "url", "enabled"]
                }
            },
            brandVoice: { type: Type.STRING, description: "The brand voice description." }
        },
        required: ["rssFeeds", "brandVoice"]
    }
  }
};

export const generateDailyRunData = async (): Promise<AutomationData> => {
  const prompt = `
    Simulate a full daily run of a social media automation bot for today's date. The bot's purpose is to report on the latest AI news.
    Generate a complete JSON object that includes:
    1.  'dailyRun': Containing 'topUpdates' (3-5 summarized AI news articles from sources like Google AI, OpenAI, etc.) and 'postIdeas' (3 distinct social media posts based on these updates). Each post idea needs unique copies for LinkedIn, X, and Instagram, plus hashtags and 1-2 detailed SDXL image prompts. Ensure the content is factual and maps to source URLs. The brand voice should be: "Authoritative, insightful, and slightly futuristic. We explain complex AI topics simply, for a tech-savvy audience. Use clear calls-to-action."
    2.  'planner': A list of scheduled posts for the next 24 hours, derived from the generated post ideas.
    3.  'logs': A detailed log of the simulated process, including fetching feeds, deduplicating, summarizing, generating content, and scheduling. Include at least one INFO, one WARN, and one (non-critical) ERROR log for realism.
    4. 'settings': Mock settings data, including a list of 5-7 sample RSS feeds and a description of the brand voice used.
    Ensure all string fields are populated and the JSON strictly adheres to the provided schema.
    Make the news sound recent and plausible for today.
    `;
    
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    // Add placeholder image URLs to post ideas for immediate display
    parsedData.dailyRun.postIdeas.forEach((idea: any, index: number) => {
        idea.imageUrl = `https://picsum.photos/seed/${idea.rank}${index}/512/512`;
    });

    parsedData.planner.forEach((post: any, index: number) => {
        if(post.platform !== 'X') { // X posts are often text-only
            post.imageUrl = `https://picsum.photos/seed/planner${index}/512/512`;
        }
    });

    return parsedData as AutomationData;

  } catch (error) {
    console.error("Error generating data with Gemini:", error);
    // In a real app, you might have more sophisticated error handling or fallback data
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
