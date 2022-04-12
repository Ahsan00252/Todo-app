import React from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

const Listcomponent = ({ items, onDelete, onComplete }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, title, completed } = item;
        return (
          <div className="list-content" key={id}>
            <p className={`title ${completed ? "complete" : ""}`}>{title}</p>
            <div className="btn-container">
              <button
                onClick={() => onComplete(id)}
                type="button"
                className="check"
              >
                <FaCheck />
              </button>
              <button type="button" className="del-btn">
                <FaTrash onClick={() => onDelete(id)} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Listcomponent;
