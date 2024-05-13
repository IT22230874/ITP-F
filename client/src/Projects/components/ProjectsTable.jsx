import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiFilter, FiRefreshCcw, FiEye, FiTrash2 } from "react-icons/fi";
import Popup from "./Popup"; // Assuming you have a Popup component for displaying project details
import { FaSitemap } from "react-icons/fa";

function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    status: "",
  });
  const [savedResources, setSavedResources] = useState([]);
  const [showInventoryPopup, setShowInventoryPopup] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    fetchData();
    loadSavedResources(); // Load saved resources from localStorage
    saveInitialResources(); // Save initial resources to localStorage
    fetchInventoryAndMachines(); // Fetch inventories and machines from localStorage
  }, []);

  const fetchData = () => {
    axios
      .get("/api/project/projects")
      .then((response) => {
        setProjects(response.data.data);
        setFilteredProjects(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  const handleView = (id) => {
    setPopupData(id);
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/project/deleteproject/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
      setFilteredProjects(
        filteredProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const nameMatch = project.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const locationMatch = project.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const statusMatch = project.status
        .toLowerCase()
        .includes(filters.status.toLowerCase());
      return nameMatch && locationMatch && statusMatch;
    });
    setFilteredProjects(filtered);
  }, [projects, filters]);

  const handleResetFilter = () => {
    setFilters({
      name: "",
      location: "",
      status: "",
    });
  };

  const handleAllocateResources = (id) => {
    console.log("Allocate resources for project:", id);
    // Save resources to localStorage
    const savedResource = {
      projectId: id,
      resources: [], // Modify this array to include saved resources
    };
    setSavedResources([...savedResources, savedResource]);
    localStorage.setItem("savedResources", JSON.stringify(savedResources));
  };

  // Function to load saved resources from localStorage
  const loadSavedResources = () => {
    const saved = localStorage.getItem("savedResources");
    if (saved) {
      setSavedResources(JSON.parse(saved));
    }
  };

  // Function to save initial resources to localStorage
  const saveInitialResources = () => {
    const initialResources = generateInitialResources();
    localStorage.setItem("initialResources", JSON.stringify(initialResources));
  };

  // Function to generate initial resources
  const generateInitialResources = () => {
    // Generate 10 inventories and 10 machines
    const inventories = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Inventory ${i + 1}`,
    }));
    const machines = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Machine ${i + 1}`,
    }));
    return { inventories, machines };
  };

  // Function to fetch inventories and machines from localStorage
  const fetchInventoryAndMachines = () => {
    const savedInventories = localStorage.getItem("inventories");
    const savedMachines = localStorage.getItem("machines");
    if (savedInventories && savedMachines) {
      setInventories(JSON.parse(savedInventories));
      setMachines(JSON.parse(savedMachines));
    }
  };

  // Function to handle showing inventory popup
  const handleShowInventoryPopup = () => {
    setShowInventoryPopup(true);
  };

  // Function to handle closing inventory popup
  const handleCloseInventoryPopup = () => {
    setShowInventoryPopup(false);
  };

  return (
    <div style={{ marginTop: "-35px" }}>
      <h2>Projects</h2>
      <div className="filter">
        <span>
          <FiFilter />
        </span>
        <span>Filter By</span>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
          style={{ height: "50px", borderRadius: 0, width: "220px" }}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          style={{ height: "50px", borderRadius: 0, width: "220px" }}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={filters.status}
          onChange={handleFilterChange}
          style={{ height: "50px", borderRadius: 0, width: "220px" }}
        />
        <button onClick={handleResetFilter} style={{ height: "50px" }}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderSpacing: 0,
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Location
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Budget
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Start Date
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              End Date
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Status
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project._id} style={{ backgroundColor: "#fff" }}>
              <td style={{ padding: "12px", textAlign: "left" }}>
                {project.name}
              </td>
              <td style={{ padding: "12px", textAlign: "left" }}>
                {project.location}
              </td>
              <td style={{ padding: "12px", textAlign: "left" }}>
                {project.budget}
              </td>
              <td style={{ padding: "12px", textAlign: "left" }}>
                {project.startdate}
              </td>
              <td style={{ padding: "12px", textAlign: "left" }}>
                {project.enddate}
              </td>
              <td style={{ padding: "12px", textAlign: "left" }}>
                {project.status}
              </td>
              <td
                className="actions"
                style={{ padding: "12px", textAlign: "left" }}
              >
                <button
                  style={{
                    backgroundColor: "#6C5CE7",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "8px",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleView(project)}
                >
                  <FiEye size={20} color="#FFFFFF" />
                </button>
                <button
                  style={{
                    backgroundColor: "#FD7272",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "8px",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleDelete(project._id)}
                >
                  <FiTrash2 size={20} color="#FFFFFF" />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupData && <Popup data={popupData} onClose={() => setPopupData(null)} />}

      {showInventoryPopup && (
        <div className="inventory-popup">
          <h3>Inventories</h3>
          <ul>
            {inventories.map((inventory) => (
              <li key={inventory.id}>{inventory.name}</li>
            ))}
          </ul>
          <h3>Machines</h3>
          <ul>
            {machines.map((machine) => (
              <li key={machine.id}>{machine.name}</li>
            ))}
          </ul>
          <button onClick={handleCloseInventoryPopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default ProjectsTable;
