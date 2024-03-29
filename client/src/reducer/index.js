import {
  FILTER_BY_DIETS,
  GET_RECIPES,
  FILTER_BY_SOURCE,
  ERROR,
  LOADING,
  ORDER_BY_NAME,
  ORDER_BY_PUNTUACION,
  POST_RECIPE,
  GET_DIETS,
  GET_BY_ID,
  DELETE,
  RESET_RECIPE,
} from "../actions/index";

const initialState = {
  recipe: [],
  backupAllRecipes: [],
  diets: [],
  detail: [],
  filterRecipe: [],
  cargando: false,
  error: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipe: action.payload,
        backupAllRecipes: action.payload,
        cargando: false,
        error: false,
      };
    case FILTER_BY_DIETS:
      const allRecipe = state.backupAllRecipes;
      const dietsFiltered =
        action.payload === "All"
          ? allRecipe
          : allRecipe.filter((el) => {
              if (typeof el.diets[0] === "object") {
                el.diets = el.diets.map((e) => e.name.toLowerCase());
              } else {
                el.diets = el.diets.map((e) => e.toLowerCase());
              }

              if (el.diets.includes(action.payload)) return el;
            });
      return {
        ...state,
        recipe: dietsFiltered,
      };
    case FILTER_BY_SOURCE:
      const allRecipebySource = state.backupAllRecipes;
      var recipeSource;
      if (action.payload === "All") {
        recipeSource = allRecipebySource;
      } else if (action.payload === "db") {
        recipeSource = allRecipebySource.filter((e) => e.createdInBd);
      } else {
        recipeSource = allRecipebySource.filter((e) => !e.createdInBd);
      }

      return {
        ...state,
        recipe: recipeSource,
      };

    case ORDER_BY_NAME:
      const sortArr =
        action.payload === "asc"
          ? state.recipe.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipe.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        recipe: sortArr,
      };
    case ORDER_BY_PUNTUACION:
      const sortArr1 =
        action.payload === "menor"
          ? state.recipe.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipe.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipe: sortArr1,
      };
    case GET_DIETS:
      var filterDiets = action.payload.map((e) => e.name);
      return {
        ...state,
        diets: filterDiets,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: [action.payload],
        cargando: false,
      };
    case DELETE:
      var deleteRecipe = state.recipe.filter(
        (e) => e.id !== Number(action.payload)
      );
      return {
        ...state,
        recipe: deleteRecipe,
      };
    case RESET_RECIPE:
      return {
        ...state,
        detail: [],
      };
    case LOADING:
      return {
        ...state,
        cargando: true,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false,
        recipe: [],
      };
    default:
      return state;
  }
}
