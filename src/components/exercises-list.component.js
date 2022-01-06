import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ExerciseListTableActions from './exercise-list-actions.component';


const ExercisesList = (props) => {

    const [exercises, setExercises] = useState([]);
    const [exercise, setExercise] = useState('');


    const getAllExercises = () => {
        axios.get('http://localhost:5000/api/exercises/')
            .then(res => {
                console.log("res.data ===> ", res.data);
                if (res.data !== null && res.data.length > 0) {
                    setExercises(res.data);
                }
            });

    }

    const deleteExercise = (id) => {
        console.log("id ===> ", id);
        axios.delete('http://localhost:5000/api/exercises/'+id)
            .then(res => {
                console.log("res.data ===> ", res.data);
                if (res.data !== null) {
                    setExercises(exercises.filter(el => el._id !== id));
                }
            });
    }


    useEffect(() => {
        getAllExercises();
    }, []);

    
    return (
        <div>
            <h4>Logged exercises</h4>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(currentExercise => (
                        <ExerciseListTableActions
                            exercise={currentExercise}
                            deleteExercise={deleteExercise}
                            key={currentExercise._id}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )


};

export default ExercisesList;