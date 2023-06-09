import { DialogProps, Dialog, DialogContent } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import RecipeForm from "../RecipeForm/RecipeForm";
import { addRecipe } from "@/lib/recipes";

interface AddRecipeDialogProps extends DialogProps {
  onClose: () => void;
  open: boolean;
}

const AddRecipeDialog: FC<AddRecipeDialogProps> = ({ open, onClose }) => {
  const [form, setForm] = useState<IRecipeFormData>({
    title: "",
    description: "",
    ingredients: [""],
    directions: [""],
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setForm((prevState: IRecipeFormData) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  const handleAddIconClick = (stateToUpdate: string) => {
    const state = form[stateToUpdate];
    if (state[state.length - 1] !== "") {
      setForm((prevState: IRecipeFormData) => ({
        ...prevState,
        [stateToUpdate]: [...prevState[stateToUpdate], ""],
      }));
    }
  };

  const handleDeleteIconClick = (index: number, stateToUpdate: string) => {
    const updatedState = [...form[stateToUpdate]];
    updatedState.splice(index, 1);
    setForm((prevState: IRecipeFormData) => ({
      ...prevState,
      [stateToUpdate]: updatedState,
    }));
  };
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...form.ingredients];
    updatedIngredients[index] = value;
    setForm((prevState: IRecipeFormData) => ({
      ...prevState,
      ingredients: updatedIngredients,
    }));
  };
  const handleDirectionChange = (index: number, value: string) => {
    const updatedDirections = [...form.directions];
    updatedDirections[index] = value;
    setForm((prevState: IRecipeFormData) => ({
      ...prevState,
      directions: updatedDirections,
    }));
  };
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitting(true);
    try {
      await addRecipe(form);
      setForm({
        title: "",
        description: "",
        ingredients: [""],
        directions: [""],
      });
      alert("Recipe added successfully");
      onClose();
    } catch (error) {
      alert(error);
    } finally {
      setIsFormSubmitting(false);
    }
  };
  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogContent>
          <RecipeForm
            isLoading={isFormSubmitting}
            formValues={form}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onAddIconClick={handleAddIconClick}
            onDeleteIconClick={handleDeleteIconClick}
            onIngredientChange={handleIngredientChange}
            onDirectionChange={handleDirectionChange}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddRecipeDialog;