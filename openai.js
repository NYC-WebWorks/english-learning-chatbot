class OpenAIAPI {
  static async generateResponse(userMessage, conversationHistory = []) {
    const apiKey = process.env.OPENAI_API_KEY;
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You will be provided with a English word, and your task is to suggest 3-4 sample sentences in English so that users can learn them.",
          },
          { role: "user", content: userMessage },
        ],
        max_tokens: 150,
      }),
    });
    const responseData = await response.json();
    // Log the entire API response for debugging
    console.log("Response from OpenAI API:", responseData.choices[0].message);
    // Check if choices array is defined and not empty
    if (
      responseData.choices &&
      responseData.choices.length > 0 &&
      responseData.choices[0].message
    ) {
      return responseData.choices[0].message.content;
    } else {
      // Handle the case where choices array is undefined or empty
      console.error("Error: No valid response from OpenAI API");
      return "Sorry, I couldn't understand that.";
    }
  }
}
module.exports = { OpenAIAPI };
