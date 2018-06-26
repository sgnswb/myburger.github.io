import * as actionTypes from '../actions/actionTypes';

const initState = {
	ingredients: null,
	totalPrice: 3.5,
	error: false,
	building: false
};

const INGREDIENT_PRICE = {
	cheese: 1.2,
	bacon: 2.3,
	meat: 2.1,
	salad: 0.5
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
				building: true
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
				building: true
			};
		case actionTypes.SET_INGREDIENT:
			return {
				...state,
				ingredients: action.ingredients,
				totalPrice: 3.5,
				error: false,
				building: false
			};
		case actionTypes.FETCH_INGREDIENT_FAILED:
			return {
				...state,
				error: true
			};
		default:
			return state;
	}
};

export default reducer;