import { Button, Paper, TextField } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { allBooksActions, modalActions } from "../redux-store/store";
import "./AddNewBook.css";
import useForm from "./customHooks/useForm";
import Input from "./form-reusable-components/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginTop: theme.spacing(1),
      minWidth: "35ch",
      [theme.breakpoints.down("xs")]: {
        width: "100vw",
      },
    },
  },
  btn: {
    marginTop: "2rem",
    padding: ".5rem 1rem",
    width: "auto",
  },
  paper: {
    boxSizing: "border-box",

    // width: "100%",
    minHeight: "90vh",
    [theme.breakpoints.down("xs")]: {
      minHeight: "100vh",
      padding: "20px",
    },
  },
}));

function AddNewBook(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const books = useSelector((s) => s.allBooks.books);
  const location = useLocation();
  const params = useParams();
  // console.log(location);
  // console.log(params.id);
  let initialFormState = {
    title: "",
    authors: "",
    description: "",
    genre: "",
    imageLink: "",
  };
  if (params.id) {
    let book = books.filter((book) => book._id === params.id);
    initialFormState = {
      title: book[0].title,
      authors: book[0].authors,
      description: book[0].description,
      genre: book[0].genre,
      imageLink: book[0].imageLink,
    };
  }

  const {
    formState,
    setFormState,
    inputChangeHandler,
    errors,
    setErrors,
    validate,
  } = useForm(initialFormState);

  const { authors, title, description, genre, imageLink } = formState;

  const addBookHandler = (e) => {
    e.preventDefault();
    console.log("Book Added...");
    if (validate(formState)) {
      setIsLoading(true);
      fetch("https://my-book-store-application.herokuapp.com/books", {
        method: "POST",
        body: JSON.stringify({
          authors,
          genre,
          title,
          description,
          imageLink,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (!res.ok) {
            // return res.json().then((err) => {
            //   console.log(err);
            //   throw new Error(err.error.message);
            // });
            throw new Error(
              "Book was not added..Something Went Wrong..Try Again."
            );
          } else {
            return res.json();
          }
        })
        .then((data) => {
          dispatch(allBooksActions.addBook(data));
          setFormState(initialFormState);
          console.log(data);
        })
        .catch((err) => {
          setError(err.message);
          setTimeout(() => setError(""), 2500);
          console.log(err.message);
        });
    }
  };
  const updateBookHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Book Added...");
    fetch(
      `https://my-book-store-application.herokuapp.com/books/${params?.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          authors,
          genre,
          title,
          description,
          imageLink,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) {
          const err = res.json();
          console.log(err);
          throw new Error("Book was not UPDATED..Something Went Wrong..");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        dispatch(allBooksActions.updateBook(data));
        dispatch(modalActions.upDateModal(data));
        history.push("/mybooks");
        setFormState(initialFormState);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };

  return (
    <Paper className={classes.paper}>
      <form className={classes.root} noValidate autoComplete="off">
        <Input
          required
          variant="outlined"
          name="title"
          label="Title of the Book"
          value={formState.title}
          onChange={inputChangeHandler}
          error={errors.title}
        />
        <Input
          name="authors"
          value={formState.authors}
          required
          // style={{ color: "red" }}
          onChange={inputChangeHandler}
          variant="outlined"
          label="Author"
          error={errors.authors}
        />
        <Input
          name="genre"
          value={formState.genre}
          required
          onChange={inputChangeHandler}
          variant="outlined"
          id="filled-basic"
          label="Genre"
          error={errors.genre}
        />
        <Input
          name="description"
          value={formState.description}
          required
          onChange={inputChangeHandler}
          multiline
          max-rows={4}
          variant="outlined"
          id="outlined-basic"
          label="Description"
          error={errors.description}
        />
        <Input
          name="imageLink"
          value={formState.imageLink}
          required
          onChange={inputChangeHandler}
          variant="outlined"
          id="outlined-basic"
          label="Image Link / URL"
          error={errors.imageLink}
        />
        {isLoading && (
          <p className="status">
            {params.id ? "Updating Book..." : "Adding Book..."}
          </p>
        )}
        {error && <p className="status err">{error}</p>}

        <Button
          color="primary"
          variant="contained"
          // size="large"
          className={classes.btn}
          onClick={params.id ? updateBookHandler : addBookHandler}
        >
          {params.id ? "Update Book" : "Add Book"}
        </Button>
      </form>
    </Paper>
  );
}

export default AddNewBook;
