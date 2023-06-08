import express from 'express'
const router = express.Router()
import Task from '../models/taskModel.js'
import mongoose from 'mongoose'
import User from '../models/userModel.js'
import Nota from '../models/notasModel.js'

/*

    GET -> Obter
    POST -> Criar
    UPDATE -> Atualizar
    PUT -> Atualizar (substituir)
    DELETE -> Apagar

*/


/* Obter todos os users */

router.get('/getNotas', async (req, res) => {
    try {
        const Notas = await Nota.find({})
        res.status(200).send(Notas)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

/* Obter user por id */
/* /api/user/6462ffa45749c6ad1d59c73a devolve os dados do user com id (6462ffa45749c6ad1d59c73a) */




router.post('/postNota', async (req, res) => {
    console.log(req.cookies)
    const userData = JSON.parse(req.cookies.userData)
    console.log(userData._id)
    
    if(!req.body.nota)
        return res.status(400).json({ message: 'Missing nota'})

    if(!userData._id)
        return res.status(400).json({ message: 'Missing notaowner'})


    try {
        const notes = { nota: req.body.nota, notaowner: userData._id}
        const nota = await Nota.create(notes)
        return res.redirect('http://localhost:3000/main.html')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    } 
})

//by id



router.get('/getNotasById', async (req, res) => {
    try {
        const userData = JSON.parse(req.cookies.userData)

        const user = await User.findById(userData._id); // Find the user by _id
  
        console.log("Got user ?")
        console.log(user)

        const notas = await Nota.find({ notaowner: user._id }); // Find tasks with matching taskowner
        
        res.status(200).json(notas);   
        
    }catch (error) {
            res.status(500).json({message: error.message})
    }
});




router.delete('/deleteById/:notaId', async (req, res) => {
    try {
      const userData = JSON.parse(req.cookies.userData);
  
      const user = await User.findById(userData._id); // Find the user by _id

      if (user) {
        const notaId = req.params.notaId;
        console.log(notaId)
        const deletedNota = await Nota.findOneAndDelete({

          _id: notaId,
          notaowner: user._id
        }); // Find and delete the task with matching _id and taskowner
  
        if (deletedNota) {
            return res.status(200).end()

            
        } else {
          res.status(404).json({ message: 'Nota not found' });
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
