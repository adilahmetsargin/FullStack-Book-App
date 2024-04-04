import React from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";
import DeleteBookModal from "../components/DeleteBookModal";
import BooksTable from "../components/BooksTable";
import BooksCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showType, setShowType] = useState("");

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((result) => {
        setBooks(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err.message);
      });

    setLoading(false);
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl my-8">Books List </h1>
        <Link to="/book/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} openModal={openModal} />
      ) : (
        <BooksCard books={books} openModal={openModal} />
      )}
      {selectedBook && (
        <DeleteBookModal book={selectedBook} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
