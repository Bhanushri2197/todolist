

function TodoList({todoValues }){
   

   return <div>
        <div className="listCart">
            <div className="nameBlock">
                <span>Name : </span>
                <span>{todoValues.name}</span>
            </div>
            <div className="mt-3 mb-3 descriptionBlock">
                <span>Description : </span>
                <span>{todoValues.description}</span>
            </div>
            <div className="statusBlock d-flex">
                <span>Status :</span>
                <div class="dropdown statusDropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Not Completed
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item" type="button">Not Completed</button></li>
                        <li><button class="dropdown-item" type="button">Completed</button></li>
                    </ul>
                </div>
            </div>
            <div className="buttonBlock d-flex align-items-center justify-content-end">
                <button className="btn editBtn">Edit</button>
                <button className="btn delBtn">Delete</button>
            </div>
        </div>

   </div>
}
export default TodoList
