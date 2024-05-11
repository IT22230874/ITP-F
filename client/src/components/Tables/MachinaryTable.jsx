import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { FiRefreshCcw, FiFilter } from "react-icons/fi";
import axios from "axios";

function MachinaryTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState({
    name: "",
    quantity: "",
    stock: "",
    priceperday: "",
  });

  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    name: "",
    stock: "",
  });
  const [itemNameList, setItemNameList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/machinary/machinetable", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filter),
        });

        const itemData = await res.json();
        setItems(itemData);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("/api/machinary/machinenames");
        const data = await res.json();
        setItemNameList(data);
      } catch (error) {
        setError("An error occurred while fetching names");
        console.error("Error fetching names:", error);
      }
    };

    fetchNames();
  }, []);

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.id]: e.target.value,
    });
  };

  const resetFilter = () => {
    setFilter({
      name: "",
      stock: "",
    });
  };

  const handleEdit = (item) => {
    setSelectedMaterial(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/machinary/deletemachine/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedMaterial);
    try {
      console.log(
        `name: ${selectedMaterial.name},
          quantity: ${selectedMaterial.quantity},
          stock: ${selectedMaterial.stock},
          priceperday:${selectedMaterial.priceperday},
            `
      );
      const res = await axios.patch(
        `/api/machinary/updatemachine/${selectedMaterial._id}`,
        {
          name: selectedMaterial.name,
          quantity: selectedMaterial.quantity,
          stock: selectedMaterial.stock,
          priceperday: selectedMaterial.priceperday,
        }
      );

      const data = res.data;

      if (data.data) {
        const updatedItems = items.map((item) =>
          item._id === selectedMaterial._id ? data.data : item
        );
        setItems(updatedItems);
        setShowForm(false);
        return;
      }

      setError(data.message);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const getMachineColor = (stock) => {
    switch (stock) {
      case "available":
        return "rgb(74, 223, 74)";
      case "unavailable":
        return "rgb(223, 173, 74)";
      case "low stock":
        return "rgb(211, 88, 88)";
      case "service":
        return "rgb(229, 212, 101)";
      case "rented":
        return "rgb(233, 140, 19)";
      default:
        return "transparent";
    }
  };

  return (
    <div>
      <div className="filter">
        <span>
          <FiFilter />
        </span>
        <span>Filter By</span>
        <select id="name" value={filter.name} onChange={handleChange}>
          <option value="">Select Item Name</option>
          {itemNameList.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select id="stock" value={filter.stock} onChange={handleChange}>
          <option value="">Stock</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="low stock">Low Stock</option>
          <option value="rented">Rented</option>
          <option value="service">Service</option>{" "}
        </select>
        <button type="button" onClick={resetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>
      {items.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{"000" + item.machineid}</td>
                  <td>{item.name}</td>
                  <td>{`${item.quantity}`}</td>
                  <td>
                    <p
                      style={{ backgroundColor: getMachineColor(item.stock) }}
                      className="stockitem"
                    >
                      {item.stock}
                    </p>
                  </td>
                  <td>{item.priceperday}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(item)}>
                      <MdEdit />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{error || "No items found"}</p>
      )}
      {showForm && (
        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit}>
            <button type="button" className="closebtn" onClick={closeForm}>
              x
            </button>
            {error && <p className="error">{error}</p>}
            {selectedMaterial && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Machine Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={selectedMaterial.name || ""}
                    onChange={(e) =>
                      setSelectedMaterial({
                        ...selectedMaterial,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    required
                    value={selectedMaterial.quantity || ""}
                    onChange={(e) =>
                      setSelectedMaterial({
                        ...selectedMaterial,
                        quantity: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priceperday">Price:</label>
                  <input
                    type="number"
                    id="priceperday"
                    name="priceperday"
                    required
                    value={selectedMaterial.priceperday || ""}
                    onChange={(e) =>
                      setSelectedMaterial({
                        ...selectedMaterial,
                        priceperday: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock :</label>
                  <select
                    id="stock"
                    name="stock"
                    required
                    value={selectedMaterial.stock || ""}
                    onChange={(e) =>
                      setSelectedMaterial({
                        ...selectedMaterial,
                        stock: e.target.value,
                      })
                    }
                  >
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="low stock">Low Stock</option>
                    <option value="service">Service</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>

                <button className="button" type="submit">
                  Update Machine
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default MachinaryTable;
