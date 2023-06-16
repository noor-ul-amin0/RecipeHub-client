export const getAllRecipes = async (accessToken: string | any) => {
  const bearerToken = accessToken && `Bearer ${accessToken}`;
  const response = await fetch(`http://localhost:8080/api/recipes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
    cache: "no-store",
  });
  const { data, success, message } = await response.json();
  if (!response.ok || !success) {
    throw new Error(message);
  }
  return data;
};
export const addRecipe = async (
  recipe: IRecipeFormData,
  token: string | any
) => {
  const response = await fetch(`http://localhost:8080/api/recipes`, {
    body: JSON.stringify(recipe),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const { data, success, message } = await response.json();
  if (!response.ok || !success) {
    throw new Error(message);
  }
  return data;
};
