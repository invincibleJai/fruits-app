import * as React from 'react';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { dispatchProps } from './ContextApi/FruitsProvider';
import { DELETE_FRUIT_ACTION } from '../constants';

const columns = [
    { title: "Name" },
    { title: "Season" },
    { title: "Action" }
];

type FruitsListProps = {
    fruitsList: any[],
    loaded: boolean,
    dispatch:dispatchProps
}

const FruitsList: React.FC<FruitsListProps> = ({loaded, fruitsList, dispatch}) => {

    const deleteFruits = (e: React.SyntheticEvent, item: any) => {
        console.log(e, item);
        if (item.fruitname) {
            const requestOptions = {
                method: 'DELETE'
            };
            fetch(`http://localhost:8080/api/fruit/${item.fruitname}`, requestOptions)
                .then((resp) => {
                    console.log(resp);
                    dispatch({
                        type: DELETE_FRUIT_ACTION,
                        payload: {name: item.fruitname}
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const rowWrapperFunc = (props: any) => {
        console.log(props)
        return (<tr>
            {props.row.cells.map((pr: any) => {
                return <td key={pr.title}>{pr.title === 'delete' ? <button onClick={(e: React.SyntheticEvent) => deleteFruits(e, pr)}>Delete</button> : pr.title}</td>
            })}
        </tr>)
    }
    return (
        <>
            {loaded ?
                (<>
                    <Table
                        aria-label="Automated pagination table"
                        cells={columns}
                        rows={fruitsList}
                        rowWrapper={rowWrapperFunc}
                    >
                        <TableHeader />
                        <TableBody />
                    </Table>
                </>) : (<h1>Loading....</h1>)}
        </>
    );
};

export default FruitsList;