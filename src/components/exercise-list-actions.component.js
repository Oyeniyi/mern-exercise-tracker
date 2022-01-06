import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseListTableActions = (props) => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>
                <button
                    type="button"
                    className="btn btn-primary">
                    Edit
                </button>
            </Link>
            &nbsp;
            |
            &nbsp;
            <button onClick={() => { props.deleteExercise(props.exercise._id) }}
                type="button"
                className="btn btn-danger">
                Delete
            </button>
        </td>
    </tr>
);

export default ExerciseListTableActions;