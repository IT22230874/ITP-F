const AttendenceModel = require("../../modules/Employee/attendence.model");
const EmployeeModel = require("../../modules/Employee/employee.model");
const GroupModel = require("../../modules/Employee/projectgroups.model");
const qrcode = require("qrcode");

// const displayGroups = async (req, res, next) => {
//     try {
//       const allGroups = await GroupModel.find();
//       return res.json({ data: allGroups });
//     } catch (error) {
//       console.error("Error displaying employees:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };

const addEmployee = async (req, res, next) => {
  try {
    const {
      fname,
      lname,
      age,
      tel,
      email,
      position,
      nic,
      dob,
      address,
      joindate,
      salary,
    } = req.body;

    const gid = "null";

    const newEmployee = new EmployeeModel({
      fname,
      lname,
      age,
      tel,
      email,
      position,
      nic,
      dob,
      address,
      joindate,
      gid,
      salary,
    });

    await newEmployee.save();

    return res.json({
      message: "Employee added successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tel, email, position, address, salary } = req.body;

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        $set: {
          tel,
          email,
          position,
          address,
          salary,
        },
      },
      { new: true }
    );

    return res.json({
      message: "Update successful",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error editing employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);

    return res.json({
      message: "Deletion successful",
      data: deletedEmployee,
    });
  } catch (error) {
    console.error("Error removing employee:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const displayEmployees = async (req, res, next) => {
  try {
    const allEmployees = await EmployeeModel.find();
    return res.json({ data: allEmployees });
  } catch (error) {
    console.error("Error displaying employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const displayGroups = async (req, res, next) => {
  try {
    const allGroups = await GroupModel.find();
    return res.json({ data: allGroups });
  } catch (error) {
    console.error("Error displaying employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createGroup = async (req, res, next) => {
  try {
    const { name } = req.body;

    let latestGid = 1;
    const latestGroup = await GroupModel.findOne().sort({ gid: -1 });

    if (latestGroup) {
      latestGid = latestGroup.gid + 1;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Extract yyyy-mm-dd

    const availability = false;

    const newGroup = new GroupModel({
      name,
      date: formattedDate,
      availability,
      gid: latestGid,
    });

    await newGroup.save();

    return res.json({ message: "Group created successfully", data: newGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedGroup = await GroupModel.findByIdAndDelete(id);

    return res.json({ message: "Deletion successful", data: deletedGroup });
  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addMemberToGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gid } = req.body;

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      { $set: { gid } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error adding member to group:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeMemberFromGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const _id = id;
    console.log(_id);
    const gid = "null";
    const removedGroupEmployee = await EmployeeModel.findByIdAndUpdate(
      _id,
      { $set: { gid } }, // Change "null" to null
      { new: true }
    );

    return res.json({
      message: "upgrouping successfull",
      data: removedGroupEmployee,
    });
  } catch (error) {
    console.error("Error removing member from group:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const attendanceQr = async (req, res, next) => {
  try {
    const { id } = req.body;
    const qrData = JSON.stringify(id);

    const qrCode = await qrcode.toDataURL(qrData);

    res.json({ qrCode, filename: `${id}_qr.png` });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const { _id } = req.body; // Corrected to access _id directly
    const empid = _id; // Use _id for employee ID

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Extract yyyy-mm-dd

    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    const currentData = await AttendenceModel.findOne({
      empid,
      date: formattedDate,
    });

    if (!currentData || !currentData.arrival) {
      // If no attendance data found for the current date, set arrival time
      const newScannedData = new AttendenceModel({
        empid,
        date: formattedDate,
        arrival: currentTime,
        attendencetype: "null",
      });
      await newScannedData.save();
      res.json({ message: "Arrival time recorded successfully" });
    } else {
      // If arrival time already exists, set departure time and calculate attendance type
      const arrivalTime = currentData.arrival;
      const departureTime = currentTime;
      const arrivalHour = parseInt(arrivalTime.split(":")[0]);
      const arrivalMinute = parseInt(arrivalTime.split(":")[1]);
      const departureHour = parseInt(departureTime.split(":")[0]);
      const departureMinute = parseInt(departureTime.split(":")[1]);

      const arrivalDateTime = new Date(0, 0, 0, arrivalHour, arrivalMinute);
      const departureDateTime = new Date(
        0,
        0,
        0,
        departureHour,
        departureMinute
      );

      const millisecondsDifference =
        departureDateTime.getTime() - arrivalDateTime.getTime();
      const hoursDifference = millisecondsDifference / (1000 * 60 * 60);

      let attendanceType;
      if (hoursDifference > 7) {
        attendanceType = "full day";
      } else if (hoursDifference > 3) {
        attendanceType = "half day";
      } else {
        attendanceType = "leave";
      }

      currentData.departure = currentTime;
      currentData.attendencetype = attendanceType;
      await currentData.save();
      res.json({
        message: "Departure time recorded successfully",
        attendanceType,
      });
    }
  } catch (error) {
    console.error("Error saving attendance data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const attendanceAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fullDay = await AttendenceModel.countDocuments({
      empid: id,
      attendencetype: "full day",
    });
    const halfDay = await AttendenceModel.countDocuments({
      empid: id,
      attendencetype: "half day",
    });
    const leaves = await AttendenceModel.countDocuments({
      empid: id,
      attendencetype: "leave",
    });

    const data = { fullDay, halfDay, leaves };

    return res.json({ data });
  } catch (error) {
    console.error("Error fetching attendance analysis:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAttendanceSummary = async () => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0);

    const attendanceData = await AttendenceModel.find({
      date: {
        $gte: startDate.toISOString().split("T")[0],
        $lte: endDate.toISOString().split("T")[0],
      },
    });

    let totalWorkingDays = endDate.getDate(); // Total number of days in the current month

    let fullDays = 0;
    let halfDays = 0;
    let leaves = 0;

    attendanceData.forEach((data) => {
      if (data.attendancetype === "full day") {
        fullDays++;
      } else if (data.attendancetype === "half day") {
        halfDays++;
      } else if (data.attendancetype === "leave") {
        leaves++;
      }
    });

    // Calculate percentages
    const fullDayPercentage = (fullDays / totalWorkingDays) * 100;
    const halfDayPercentage = (halfDays / totalWorkingDays) * 100;
    const leavePercentage = (leaves / totalWorkingDays) * 100;

    const numberOfEmployees = await EmployeeModel.countDocuments();

    return {
      fullDayPercentage,
      halfDayPercentage,
      leavePercentage,
      numberOfEmployees,
    };
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    throw error;
  }
};

const displayAttendence = async (req, res, next) => {
  const ob = await AttendenceModel.find();
  return res.json({ data: ob });
};

module.exports = {
  addEmployee,
  editEmployee,
  removeEmployee,
  displayEmployees,
  displayGroups,
  createGroup,
  deleteGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  attendanceQr,
  getAttendance,
  attendanceAnalysis,
  getAttendanceSummary,
  displayAttendence,
};
