export const getAllRecipes = async () => {
  const response = await fetch(`http://localhost:8080/api/recipes`, {
    cache: "no-store",
  });
  const { data, success, message } = await response.json();
  if (!response.ok || !success) {
    throw new Error(message);
  }
  return data;
};
export const addRecipe = async (recipe: IRecipeFormData) => {
  const response = await fetch(`http://localhost:8080/api/recipes`, {
    body: JSON.stringify(recipe),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const { data, success, message } = await response.json();
  if (!response.ok || !success) {
    throw new Error(message);
  }
  return data;
};
