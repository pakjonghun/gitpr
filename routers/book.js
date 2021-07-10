const express = require("express");
const router = express.Router();
const Book = require("../schemas/book");
const Room = require("../schemas/room");

router.post("/", async (req, res) => {
  const { roomId, adult, kid, startDate, endDate } = req.body;

  endDate = new Date(endDate);
  startDate = new Date(startDate);

  difference = (endDate - startDate) / (1000 * 60 * 60 * 24);
  

  const start = new Date(startDate).getMilliseconds();
  const end = new Date(endDate).getMilliseconds();

  const distance = start - end;
  const distanceTimes = 1000 * 60 * 60 * 24;
  console.log(distanceTimes);

  start.get;

  try {
    const isRoomExist = await Room.exists({ _id: roomId });
    if (!isRoomExist) {
      return res.status(401).json({ message: false });
    }

    const book = await Book.create({ roomId, date, adult, kid });

    return res.json({ message: true, bookId: book._id });
  } catch (e) {
    console.log(e);

    return res.status(500).json({ message: false });
  }
});

router.get("/", async (req, res) => {
  const books = await Book.find({});

  console.log(books);

  res.send({ books });
});

router.put("/:bookId", async (req, res) => {
  const { bookId: _id } = req.params;
  try {
    const isExist = await Book.exists({ _id });
    if (!isExist) {
      return res.status(404).json({ message: false });
    }

    console.log(isExist);

    await Book.updateOne({ _id }, { $set: req.body });

    return res.json({ message: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: false });
  }
});

router.delete("/:bookId", async (req, res) => {
  const { bookId: _id } = req.params;
  try {
    const isExist = await Book.exists({ _id });
    if (!isExist) {
      return res.status(404).json({ message: false });
    }

    await Book.remove({ _id });
    return res.json({ message: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: false });
  }
});

module.exports = router;
