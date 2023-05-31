export const getAllRecipes = async () => {
  const response = await fetch(`/api/recipes`);
  const { data, success, message } = await response.json();
  if (!response.ok || !success) {
    throw new Error(message);
  }
  return data;
};
