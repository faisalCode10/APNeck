import React, { useContext, useState } from 'react';
import myContext from '../../context/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import ReactPaginate from 'react-paginate';
import './order.css'

function Order() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userid = currentUser ? currentUser.user.uid : null;
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(order.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Layout>
      {loading && <Loader />}
      {currentItems.length > 0 ? (
        <>
          <div className="h-full pt-10">
            {currentItems
              .filter((obj) => obj.userid == userid)
              .map((order) => {
                return (
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" key={order.id}>
                    {order.cartItems.map((item) => {
                      return (
                        <div className="rounded-lg md:w-2/3" key={item.productId}>
                          <div
                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                            style={{
                              backgroundColor: mode === 'dark' ? '#282c34' : '',
                              color: mode === 'dark' ? 'white' : '',
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt="product-image"
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2
                                  className="text-lg font-bold text-gray-900"
                                  style={{ color: mode === 'dark' ? 'white' : '' }}
                                >
                                  {item.title}
                                </h2>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{ color: mode === 'dark' ? 'white' : '' }}
                                >
                                  {item.description}
                                </p>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{ color: mode === 'dark' ? 'white' : '' }}
                                >
                                  {item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
          <div className="flex justify-center mt-3">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              previousLabel={'previous'}
              nextLabel={'next'}
            />
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl text-white">Not Order</h2>
      )}
    </Layout>
  );
}

export default Order;
