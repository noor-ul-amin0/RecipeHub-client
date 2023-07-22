export async function signUp(
  fullName: string,
  email: string,
  password: string
) {
  const response = await fetch(`http://localhost:8080/api/users/signup`, {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message);
  }
  return response;
}
