
const Task = require('../models/task');


const guestUserHome = async (req, res) =>{
   try {
      req.body
   } catch (error) {
      res.status(500).json({ msg: error });
   }
}


const getAllTasks = async (req, res) => {
   try {
      const tasks = await Task.find({});
      // res.status(200).json({
      //    success: true,
      //    data:{tasks, nbHits:tasks.length}
      // });
      res.status(200).json({ tasks })
   } catch (error) {
      res.status(500).json({ msg: error });
   }
};


const createTask = async (req, res, next) => {
   try {
      const task = new Task(req.body);
      const result = await task.save();
      res.status(201).json({ result });
   } catch (error) {
      res.status(500).json({ msg: error });
      // next(error)
   }
}

const getTask = async (req, res, next) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOne({ _id: taskID });
      if (!task) {
         const error = new Error('Not Found')
         error.status = 404;
         return next(error)
         return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }
      res.status(200).json({ task });
   } catch (error) {
      // next(error)
      res.status(500).json({ msg: error });
   }
};

const deleteTask = async (req, res) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOneAndDelete({ _id: taskID });
      if (!task) {
         return res.status(404).json({ msg: `No task with Id: ${taskID}` });
      }

      res.status(200).json({ msg: `Deleted Task Successfully with Id :${taskID}` });
   } catch (error) {
      res.status(500).json({ msg: error });
   }
};


const updateTask = async (req, res) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOneAndUpdate({ _id: taskID }, { $set: req.body }, {
         new: true,
         runValidators: true, // issue on runValidators. this is not working, we need a manual validation.
      })
      if (!task) {
         return res.status(404).json({ msg: `No task with Id: ${taskID}` });
      }

      res.status(200).json({ task });
   } catch (error) {

   }
};


module.exports = {
   getAllTasks, createTask, getTask, updateTask, deleteTask
}