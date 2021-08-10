import { Badge, Button, IconButton, Paper } from "@material-ui/core";
import React, { useState } from "react";
import "./Modal.css";

import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { allBooksActions, modalActions } from "../redux-store/store";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  closeIcon: {
    position: "absolute",
    top: "-20px",
    right: "-20px",
  },
  alert: {
    margin: "10px",
  },
  modalCard: {
    position: "relative",
    top: "45vh",
    right: "-50%",
    transform: "translate(-50%, -50%)",

    textAlign: "center",
    padding: "30px",
    // backgroundColor: "rgb(255, 255, 255)",
    // color: grey,

    maxWidth: "600px",
    borderRadius: "5px",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.562)",
  },
});

function Modal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  // const book=useSelector(s=>s.allBooks.books.filter(book=>book._id===props))
  const history = useHistory();
  const styles = useStyles();
  console.log("Modal...");

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };
  const deletBookHandler = () => {
    setIsLoading(true);
    fetch(
      `https://my-book-store-application.herokuapp.com/books/${props.book._id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        console.log(res);
        if (!res.ok)
          throw new Error("Book not Deleted...[Something Went Wrong]😲");

        dispatch(allBooksActions.deletBook(props.book));
        dispatch(modalActions.closeModal());
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };

  return (
    <div className="overlay">
      <Paper className={styles.modalCard}>
        <div className="modalDiv">
          <img src={props.book.imageLink} alt={props.book.title}></img>
          <h4>
            {props.book.title}
            <Badge
              style={{ marginLeft: "50px" }}
              badgeContent={props.book.genre}
              color="secondary"
            />
          </h4>
          <h6> ~{props.book.authors}</h6>
          <p>{props.book.description}</p>
          {error && <p className="status">{error}</p>}
          {isLoading && <p className="status">Deleting the Book...</p>}

          <IconButton
            size="small"
            color="primary"
            className={styles.closeIcon}
            onClick={closeModalHandler}
            style={{ color: "red" }}
          >
            <CloseIcon />
          </IconButton>
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: "red",
              color: "white",
              marginRight: "20px",
            }}
            onClick={deletBookHandler}
          >
            Delete Book
            <DeleteForeverIcon />
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              history.push(`/updatebook/${props.book._id}`);
            }}
          >
            Update Book
            <UpdateIcon />
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Modal;
