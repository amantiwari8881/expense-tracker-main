import React, { useEffect, useState } from "react";
import { getExpenses } from "../../services/ExpenseService";
import { toast } from "react-toastify";
import { MdInfo } from "react-icons/md";
import ExpenseView from "../../components/user/ExpenseView.jsx";

// import { parsePrice } from "../../utils/parseFilters";

// import { Button, TextInput, Datepicker, Label } from "flowbite-react";
function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    if (searchKeyword.trim() == "") {
      setExpenses([...allExpenses]);
      return;
    }

    if (searchKeyword.trim() != "" && searchKeyword.trim().length > 2) {
      const searchedElements = allExpenses.filter((exp) =>
        exp.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      if (searchedElements.length <= 0) {
        return;
      }

      setExpenses(searchedElements);
      return;
    }
  }, [searchKeyword]);

  // function to load data with filters: defaults
  async function loadExpense(minPrice = "", maxPrice = "", fromDate="",toDate="") {
    try {
      const exp = await getExpenses(minPrice, maxPrice,fromDate,toDate);
      console.log(exp);
      setExpenses(exp);
      setAllExpenses(exp);
    } catch (error) {
      toast.error("Error in loading expenses");
      console.log(error);
    }
  }

  useEffect(() => {
    //loadExpese

    loadExpense();
  }, []);

  const applyFilter = async () => {
    console.log(filters);

    loadExpense(filters.minPrice, filters.maxPrice, filters.fromDate, filters.toDate);

    // load filtered data from server:
  };

  const clearFilter = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      fromDate:"",
      toDate:"",
    });

    setSearchKeyword("");

    loadExpense();
  };



  /// remove expense

   const removeExpense = (expenseId) => {
    const newExpenses = expenses.filter((exp) => exp._id != expenseId);
    const newAllExpenses = allExpenses.filter((exp) => exp._id != expenseId);
    setExpenses([...newExpenses]);
    setAllExpenses([...newAllExpenses]);
  };

  return (
    <div>
      {/* heading  */}
      <h1 className="text-3xl text-end mb-3 w-fit font-semibold">
        Expenses : {expenses.length}
      </h1>

      {/* search bar */}
      <div className="flex gap-3 mb-3 flex-wrap">
        <input
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          value={searchKeyword}
          type="text"
          id="voice-search"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 ps-10 p-2.5  "
          placeholder="Search your expense here "
          required
        />
      </div>

      {/* END search bar */}

      {/* Filters */}

      <div className="filter_container  items-center flex justify-between gap-2">
        <div className="flex gap-2 flex-wrap">
          <div className="flex flex-col">
            <label htmlFor="minPrice" className="text-gray-600 px-1 text-xs">
              Select min price
            </label>
            <input
              type="number"
              className="rounded px-1 py-1 bg-gray-300 border"
              onChange={(e) => {
                // console.log(e.target.value);
                setFilters({
                  ...filters,
                  minPrice: e.target.value,
                })
              }}
              value={filters.minPrice}
              id="minPrice"
              sizing="sm"
              placeholder="Min Price"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maxPrice" className="text-gray-600 px-1 text-xs">
              Select max price
            </label>
            <input
              type="number"
              className="rounded px-1 py-1 bg-gray-300 border"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  maxPrice: e.target.value,
                })
              }}
              value={filters.maxPrice}
              id="maxPrice"
              sizing="sm"
              placeholder="Max Price"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fromDate" className="text-gray-600 px-1 text-xs">
              From Date
            </label>
            <input type="date" 
            className="border px-1 py-1"
            onChange={(e)=>
              setFilters({...filters,fromDate:e.target.value})
            }
            value={filters.fromDate}
            id="fromDate"
             />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fromDate" className="text-gray-600 px-1 text-xs">
              To Date
            </label>
            {/* <Datepicker id="fromDate" sizing="sm" placeholder="From Date" /> */}
            <input type="date" 
            className="border px-1 py-1" 
            onChange={(e)=>
              setFilters({...filters,toDate:e.target.value})
            }
            value={filters.toDate}
            id="toDate"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap ">
          <button 
          type="button"
          onClick={applyFilter} className="cursor-pointer bg-green-600 rounded px-1 py-1 hover:bg-black hover:text-green-500 " size="sm">
            Apply Filter
          </button>
          <button
          type="button"
            onClick={clearFilter}
            className="cursor-pointer bg-red-600 rounded px-1 py-1 hover:bg-black hover:text-red-500"
            size="sm"
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* END Filters */}
      {expenses.length > 0 && (
        <div className="">
          <div>
            <div className="flex flex-wrap mt-8 gap-4">
              {expenses.map((expense, index) => (
                <ExpenseView removeExpense={removeExpense} key={index} expense={expense} />
              ))}
            </div>
          </div>
        </div>
      )}
      {expenses.length <= 0 && (
        <div className="flex flex-col justify-center mt-10 items-center gap-2">
          <MdInfo className="text-red-400" size={38} />
          <h1 className="text-center text-3xl font-semibold">
            No expense available
          </h1>
        </div>
      )}
    </div>
  );
}

export default ViewExpenses;
