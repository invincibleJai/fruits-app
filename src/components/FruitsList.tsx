import * as React from 'react';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Pagination } from "@patternfly/react-core";

const columns = [
    { title: "Name" },
    { title: "Season" },
    { title: "Delete" }
];

const defaultRows = [
    {
        cells: [
            { title: "Banana" },
            { title: "Row 1 column 2" },
            { title: "delete", fruitName: "Banana" }
        ]
    },
    {
        cells: [
            { title: "Banana" },
            { title: "Row 2 column 2" },
            { title: "delete" }
        ]
    },
    {
        cells: [
            { title: "Row 3 column 1" },
            { title: "Row 3 column 2" },
            { title: "delete" }
        ]
    },
    {
        cells: [
            { title: "Mango" },
            { title: "Row 4 column 2" },
            { title: "Row 4 column 3" }
        ]
    },
    {
        cells: [
            { title: "Banana" },
            { title: "Row 5 column 2" },
            { title: "delete" }
        ]
    },
    {
        cells: [
            { title: "Banana" },
            { title: "Row 6 column 2" },
            { title: "delete" }
        ]
    }
];

const RenderPagination: React.FC<{ page: any, perPage: any, handleSetPage: any, handlePerPageSelect: any }> = ({
    page,
    perPage,
    handleSetPage,
    handlePerPageSelect
}) => {
    return (
        <Pagination
            isCompact
            itemCount={defaultRows.length}
            page={page}
            perPage={perPage}
            defaultToFullPage
            onSetPage={handleSetPage}
            onPerPageSelect={handlePerPageSelect}
            perPageOptions={[
                { title: "3", value: 3 },
                { title: "5", value: 5 },
                { title: "12", value: 12 },
                { title: "20", value: 20 }
            ]}
        />
    );
};

const FruitsList = () => {
    const defaultPerPage = 2;
    const [perPage, setPerPage] = React.useState(defaultPerPage);
    const [page, setPage] = React.useState(1);
    const [rows, setRows] = React.useState(defaultRows.slice(0, defaultPerPage));

    const handleSetPage = (_evt: any, newPage: any, perPage: any, startIdx: any, endIdx: any) => {
        setPage(newPage);
        setRows(defaultRows.slice(startIdx, endIdx));
    };

    const handlePerPageSelect = (_evt: any, newPerPage: any, newPage: any, startIdx: any, endIdx: any) => {
        setPerPage(newPerPage);
        setPage(newPage);
        setRows(defaultRows.slice(startIdx, endIdx));
    };
    const currentRows = rows.map((row) => ({ cells: row.cells }));
    const deleteFruits = (e: React.SyntheticEvent, item: any) => {
        console.log(e, item)
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
        <React.Fragment>
            <Table
                aria-label="Automated pagination table"
                cells={columns}
                rows={currentRows}
                rowWrapper={rowWrapperFunc}
            >
                <TableHeader />
                <TableBody />
            </Table>
            <RenderPagination
                page={page}
                perPage={perPage}
                handleSetPage={handleSetPage}
                handlePerPageSelect={handlePerPageSelect}
            />
        </React.Fragment>
    );
};

export default FruitsList;