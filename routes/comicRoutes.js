const express = require('express');
const { createComic, getComics, getComicById, updateComic, deleteComic } = require('../controllers/comicController');
const router = express.Router();

router.post('/', createComic); //post any comic using POST req in http://localhost:5000/api/
router.get('/', getComics);  //it will return all comics
router.get('/:id', getComicById);//get any comic using thier mongodb id
router.put('/:id', updateComic); //put req to update any comic field
router.delete('/:id', deleteComic);//put req to delete any comic

module.exports = router;
