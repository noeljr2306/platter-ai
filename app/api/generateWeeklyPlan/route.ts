import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not set" },
        { status: 500 }
      );
    }

    const { preferences } = await req.json();
    if (!preferences) {
      return NextResponse.json(
        { error: "Missing preferences" },
        { status: 400 }
      );
    }

    const { goal, allergies = [], cuisine = [] } = preferences;
    const prompt = `
    Based on the following user preferences:
    - Diet Goal: ${goal}
    - Allergies: ${allergies.length ? allergies.join(", ") : "None"}
    - Preferred Cuisine: ${cuisine.length ? cuisine.join(", ") : "Any"}

    Generate a healthy **weekly meal plan** with the following format in JSON:
    {
      "Monday": { "breakfast": "...", "lunch": "...", "dinner": "..." },
      "Tuesday": { ... },
      ...
      "Sunday": { ... }
    }

    Also generate a **grocery list** (grouped by food category) based on all meals. Format as:
    {
      "Vegetables": ["...", "..."],
      "Proteins": ["...", "..."],
      ...
    }

    Only return valid JSON like:
    {
      "mealPlan": { ... },
      "groceryList": { ... }
    }
  `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful meal planning assistant.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });
    const data = await response.json();
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json(
        { error: "OpenAI response is missing choices." },
        { status: 500 }
      );
    }
    const message = data.choices[0].message.content.trim();
    const parsed = JSON.parse(message);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
