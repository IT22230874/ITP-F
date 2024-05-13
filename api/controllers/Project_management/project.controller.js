const ProjectModel = require("../../modules/Project_Management/project.model.js");
const ResourceModel = require("../../modules/Project_Management/resource.model.js");
const PhaseModel = require("../../modules/Project_Management/phase.model.js");
const TeamModel = require("../../modules/Project_Management/teams.model.js");
const ProjectMachineModel = require("../../modules/Project_Management/machine.model.js");
const errorHandler = require("../../utils/error.js");

const analysis = async (req, res) => {
  try {
    const totalProjects = await ProjectModel.countDocuments();
    const newProjects = await ProjectModel.countDocuments({ status: 'new' });
    const finishedProjects = await ProjectModel.countDocuments({ status: 'finished' });
    const ongoingProjects = await ProjectModel.countDocuments({ status: 'ongoing' });

    res.json({
      totalProjects,
      newProjects,
      finishedProjects,
      ongoingProjects
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const addProject = async (req, res, next) => {
  try {
    const { name, location, budget, startdate, enddate, isTender, clientname, description, email } = req.body;

    // Check if any required field is missing
    if (!name || !budget || !location || !startdate || !enddate || !isTender || !clientname || !description || email) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find the latest pid and increment it
    const latestProject = await ProjectModel.findOne().sort({ pid: -1 }).select("pid").lean();
    const pid = latestProject ? latestProject.pid + 1 : 1;

    const newProject = new ProjectModel({
      pid,
      name,
      location,
      budget,
      startdate,
      enddate,
      isTender,
      clientname,
      description,
      email,
    });

    await newProject.save();

    res.status(201).json({ success: true, message: "Project added successfully", data: newProject });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProjectModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};  


const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, location, budget, startdate, enddate, isTender, clientname, description, status } = req.body;

    // Check if any required field is missing
    if (!name || !budget || !location || !startdate || !enddate || !isTender || !clientname || !description || !status) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      {$set :{ name, location, budget, startdate, enddate, isTender, clientname, description, status }},
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, message: "Project updated successfully", data: updatedProject });
  } catch (error) {
    next(error);
  }
};


const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findById(id);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

const getProjectByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const projects = await ProjectModel.find({ status });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const getProjectByClient = async (req, res, next) => {
  try {
    const { clientname } = req.params;
    const projects = await ProjectModel.find({ clientname });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const getProjectByTender = async (req, res, next) => {
  try {
    const { isTender } = req.params;
    const projects = await ProjectModel.find({ isTender });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const addResources = async (req, res, next) => {
  try {
    const { pid, name, quantity, resourceid } = req.body;
    const usedquantity = 0;
    const newResource = new ResourceModel({ pid, name, quantity, resourceid, usedquantity });
    await newResource.save();
    res.status(201).json({ success: true, message: "Resource added successfully", data: newResource });
  } catch (error) {
    next(error);
  }
};

const updateResources = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, usedquantity } = req.body;
    const updatedResource = await ResourceModel.findByIdAndUpdate(
      id,
      {$set :{ name, usedquantity }},
      { new: true }
    );
    res.status(200).json({ success: true, message: "Resource updated successfully", data: updatedResource });
  } catch (error) {
    next(error);
  }
};

const increaseResourceQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { quantity } = req.body;

    const currentquantity = await ResourceModel.findOne({ _id: id });
    quantity += currentquantity.quantity;

    const updatedResource = await ResourceModel.findByIdAndUpdate(
      id,
      {$set : { quantity }},
      { new: true }
    );
    res.status(200).json({ success: true, message: "Resource quantity increased successfully", data: updatedResource });
  } catch (error) {
    next(error);
  }
};

const deleteResources = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ResourceModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Resource removed successfully" });
  } catch (error) {
    next(error);
  }
};


const addMachines = async (req, res, next) => {
  try {
    const { pid, machinename, quantity, machineid } = req.body;
    const releasequantity = 0;
    const newMachine = new ProjectMachineModel({ pid, machinename, quantity, machineid, releasequantity });
    await newMachine.save();
    res.status(201).json({ success: true, message: "Machine added successfully", data: newMachine });
  } catch (error) {
    next(error);
  }
};

const updatedMachines = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { machinename, releasequantity } = req.body;
    const updatedMachine = await ProjectMachineModel.findByIdAndUpdate(
      id,
      { machinename, releasequantity },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Machine updated successfully", data: updatedMachine });
  } catch (error) {
    next(error);
  }
};

const getMachineById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const machine = await ProjectMachineModel.findById(id);
    res.status(200).json({ success: true, data: machine });
  } catch (error) {
    next(error);
  }
};

const getMachinesByProject = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const machines = await ProjectMachineModel.find({ pid });
    res.status(200).json({ success: true, data: machines });
  } catch (error) {
    next(error);
  }
};

const increaseMachineQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { quantity } = req.body;

    const currentquantity = await ProjectMachineModel.findOne({ id });
    quantity += currentquantity.quantity;

    const updatedMachine = await ProjectMachineModel.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Machine quantity increased successfully", data: updatedMachine });
  } catch (error) {
    next(error);
  }
};

const deleteMachines = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProjectMachineModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Machine removed successfully" });
  } catch (error) {
    next(error);
  }
};

const addTeam = async (req, res, next) => {
  try {
    const { teamid, pid, teamname } = req.body;
    const newTeam = new TeamModel({ teamid, pid, teamname });
    await newTeam.save();
    res.status(201).json({ success: true, message: "Team added successfully", data: newTeam });
  } catch (error) {
    next(error);
  }
}

const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TeamModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Team removed successfully" });
  } catch (error) {
    next(error);
  }
};


const addPhase = async (req, res, next) => {
  try {
    const { pid, deadlineperphase , numberofphases } = req.body;
    const newPhase = new PhaseModel({ pid, deadlineperphase , numberofphases });
    await newPhase.save();
    res.status(201).json({ success: true, message: "Phase added successfully", data: newPhase });
  } catch (error) {
    next(error);
  }
}

const deletePhase = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PhaseModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Phase removed successfully" });
  } catch (error) {
    next(error);
  }
};

const updatePhase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { phaseid, newdeadline, phasename } = req.body;

    const findobj = await PhaseModel.findOne({ id });
    const val = findobj.deadlineperphase;
    val.map((item) => {
      if (val.phaseid === phaseid) {
        val.phasename = newdeadline
      }
    })

    const updatedPhase = await ProjectMachineModel.findByIdAndUpdate(
      id,
      { deadlineperphase, val },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Phase updated successfully", data: updatedPhase });
  } catch (error) {
    next(error);
  }
};

const getPhaseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const phase = await PhaseModel.findById(id);
    res.status(200).json({ success: true, data: phase });
  } catch (error) {
    next(error);
  }
};

const getPhasesByProject = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const phases = await PhaseModel.find({ pid });
    res.status(200).json({ success: true, data: phases });
  } catch (error) {
    next(error);
  }
};

const updatePhaseQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { quantity } = req.body;

    const currentquantity = await PhaseModel.findOne({ id });
    quantity += currentquantity.quantity;


    const updatedPhase = await PhaseModel.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Phase quantity updated successfully", data: updatedPhase });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProject,
  getAllProjects,
  deleteProject,
  updateProject,
  getProjectById,
  getProjectByStatus,
  getProjectByClient,
  getProjectByTender,
  addResources,
  updateResources,
  increaseResourceQuantity,
  deleteResources,
  addMachines,
  updatedMachines,
  getMachineById,
  getMachinesByProject,
  increaseMachineQuantity,
  deleteMachines,
  addTeam,
  deleteTeam,
  addPhase,
  deletePhase,
  updatePhase,
  getPhaseById,
  getPhasesByProject,
  updatePhaseQuantity,
  analysis
};
