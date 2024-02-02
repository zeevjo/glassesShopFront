async function customfetch<T>(requestConfig: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  headers?: Record<string, string>;
}): Promise<T> {
  try {
    const { url, method, body, headers } = requestConfig;
    const defaultValue: Partial<T> = {};

    const options: RequestInit = {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        ...headers, // Custom headers can be provided
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
      //throw { status: response.status, message: `Request failed with status: ${response.status}` };
    }

    // Check if the response has content and is of type JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return defaultValue as T;
 
    }
    // return response.json();
  } catch (error) {
    throw error;
  }
}

// Example usage:
const requestConfig = {
  url: "https://example.com/answer",
  method: "POST",
  body: { answer: 42 },
  headers: {
    // Add custom headers here if needed
    // "Authorization": `Bearer YourAccessToken`,
  },
};

export default customfetch;
// customfetch(requestConfig)
//   .then((data) => {
//     console.log(data); // JSON data parsed by `response.json()`
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
