import { useState } from "react";

function useForm(initialFormState) {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    validate({ [name]: value });
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validate = (test) => {
    let errObj = { ...errors };
    if ("title" in test)
      errObj.title = test.title.trim() ? "" : "This field is Required 🛑";
    if ("authors" in test)
      errObj.authors = test.authors.trim() ? "" : "This field is Required 🛑";
    if ("description" in test)
      errObj.description = test.description.trim()
        ? ""
        : "This field is Required 🛑";
    if ("genre" in test)
      errObj.genre = test.genre.trim() ? "" : "This field is Required 🛑";
    if ("imageLink" in test)
      errObj.imageLink = test.imageLink.trim()
        ? ""
        : "This field is Required 🛑";

    setErrors(errObj);
    return Object.values(errObj).every((v) => v === "");
  };
  return {
    formState,
    setFormState,
    inputChangeHandler,
    errors,
    setErrors,
    validate,
  };
}

export default useForm;
