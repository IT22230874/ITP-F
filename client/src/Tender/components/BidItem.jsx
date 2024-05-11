import React from "react";

function RentItem({ tender, onClose }) {
  return (
    <div className="formcontainer">
      <div className="view popup">
        <label>Bid ID</label>
        <input type="text" name="bidid" readOnly value={tender.bidid} />
        <label>Name</label>
        <input type="text" name="name" readOnly value={tender.name} />
        <label>Organization Name</label>
        <input type="text" name="organizationname" readOnly value={tender.organizationname} />
        <label>Address</label>
        <input type="text" name="address" readOnly value={tender.address} />
        <label>Contact</label>
        <input type="text" name="tel" readOnly value={tender.tel} />
        <label>Email</label>
        <input type="text" name="email" readOnly value={tender.email} />
        <label>Website Link</label>
        <input type="text" name="weblink" readOnly value={tender.weblink} />
        <label>Description</label>
        <input type="text" name="description" readOnly value={tender.description} />
        <label>Date</label>
        <input type="text" name="date" readOnly value={tender.date} />

        <button className="close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default RentItem;
