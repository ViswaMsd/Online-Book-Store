import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import "./Main.css";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "20px 0px",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: "10px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
}));

function Main() {
  console.log("Main...");
  const gridView = useSelector((s) => s.view.gridView);
  const styles = useStyles();
  const open = useSelector((s) => s.modal.open);
  const book = useSelector((s) => s.modal.book);

  const books = useSelector((s) => s.allBooks.books);

  return (
    <Box componenet="div" className={styles.main}>
      {open && <Modal book={book} />}
      {!open &&
        gridView &&
        books.map((book) => <Card book={book} key={book._id} />)}

      {!open && !gridView && (
        <table>
          <tr className="library_header">
            <th className="book_details">Book Title & Authors</th>
            <th>Genre</th>
            <th>Reading Progress</th>
            <th>Last Opened</th>
          </tr>
          {books.map((book) => (
            <tr key={book.imageLink}>
              <td className="book__details">
                <img
                  className="img--list"
                  src={book.imageLink}
                  alt={book.title}
                />
                <div className="author_details">
                  <h4>{book.title}</h4>
                  <p>-{book.authors}</p>
                </div>
              </td>
              <td className="genre">
                <p>{book.genre}</p>
              </td>
              <td className="reading_progress">91%</td>
              <td className="last_read">today</td>
            </tr>
          ))}
        </table>
      )}
    </Box>
  );
}

export default Main;
