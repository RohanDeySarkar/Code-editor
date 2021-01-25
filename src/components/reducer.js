export const initialState = {
    user: null,
    selectedId: null,
};

const reducer = (state, action) => {
    // console.log(action)

    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            }

        case "LOGOUT":
            return {
                ...state,
                user: null
            }

        case "SELECTED_FILE":
            return {
                ...state,
                selectedId: action.payload
            }

        default:
            return state;
    }
}

export default reducer;