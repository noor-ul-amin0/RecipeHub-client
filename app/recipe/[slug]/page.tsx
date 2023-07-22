import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import RecipeDetails from "@/components/RecipeDetails/RecipeDetails";
import { getRecipeBySlug } from "@/lib/recipes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Recipe({ params }: Props) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    return redirect("/signin");
  }
  const recipe = await getRecipeBySlug(session.user.accessToken, params.slug);

  return <RecipeDetails recipe={recipe} />;
}
