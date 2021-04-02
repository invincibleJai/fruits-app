import * as React from 'react';
import { Form, FormGroup, TextInput, Button, Modal, ModalVariant, FormAlert, Alert, FormSelect, FormSelectOption } from '@patternfly/react-core';
import { dispatchProps } from './ContextApi/FruitsProvider';
import { ADD_FRUIT_ACTION } from '../constants';

const AddFruits: React.FC<{ dispatch: dispatchProps }> = ({ dispatch }) => {
    const [fruitName, setFruitName] = React.useState<string>('');
    const [fruitSeason, setFruitSeason] = React.useState<string>('');
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>();
    const [error, setError] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('You must fill out all required fields before you can proceed.');

    const handleModalToggle = () => {
        setError(false);
        setFruitName('');
        setFruitSeason('');
        setIsModalOpen((modalopen) => !modalopen)
    }

    const options = [
        { value: 'summer', label: 'summer', disabled: false },
        { value: 'winter', label: 'winter', disabled: false },
        { value: 'fall', label: 'fall', disabled: false },
        { value: 'all', label: 'all', disabled: false }
    ]
    const handleModalSubmit = () => {
        console.log(fruitName, fruitSeason);
        const requestBody = {
            name: fruitName,
            season: fruitSeason
        }
        if (fruitName && fruitSeason) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            };
            fetch(`${process.env.REACT_APP_API_HOST}/api/fruit`, requestOptions)
                .then((resp) => {
                    console.log(resp);
                    dispatch({
                        type: ADD_FRUIT_ACTION,
                        payload: {
                            cells: [
                                { title: fruitName },
                                { title: fruitSeason },
                                { title: "delete", fruitname: fruitSeason }
                            ]
                        }
                    });
                    setError((err) => !err);
                    setIsModalOpen((modalopen) => !modalopen);
                    setFruitName('');
                    setFruitSeason('');
                })
                .catch((err) => {
                    console.log(err);
                    setError((err) => !err);
                    setErrorMessage(`${err.status} - ${err.statusText}`)
                })
        } else {
            setError((err) => !err);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleModalToggle}>
                Add Fruits
        </Button>
            <Modal
                title="Add Fruits"
                variant={ModalVariant.medium}
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="confirm" variant="primary" onClick={handleModalSubmit}>
                        Confirm
                    </Button>,
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>
                ]}
            >
                <Form>
                    <FormGroup label="Name" isRequired fieldId="simple-form-email-01">
                        <TextInput
                            isRequired
                            type="email"
                            id="simple-form-email-01"
                            placeholder="Enter Fruit Name"
                            name="simple-form-email-01"
                            value={fruitName}
                            onChange={(val) => setFruitName(val)}
                        />
                    </FormGroup>

                    <FormGroup label="Season dropdown" fieldId="horizontal-form-title">
                        <FormSelect
                            value={fruitSeason}
                            onChange={(val) => setFruitSeason(val)}
                            id="horzontal-form-title"
                            name="horizontal-form-title"
                            aria-label="Your title"
                        >
                            {options.map((option, index) => (
                                <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
                            ))}
                        </FormSelect>
                    </FormGroup>
                    {error && (
                        <FormAlert>
                            <Alert
                                variant="danger"
                                title={errorMessage}
                                aria-live="polite"
                                isInline
                            />
                        </FormAlert>
                    )}
                </Form>
            </Modal>
        </>
    )
}

export default AddFruits;