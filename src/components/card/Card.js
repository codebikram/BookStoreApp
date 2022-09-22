import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Card = (props) => {
  const {
    book,
    imgLink,
    description,
    authors,
    title,
    language,
    viewLink,
    buttonText,
    handleClick,
  } = props;

  const [comment, setComment] = useState('');

  const [responce, setResponce] = useState([]);
  const [show, setShow] = useState(false);

  const fetchComments = async (title) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/getcomments/${title}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setResponce(data.comments);
      }
      setShow(!show);
    } catch (err) {
      console.log(err);
    }
  };
  const btnText = show ? 'Hide comments' : 'Show comments';
  //comment
  const commentSubmit = async (title) => {
    // console.log(title + comment);
    const res = await fetch('http://localhost:5000/api/comments/addcomments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        comments: comment,
      }),
    });
    const data = await res.json();
    console.log(data);
    toast.success('Comment Added', {
      position: toast.POSITION.TOP_CENTER,
    });
    setComment('');
  };
  return (
    <div className="col-lg-4 col-md-6">
      <div className="card mb-5">
        <img src={imgLink} className="card-img-top" alt="Book" height="220" />
        <div className="card-body">
          <h4 className="card-title text-center ">{title}</h4>
          <h5 className="card-text text-muted">
            <em> Written by {authors}</em>
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <strong>Language:</strong> {language}
          </p>
          <a
            rel="noreferrer"
            href={viewLink}
            target="_blank"
            className="link text-info"
          >
            View book
          </a>
          <button
            onClick={() => {
              handleClick(book);
            }}
            className="btn btn-warning mb-2"
          >
            {buttonText}
          </button>
          <form className="form-floating">
            <textarea
              className="form-control mb-2"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
            <label htmlFor="floatingTextarea">Comments</label>
          </form>
          <button
            type="button"
            onClick={() => {
              commentSubmit(title);
            }}
            className="btn btn-success "
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => {
              fetchComments(title);
            }}
            className="btn btn-primary ml"
          >
            {btnText}
          </button>

          {show && (
            <ul>
              {responce.title
                ? responce.comments.map((comment, i) => {
                    return (
                      <li key={i} className="list-el">
                        Username: {comment}
                      </li>
                    );
                  })
                : 'No comments here'}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// book.volumeInfo.imageLinks.thumbnail
export default Card;
