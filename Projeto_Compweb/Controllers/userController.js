import express from 'express'
const router = express.Router()
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

/*

    GET -> Obter
    POST -> Criar
    UPDATE -> Atualizar
    PUT -> Atualizar (substituir)
    DELETE -> Apagar

*/


/* Obter todos os users */

router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

/* Obter user por id */
/* /api/user/6462ffa45749c6ad1d59c73a devolve os dados do user com id (6462ffa45749c6ad1d59c73a) */


router.get('/getUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const users = await User.findById(userId)
        res.status(200).send(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




/* Criar um user */ 

router.post('/Register', async (req, res) => {
    console.log(req.body)
    if(!req.body.username)
        return res.status(400).json({ message: 'Missing username'})

    if(!req.body.password)
        return res.status(400).json({ message: 'Missing password'})


    try {
        const userData = { username: req.body.username , hashPassword: await bcrypt.hash(req.body.password, 10)}
        const user = await User.create(userData)
        res.cookie('userData', JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24}); // 24 horas de expirar)
        return res.redirect('http://localhost:3000/main.html')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    } 
})


/* Verificar se dados login estão corretos e enviar dados */
router.get('/login', async (req, res) => {



    if(!req.query.username)
        return res.status(400).json({ message: 'Missing username'})

    if(!req.query.password)
        return res.status(400).json({ message: 'Missing password'})

        
    const { username, password } = req.query;


    try {
      // Find the user by username in the database
      const user = await User.findOne({ username });
      console.log(user)
  
      if (!user) {
        // User not found
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the entered password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.hashPassword);
  
      if (passwordMatch) {
        // Passwords match, authentication successful
        // Return user information
        res.cookie('userData', JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24}); // 24 horas de expirar)
        return res.redirect('http://localhost:3000/main.html')

      } else {
        // Passwords do not match, authentication failed
        return res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default router