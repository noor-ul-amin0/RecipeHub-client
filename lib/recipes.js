export const getRecipesByCreator = async (creator) => {
  const response = await fetch(`/api/recipes?creator=${creator}`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return await response.json();
};
