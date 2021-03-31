import { Alert } from '@patternfly/react-core';
import React from 'react';
import AddFruits from './AddFruits';
import { FruitsContext } from './ContextApi/FruitsProvider';
import FruitsList from './FruitsList';

import './fruitsapp.css';

const FruitApp: React.FC = () => {
    const { state: { fruitsList, loaded, loadError }, dispatch } = React.useContext(FruitsContext);

    return !loadError ?
        (
            <>
                <AddFruits dispatch={dispatch} />
                <FruitsList loaded={loaded} fruitsList={fruitsList} dispatch={dispatch} />
            </>
        ) : <Alert style={{marginTop: 0}} variant="danger" isInline title={loadError} />


}

export default FruitApp;