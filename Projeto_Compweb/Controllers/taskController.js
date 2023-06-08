import express from 'express'
const router = express.Router()
import Task from '../models/taskModel.js'
import mongoose from 'mongoose'
import User from '../models/userModel.js'

/*

    GET -> Obter
    POST -> Criar
    UPDATE -> Atualizar
    PUT -> Atualizar (substituir)
    DELETE -> Apagar

*/


/* Obter todos os users */

router.get('/getTasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).send(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

/* Obter user por id */
/* /api/user/6462ffa45749c6ad1d59c73a devolve os dados do user com id (6462ffa45749c6ad1d59c73a) */




router.post('/post', async (req, res) => {
    console.log(req.cookies)
    const userData = JSON.parse(req.cookies.userData)
    console.log(userData._id)
    
    if(!req.body.tasks)
        return res.status(400).json({ message: 'Missing task'})

    if(!userData._id)
        return res.status(400).json({ message: 'Missing taskowner'})


    try {
        const work = { tasks: req.body.tasks, taskowner: userData._id}
        const task = await Task.create(work)
        return res.redirect('http://localhost:3000/main.html')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    } 
})

//by id

router.get('/getTasksByIdGym', async (req, res) => {
    try {
        
        const tasks = await Task.find({taskowner: "64721cf29d34762cfa707e37"});
    
        res.status(200).json(tasks);
        
    }catch (error) {
            res.status(500).json({message: error.message})
    }
});

router.get('/getTasksByIdHome', async (req, res) => {
    try {
        const userData = JSON.parse(req.cookies.userData)

        const user = await User.findById(userData._id); // Find the user by _id
  
        if (userData.isAdmin){
            const tasks = await Task.find({ taskowner: user._id }); // Find tasks with matching taskowner
            
            res.status(200).json(tasks);   
        }else{
            const tasks = await Task.find({ taskowner: "64721c8f9d34762cfa707e2e"});
        
            res.status(200).json(tasks);
        }
    }catch (error) {
            res.status(500).json({message: error.message})
    }
});

router.get('/getTasksByIdSchool', async (req, res) => {
    try {
        
        const tasks = await Task.find({taskowner: "64721cac9d34762cfa707e31"});
    
        res.status(200).json(tasks);
        
    }catch (error) {
            res.status(500).json({message: error.message})
    }
});



/* router.get('/getTasks1', async (req, res) => {
    try {
        
        const user = "64721c8f9d34762cfa707e2e"; // Find the user by _id
  
        if (user) {
            const tasks = await Task.find({ taskowner: "64721c8f9d34762cfa707e2e" }); // Find tasks with matching taskowner
            
            res.status(200).json(tasks);    
        };
        
    
    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) */




router.delete('/deleteById/:taskId', async (req, res) => {
    try {
      const userData = JSON.parse(req.cookies.userData);
  
      const user = await User.findById(userData._id); // Find the user by _id
  
      if (user) {
        const taskId = req.params.taskId;
        console.log(taskId)
        const deletedTask = await Task.findOneAndDelete({

          _id: taskId,
          taskowner: user._id
        }); // Find and delete the task with matching _id and taskowner
  
        if (deletedTask) {
            return res.status(200).end()

            
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
  });


export default router
