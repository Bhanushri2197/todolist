import { useFormik } from 'formik';
import axios from 'axios';

function AddTodoForm({ onAddTodo }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      status: 'Not Completed'
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Please Enter Todo Name';
      }
      if (!values.description) {
        errors.description = 'Please Enter Description';
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('https://66ba6aaafa763ff550fbbd5d.mockapi.io/todolist', values);
        await onAddTodo(); // Call the callback to update the todo list
        resetForm(); // Clear form fields after submission
      } catch (error) {
        alert('Something Went Wrong');
      }
    },
  });

  return (
    <div>
      <form className="d-flex align-items-center justify-content-center" onSubmit={formik.handleSubmit}>
        <input
          className={`form-control inputText ${formik.errors.name && 'is-invalid'}`}
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter Todo name"
          name="name"
          id="todoName"
        />
        <input
          className={`form-control inputText ${formik.errors.description && 'is-invalid'}`}
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Enter Description"
          name="description"
          id="description"
        />
        <button className="btn btnPrimary" type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
