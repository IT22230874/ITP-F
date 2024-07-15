import React from "react";

function RentItem({ tender, onClose }) {
  console.log("Tender in RentItem:", tender);

  // Ensure tender is not null or undefined before accessing its properties
  if (!tender) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md max-w-lg w-full">
          <p className="text-red-600">No tender information available.</p>
          <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-400 text-sm" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Bid Details</h2>

        <h2 className="text-xl font-semibold mb-4 text-red-600">{tender.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Bid ID</label>
            <input type="text" name="bidid" readOnly value={tender.bidid} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" readOnly value={tender.name} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Bid Amount</label>
            <input type="text" name="bidamount" readOnly value={tender.bidamount} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Organization Name</label>
            <input type="text" name="organizationname" readOnly value={tender.organizationname} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" name="address" readOnly value={tender.address} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input type="text" name="tel" readOnly value={tender.tel} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="text" name="email" readOnly value={tender.email} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Website Link</label>
            <input type="text" name="weblink" readOnly value={tender.weblink} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input type="text" name="date" readOnly value={tender.date} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" readOnly value={tender.description} rows={4} className="mt-1 p-2 w-full rounded-md text-sm border border-gray-300" />
          </div>
          
          <div className="col-span-2 flex justify-end space-x-2">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-400 text-sm" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentItem;
