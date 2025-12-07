import React from "react";
import BookingCard from "./BookingCard";

const BookingList = ({ list, tab }) => {
  if (list.length === 0)
    return <p className="no-records">No records found.</p>;

  return (
    <div>
      {list.map(item => (
        <BookingCard key={item.id} data={item} tab={tab} />
      ))}
    </div>
  );
};

export default BookingList;
