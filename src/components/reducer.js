export const initialState = {
    user: null,
    selectedId: null,
    defaultText: "// Code here",
};

const reducer = (state, action) => {
    // console.log(action)

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }

        case 'SELECTED_FILE':
            return {
                ...state,
                selectedId: action.payload
            }

        case 'EDITOR_TEXT':
            return {
                ...state,
                defaultText: action.payload
            }

        default:
            return state;
    }
}

export default reducer;