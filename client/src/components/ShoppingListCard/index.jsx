import { Link } from 'react-router-dom';

function ShoppingListCard({ _id: id, name, items }) {
  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-header">
          <h3>{name}</h3>
          <Link to={`edit/${id}`}>Edit</Link>
        </div>
      </div>
      <hr className="divider" />

      <div className="card-content">
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingListCard;
