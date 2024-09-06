export const cartInitialState =
  JSON.parse(window.localStorage.getItem("cart")) || [];

export const CART_ACTIONS_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

export const updateLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTIONS_TYPES.ADD_TO_CART]: (state, payload) => {
    const { id } = payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(state);
      newCart[productInCartIndex].quantity += 1;

      updateLocalStorage(newCart);

      return newCart;
    }

    const newCart = [
      ...state,
      {
        ...payload,
        quantity: 1,
      },
    ];

    updateLocalStorage(newCart);
    return newCart;
  },
  [CART_ACTIONS_TYPES.REMOVE_FROM_CART]: (state, payload) => {
    const { id } = payload;

    const newCart = state.filter((item) => item.id !== id);
    updateLocalStorage(newCart);

    return newCart;
  },
  [CART_ACTIONS_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([]);

    return [];
  },
};

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];

  return updateState ? updateState(state, actionPayload) : state;
};
