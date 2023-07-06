export const getRecipeBySlug = async (
  accessToken: string | any,
  slug: string
) => {
  const getRecipeURL = `http://localhost:8080/api/recipes/${slug}`;
  const bearerToken = accessToken && `Bearer ${accessToken}`;
  const response = await fetch(getRecipeURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const { data, success, message } = await response.json();
  if (!response.ok || !success) {
    throw new Error(message);
  }
  return data;
};
export const getAllRecipes = async (
  accessToken: string | any,
  searchTerm?: string | any
) => {
  const getRecipesURL = "http://localhost:8080/api/recipes";
  const bearerToken = accessToken && `Bearer ${accessToken}`;
  const url = searchTerm
    ? `${getRecipesURL}?search=${encodeURIComponent(searchTerm)}`
    : getRecipesURL;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
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
