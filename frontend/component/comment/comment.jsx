import React from 'react';
import './comment.scss';

const Comment = ({ comments = [] }) => {
    return (
        <section className="comment-section">
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <h4>Comment {index + 1}</h4>
                    <p>{comment}</p>
                </div>
            ))}
        </section>
    );
};

export default Comment;