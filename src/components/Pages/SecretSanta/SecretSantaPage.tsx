import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

const SecretSantaPage = () => {
    const [names, setNames] = useState<string[]>([]);
    const [currentName, setCurrentName] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentName.trim()) {
            setNames([...names, currentName.trim()]);
            setCurrentName(''); // Clear the input after adding
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentName(e.target.value);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Add a person to santas secret box</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Add name"
                        value={currentName}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Add Person</Button>
            </Form>

            {/* Display the list of names */}
            <div className="mt-3">
                <h5>Added People:</h5>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {names.map((name, index) => (
                        <li key={index} className="d-flex align-items-center mb-2">
                            <span className="me-2">{name}</span>
                            <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => {
                                    const newNames = names.filter((_, i) => i !== index);
                                    setNames(newNames);
                                }}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SecretSantaPage
