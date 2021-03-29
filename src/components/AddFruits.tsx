import * as React from 'react';
import { Form, FormGroup, TextInput, Button, Modal, ModalVariant } from '@patternfly/react-core';

const AddFruits = () => {
    const [fruitName, setFruitName] = React.useState<string>();
    const [fruidSeason, setFruitSeason] = React.useState<string>();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>();

    const handleModalToggle = () => {
        setIsModalOpen((modalopen) => !modalopen)
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
                    <Button key="confirm" variant="primary" onClick={handleModalToggle}>
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
                    <FormGroup label="Season" isRequired fieldId="simple-form-number-01">
                        <TextInput
                            isRequired
                            type="tel"
                            id="simple-form-number-01"
                            placeholder="Enter Fruit Season"
                            name="simple-form-number-01"
                            value={fruidSeason}
                            onChange={(val) => setFruitSeason(val)}
                        />
                    </FormGroup>
                </Form>
            </Modal>
        </>
    )
}

export default AddFruits;