import { Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/lab/LoadingButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { FC } from "react";

interface RecipeFormProps {
  isLoading: boolean;
  formValues: IRecipeFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDeleteIconClick: (index: number, stateName: string) => void;
  onIngredientChange: (index: number, value: string) => void;
  onDirectionChange: (index: number, value: string) => void;
  onAddIconClick: (stateName: string) => void;
  onClose: () => void;
}

const RecipeForm: FC<RecipeFormProps> = ({
  isLoading,
  formValues,
  onChange,
  onSubmit,
  onDeleteIconClick,
  onAddIconClick,
  onClose,
  onIngredientChange,
  onDirectionChange,
}) => {
  const { title, description, ingredients, directions } = formValues;
  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}
    >
      <Typography component="h1" variant="h4" align="center" mb={4}>
        Add Recipe
      </Typography>

      <Grid container spacing={3} component="form" onSubmit={onSubmit}>
        <Grid item xs={12}>
          <TextField
            required
            aria-required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="Title"
            variant="standard"
            value={title}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            required
            aria-required
            id="description"
            name="description"
            label="description"
            fullWidth
            autoComplete="Description"
            variant="standard"
            value={description}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={11}>
          {ingredients.map((ingredient: string, index: number) => (
            <Stack direction="row" alignItems={"center"} key={index}>
              <TextField
                aria-required
                id={`ingredient-${index}`}
                required
                name={`ingredient-${index}`}
                label="Ingredients"
                fullWidth
                autoComplete={`ingredient-${index}`}
                variant="standard"
                value={ingredient}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onIngredientChange(index, e.target.value);
                }}
              />
              {index !== 0 && (
                <RemoveCircleOutlineIcon
                  color="error"
                  onClick={() => onDeleteIconClick(index, "ingredients")}
                />
              )}
            </Stack>
          ))}
        </Grid>
        <Grid item xs={1}>
          <AddCircleOutlineIcon
            color="primary"
            fontSize="large"
            onClick={() => onAddIconClick("ingredients")}
          />
        </Grid>
        <Grid item xs={11}>
          {directions.map((direction: string, index: number) => (
            <Stack direction="row" alignItems={"center"} key={index}>
              <TextField
                aria-required
                required
                id={`direction-${index}`}
                name={`direction-${index}`}
                label="Directions"
                fullWidth
                autoComplete={`direction-${index}`}
                variant="standard"
                value={direction}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onDirectionChange(index, e.target.value);
                }}
              />
              {index !== 0 && (
                <RemoveCircleOutlineIcon
                  color="error"
                  onClick={() => onDeleteIconClick(index, "directions")}
                />
              )}
            </Stack>
          ))}
        </Grid>
        <Grid item xs={1}>
          <AddCircleOutlineIcon
            color="primary"
            fontSize="large"
            onClick={() => onAddIconClick("directions")}
          />
        </Grid>
        <Grid item xs={12} mt={2}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              disabled={isLoading}
              loading={isLoading}
              loadingIndicator="Loading…"
              className="buttn"
              type="submit"
              onClick={onSubmit}
              fullWidth
              variant="contained"
            >
              Save
            </Button>
            <Button
              disabled={isLoading}
              loading={isLoading}
              loadingIndicator="Loading…"
              className="close_btn"
              type="button"
              onClick={onClose}
              fullWidth
              variant="contained"
            >
              Close
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default RecipeForm;
