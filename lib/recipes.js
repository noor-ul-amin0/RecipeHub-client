export const getUserRecipes = async (creatorId) => {
  const response = await fetch(`/api/user/${creatorId}/recipes`);
  const { data, success, message } = await response.json();
  if (!response.ok || !success) {
    throw new Error(message);
  }
  return data;
};
