import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useRemoveProductImageMutation,
} from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../components/Pagination";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const {
    data,
    isLaoding: productsLoading,
    error,
    refetch,
  } = useGetProductsQuery({ pageNumber });

  const [deleteProduct, { isloading: loadingDeletion }] =
    useDeleteProductMutation();

  const [removeProduct] = useRemoveProductImageMutation();

  const [createProduct, { isLaoding: loadingCreate }] =
    useCreateProductMutation();

  const deleteHandler = async (product) => {
    const pathArray = product.image.split("/");

    const imageName = encodeURIComponent(pathArray[pathArray.length - 1]);

    if (window.confirm("Deleteing product?")) {
      try {
        // const resImage = await removeProduct(imageName).unwrap();
        await deleteProduct(product._id).unwrap();

        refetch();
        toast.success("Product removed");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const createHandler = async () => {
    if (window.confirm("Create new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createHandler}>
            <FaEdit /> Craate Products
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {productsLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {loadingDeletion && <Loader />}
              {data?.products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data?.pages} page={data?.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
