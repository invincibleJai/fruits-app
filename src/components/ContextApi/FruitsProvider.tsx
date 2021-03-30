import React from 'react';
import FruitsReducer from '../../reducers/FruitsReducer';

export type dispatchProps = ({ type, payload }: { type: string, payload: any }) => void

type FruitsContextProps = {
    state: { fruitsList: any[], loaded: boolean };
    dispatch: dispatchProps;
}

export const FruitsContext = React.createContext({} as FruitsContextProps);

const FruitsProvider: React.FC = (props) => {
    const [state, dispatch] = React.useReducer(FruitsReducer, {fruitsList : [], loaded: false});
    React.useEffect(() => {
        // https://gist.githubusercontent.com/invincibleJai/7f3e2e710e51b27ecfd97b14edf82df6/raw/d9611451e8081089f3d0f45827da9e7548cb02ca/fruits-app
        fetch('http://localhost:8080/api/fruits')
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
                    type: 'FRUITS_LOADED',
                    payload:rowsData
                })
            })
            .catch((err) => {
                console.log(err);
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