
import { useFormik } from "formik"
import axios from 'axios'


function AddTodoForm(){
    const toToForm = useFormik({
       initialValues :{
              name : "",
              description : "",
       },
       validate : (value) => {
              let error = {};
              if(value.name == ""){
                     error.name = "Please Enter Todo Name "
              }
              if(value.description == ""){
                     error.description = "Please Enter Description"
              }
              return error
       },
       onSubmit : async (values) => {
              try {
                  await axios.post('https://66ba6aaafa763ff550fbbd5d.mockapi.io/todolist',values)
                  
              } catch (error) {
                  alert("Something Went Wrong")
              }
          }
    })


   let updateCard = () => {
    updateName( nameInput.current.value)
    updateDescription(descriptionInput.current.value)

   }

    return  <div className="d-flex align-items-center justify-content-center">
       <form onSubmit={toToForm.handleSubmit}>
              <input className={`form-control inputText ${toToForm.errors.name && 'is-invalid'}`}
                type="text"
                value={toToForm.values.name} 
                onChange={toToForm.handleChange}
                placeholder="Enter Todo name" name="name" id="todoName" />           
              <input className={`form-control inputText ${toToForm.errors.description && 'is-invalid'}`}
                type="text"
                value={toToForm.values.description} 
                onChange={toToForm.handleChange}
                placeholder="Enter Description" name="description" id="description" />   

                <button className="btn btnPrimary" type="submit">Add Todo</button>
       </form>
               
    </div>
}

export default AddTodoForm