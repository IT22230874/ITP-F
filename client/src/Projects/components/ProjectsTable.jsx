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
    status: ""
  });

  useEffect(() => {
    fetchData();
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

  const handleView =  (id) => {
   
      setPopupData(id);
      fetchData();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/project/deleteproject/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
      setFilteredProjects(filteredProjects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };


  useEffect(() => {
    const filtered = projects.filter(project => {
      const nameMatch = project.name.toLowerCase().includes(filters.name.toLowerCase());
      const locationMatch = project.location.toLowerCase().includes(filters.location.toLowerCase());
      const statusMatch = project.status.toLowerCase().includes(filters.status.toLowerCase());
      return nameMatch && locationMatch && statusMatch;
    });
    setFilteredProjects(filtered);
  }, [projects, filters]);

  const handleResetFilter = () => {
    setFilters({
      name: "",
      location: "",
      status: ""
    });
  };

  const handleAllocateResources = (id) => {
    console.log("Allocate resources for project:", id);
  }

  return (
    <div>
      <div className="filter">
        <span><FiFilter /></span>
        <span>Filter By</span>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={filters.status}
          onChange={handleFilterChange}
        />
        <button onClick={handleResetFilter}>
          <FiRefreshCcw />
          Reset Filter
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Budget</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.location}</td>
              <td>{project.budget}</td>
              <td>{project.startdate}</td>
              <td>{project.enddate}</td>
              <td>{project.status}</td>
              <td>
                <button onClick={() => handleView(project)}>
                  <FiEye />
                </button>
                <button onClick={() => handleDelete(project._id)}>
                  <FiTrash2 />
                </button>
                <button onClick={() => handleAllocateResources(project._id)}>
                  <FaSitemap />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupData && (
        <Popup
          data={popupData}
          onClose={() => setPopupData(null)}
        />
      )}
    </div>
  );
}

export default ProjectsTable;
