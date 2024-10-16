const ComicBook = require('../models/comicBook.js');

// Create Comic Book
const createComic = async (req, res) => {
  try {
    const { bookName, authorName, yearOfPublication,
        price, discount, numberOfPages, condition, description
    } = req.body // destructering
    const comic = new ComicBook({
        bookName,
        authorName,
        yearOfPublication,
        price,
        discount,
        numberOfPages,
        condition,
        description
    });
    const savedComic = await comic.save(); // data has been created and saved in mongodb
    res.status(201).json(savedComic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting All the Comics with Pagination, Sorting, and Filtering
const getComics = async (req, res) => {
  try {
    const { page = 1, limit = 10, comicName, author, 
        year, discount, price, pages , condition, sort 
    } = req.query;

    let sortingAttribute;
    const query = {};
    if (comicName) query.bookName = comicName; //if comicName exist , put name in query variable
    if (author) query.authorName = author;
    if (year) query.yearOfPublication = year;
    if (price) query.price = price;
    if (condition) query.condition = condition;

    switch(sort){ //Assuming we are sorting based on  {switch condition} and alphatical order
        case comicName : sortingAttribute = 'bookName';
        break;
        case author : sortingAttribute = 'author';
        break;
        case year : sortingAttribute = 'year';
        break;
        case condition : sortingAttribute = 'condition';
        break;
        case pages : sortingAttribute = 'page';
        break;
        case discount : sortingAttribute = 'discount';
        break;
        default:
            sortingAttribute = 'price'
    }

    const comics = await ComicBook.find(query)//finding using query variable
      .limit(limit * 1)// by default limit is 10
      .skip((page - 1) * limit)//to skip documents data by specified no.
      .sort({ [sortingAttribute]: 1 }); // Default sorting by price

    res.json(comics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Comic By ID
const getComicById = async (req, res) => {
  try {
    const comic = await ComicBook.findById(req.params.id);
    if (!comic) {
      return res.status(404).json({ message: 'Comic book not found' });
    }
    res.json(comic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Comic
const updateComic = async (req, res) => {
  try {
    //finding document by params id, putting req.body(new data) to update
    const comic = await ComicBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comic) {
      return res.status(404).json({ message: 'Comic book not found' });
    }
    res.json(comic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Comic
const deleteComic = async (req, res) => {
  try {
    const comic = await ComicBook.findByIdAndDelete(req.params.id);
    if (!comic) {
      return res.status(404).json({ message: 'Comic book not found' });
    }
    res.json({ message: 'Comic book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createComic, getComics, getComicById, updateComic, deleteComic };
