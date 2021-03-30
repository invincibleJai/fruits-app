import React from 'react';
import AddFruits from './AddFruits';
import  { FruitsContext } from './ContextApi/FruitsProvider';
import FruitsList from './FruitsList';

const FruitApp: React.FC = () => {
    const { state: { fruitsList, loaded }, dispatch } = React.useContext(FruitsContext);

    return (
        <>
            <AddFruits dispatch={dispatch}/>
            <FruitsList loaded={loaded} fruitsList={fruitsList} dispatch={dispatch}/>
        </>
    )
}

export default FruitApp;