import { useDispatch } from "react-redux";
import { modalActions } from "../redux-store/store";
import "./Card.css";

function Card(props) {
  const dispatch = useDispatch();

  const modalOpenHandler = () => {
    console.log("modalHandler...");
    dispatch(modalActions.openModal(props.book));
  };

  return (
    <>
      <div className="card" onClick={modalOpenHandler}>
        <img
          className="img"
          src={props.book.imageLink}
          alt={props.book.title}
        />
      </div>
    </>
  );
}

export default Card;
