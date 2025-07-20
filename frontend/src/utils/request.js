const BASE_URL = "https://cs595-project-2.onrender.com"; 

export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("API POST error:", error);
    throw error;
  }
}

export async function getData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error("API GET error:", error);
    throw error;
  }
}
