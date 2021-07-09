const express = require("express");
const router = express.Router();
const Book = require("../schemas/book");
const Room = require("../schemas/room");

//아래 함수에 room Id 추가, 룸이 있는지 확인 과정 추가.
router.post("/", async (req, res) => {
  //////////요기
  const { roomId, adult, kid } = req.body;
  const date = new Date();

  try {
    //아래 룸이 있는지 확인하는 코드
    const isRoomExist = await Room.exists({ _id: roomId });
    if (!isRoomExist) {
      return res.status(401).json({ message: false });
    }

    //////////////////////////////////요기
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

router.patch("/:bookId", async (req, res) => {
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
