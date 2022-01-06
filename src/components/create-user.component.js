import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateUser = (propos) => {

    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');


    const onChangeUsername = (e) => {
        if (e.target.value !== null && e.target.value !== "")
            setUsername(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username
        };

        axios.post('http://localhost:5000/api/users/add', user)
            .then(res => {
                console.log("res data ==> ", res.data);
                setUsername('');
                if (res.data !== null && res.data !== '')
                    setUser(res.data);
            });
    }

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <h4>Create New User</h4>
            <form onSubmit={onSubmit}>
                <div className="form-group mb-5">
                    <label htmlFor="userInput">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userInput"
                        placeholder="Enter a username"
                        value={username}
                        onChange={onChangeUsername} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create User</button>
                </div>
            </form>
        </div>
    );

};

export default CreateUser;