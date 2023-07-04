# Backend API Interface

## Get all of the todos

Gets all of the todos

```
GET /todos/list
```

Parameters: None

Response:
List of Todos

```
Todo = {
    id: string,
    created_at: Date,
    title: string,
    due_date: Date,
    description: string,
    is_complete: boolean
}
```

##Create a TODO

```
POST/todos/create

Parameter: {
    title: String,
    date: Date,
    description: String,
}
```

Response:
Status of success or error

```

```

NEED TO DO

- [x] View all of the todos
- [x] Create a todo
- [x] Make it look nice
- [x] Allow you to check off a todo
- [x] Make todos that are check off be at the bottom
- [ ] Delete a todo
  - [ ] Mark it as archived and do not show the archived ones
  - [ ] edit button
  - [ ] delete archived + new page only archived ones button restore
# todo_list
