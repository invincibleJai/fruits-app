import React from 'react';
import { FRUITS_LOADED, FRUITS_LOADED_FAILED } from '../../constants';
import FruitsReducer from '../../reducers/FruitsReducer';

export type dispatchProps = ({ type, payload }: { type: string, payload: any }) => void

type FruitsContextProps = {
    state: { fruitsList: any[], loaded: boolean , loadError?: string };
    dispatch: dispatchProps;
}

export const FruitsContext = React.createContext({} as FruitsContextProps);

const FruitsProvider: React.FC = (props) => {
    const [state, dispatch] = React.useReducer(FruitsReducer, {fruitsList : [], loaded: false});
    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/api/fruits`)
            .then(async (resp) => {
                const data = await resp.json()
                console.log(data);
                const rowsData = data.map((d: any) => {
                    return {
                        cells: [
                            { title: d.name },
                            { title: d.season },
                            { title: "delete", fruitname: d.name }
                        ]
                    }
                });
                dispatch({
                    type: FRUITS_LOADED,
                    payload:rowsData
                })
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: FRUITS_LOADED_FAILED,
                    payload: {loaded: true , loadError: `${err.status} ${err.message}`}
                })
            })
        // eslint-disable-next-line 
    }, [])
  
    const value = {state, dispatch}

    return (
        <FruitsContext.Provider value={value}>
            {props.children}
        </FruitsContext.Provider>
    )
}

export default FruitsProvider;