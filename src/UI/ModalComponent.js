import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ModalComponent(props) {
    const { currentItem, user_id, onHide, fetchData } = props;
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        beforeCurrency: '',
        beforeMoney: '',
        afterCurrency: '',
        afterMoney: ''
    });

    useEffect(() => {
        if (currentItem) {
            setFormData({
                title: currentItem.title,
                date: currentItem.date,
                beforeCurrency: currentItem.beforeCurrency,
                beforeMoney: currentItem.beforeMoney,
                afterCurrency: currentItem.afterCurrency,
                afterMoney: currentItem.afterMoney
            });
        }
    }, [currentItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // API에 업데이트 요청
            await axios.put(`https://6708bcb98e86a8d9e42fd4e3.mockapi.io/crud/${user_id}/${currentItem.id}`, {
                title: formData.title,  
                date: formData.date,
                beforeCurrency: formData.beforeCurrency,
                beforeMoney: formData.beforeMoney,
                afterCurrency: formData.afterCurrency,
                afterMoney: formData.afterMoney,
            });

        
            fetchData(); 
            alert('Item updated successfully!'); 
            onHide();
        } catch (error) {
            console.error('Error updating item:', error);
            alert('Error updating item. Please try again.'); 
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Title
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Title</h4>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange} 
                    placeholder="Enter title"
                />

                <h4>Date</h4>
                <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    readOnly
                />

                <h4>Before Currency</h4>
                <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="beforeCurrency"
                    value={formData.beforeCurrency}
                    onChange={handleChange}
                    placeholder="Enter before currency"
                />

                <h4>Before Money</h4>
                <input
                    readOnly
                    type="number"
                    className="form-control"
                    name="beforeMoney"
                    value={formData.beforeMoney}
                    onChange={handleChange}
                    placeholder="Enter before money"
                />

                <h4>After Currency</h4>
                <input
                    readOnly
                    type="text"
                    className="form-control"
                    name="afterCurrency"
                    value={formData.afterCurrency}
                    onChange={handleChange}
                    placeholder="Enter after currency"
                />

                <h4>After Money</h4>
                <input
                    readOnly
                    type="number"
                    className="form-control"
                    name="afterMoney"
                    value={formData.afterMoney}
                    onChange={handleChange}
                    placeholder="Enter after money"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;
