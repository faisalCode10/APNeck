import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { fireDB } from '../firebase/FirebaseConfig';
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
  setDoc,
  getDocs
} from 'firebase/firestore';
import { toast } from 'react-toastify';

function MyState(props) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);

  // Toggle dark mode
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  const [product, setProduct] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }),
  });

  const [products, setProducts] = useState([]);
  // Add product 
  const addProduct = async () => {
    if (
      product.title == null ||
      product.price == null ||
      product.imageUrl == null ||
      product.category == null ||
      product.description == null
    ) {
      return toast.error('Please fill all fields');
    }

    const productRef = collection(fireDB, 'products');
    setLoading(true);

    try {
      await addDoc(productRef, product);
      toast.success('Product added successfully');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
      // getProductData();
      closeModal(); // Assuming closeModal is defined somewhere
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setProduct({});
  };

  //  Get Product

  const getProductData = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, 'products'), orderBy('time'));

      const data = onSnapshot(q, (querySnapshot) => {
        let productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productsArray);
        setLoading(false);
      });

      return () => data();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), product);
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

  // Delete the product

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }


  // ****************************Get Order ***********************************
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      // console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }




  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);


  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        product,
        products,
        setProducts,
        setProduct,
        addProduct,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchkey, setSearchkey, filterType, setFilterType,
        filterPrice, setFilterPrice
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
