import React from "react";
import { useState, useEffect } from "react";
import Listcomponent from "./components/listComponent";
import Alert from "./components/alert";

const getLocalStorage = () => {
  let lists = localStorage.getItem("lists");
  if (lists) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const App = (props) => {
  const [name, setName] = useState("");
  const [lists, setLists] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    if (name) {
      showAlert(true, "success", "item added");
      const newlist = {
        id: new Date().getTime().toString(),
        title: name,
        completed: false,
      };
      setLists([...lists, newlist]);
      setName("");
    } else {
      showAlert(true, "danger", "please add an item");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "list cleared");
    setLists([]);
  };

  const handleDelete = (id) => {
    setLists(lists.filter((listitem) => listitem.id !== id));
    showAlert(true, "danger", "item removed");
  };
  const handleComplete = (id) => {
    setLists(
      lists.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);
  return (
    <section className="container">
      <form className="form-container">
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>My Todo,s</h3>
        <div className="todo-form">
          <input
            className="todo-input"
            type="text"
            placeholder="add an item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleAdd} className="submit-btn">
            Add
          </button>
        </div>
      </form>
      {lists.length > 0 && (
        <div className="todo-items">
          <Listcomponent
            items={lists}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
          <button onClick={clearList} className="clear-btn">
            clear items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
