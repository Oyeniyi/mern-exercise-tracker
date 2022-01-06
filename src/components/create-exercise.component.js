import React, { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";

import DatePicker from "react-datepicker";
import axios from 'axios';

const CreateExercise = (props) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const [exercise, setExercise] = useState('');

    const getAllUsers = () => {
        axios.get('http://localhost:5000/api/users/')
            .then(res => {
                if (res.data !== null && res.data.length > 0) {
                    setUsers(res.data.map(user => user.username));
                    setUsername(res.data[0].username);
                }
            });
    }


    const onChangeUsername = (e) => {
        if (e.target.value !== null && e.target.value !== "")
            setUsername(e.target.value);
    }

    const onChangeDescription = (e) => {
        if (e.target.value !== null && e.target.value !== "")
            setDescription(e.target.value);
    }

    const onChangeDuration = (e) => {
        if (e.target.value !== null && e.target.value !== "")
            setDuration(e.target.value);
    }

    const onChangeDate = (date) => {
        if (date !== null && date !== "")
            setDate(date);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration,
            date
        };

         axios.post('http://localhost:5000/api/exercises/add', exercise)
            .then(res => {
                console.log("res data ==> ", res.data);
                if (res.data !== null && res.data !== '') {
                    setExercise(res.data);
                    navigate('/');
                }
                    
            });

        console.log("exercise ==> ", exercise);

    }

    useEffect(() => {

        getAllUsers();

    }, []);

    return (
        <div>
            <h4>Create New Exercise Log</h4>
            <form onSubmit={onSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="userInput">Username</label>
                    <select
                        className="form-control"
                        id="userInput"
                        value={username}
                        onChange={onChangeUsername}>
                        {users !== null && users.map((user) => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="descriptionInput">Description</label>
                    <textarea
                        className="form-control" id="descriptionInput"
                        value={description} onChange={onChangeDescription} rows="4"></textarea>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="durationInput">Duration (in minutes)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="durationInput"
                        placeholder="Enter a duration"
                        value={duration}
                        onChange={onChangeDuration}/>
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="dateInput">Date</label>
                    <div>
                        <DatePicker
                            id="dateInput"
                            selected={date}
                            onChange={onChangeDate}/>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create Exercise Log</button>
                </div>
            </form>
        </div>
    )
    
}

export default CreateExercise;