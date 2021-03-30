import { ADD_FRUIT_ACTION, DELETE_FRUIT_ACTION, FRUITS_LOADED } from "../constants";

type ActionProps = {
    type: string,
    payload: any
}

type StateProps = {
    fruitsList: any[];
    loaded: boolean;
}

const FruitsReducer = (state: StateProps, action: ActionProps) => {

    switch(action.type) {
        case FRUITS_LOADED:
            return {fruitsList: [...state.fruitsList, ...action.payload], loaded: true};
        case ADD_FRUIT_ACTION:
            return {fruitsList: [...state.fruitsList, action.payload], loaded: true};
        case DELETE_FRUIT_ACTION:
            return {fruitsList : state.fruitsList.length ? state.fruitsList.filter((d) => d.cells?.[0]?.title !== action.payload.name) : [], loaded: true}
        default:
            return state;
    }
}

export default FruitsReducer;