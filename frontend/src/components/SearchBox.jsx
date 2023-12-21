import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productApiSlice";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const { data } = useGetProductsQuery({});
  const [searchedItem, setSearchedItem] = useState(data?.products || []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    let filteredItem = data?.products.filter(
      (pr) =>
        pr.name.toLowerCase().includes(e.target.value) ||
        pr.category.toLowerCase().includes(e.target.value)
    );
    setSearchedItem(filteredItem);
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex px-2">
      <Form.Control
        type="text"
        value={keyword}
        onChange={(e) => handleSearch(e)}
        name="q"
        placeholder="Search Products ..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button className="py-2 mx-2" type="submit" variant="primary">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
