// src/components/common/EventFormModal.jsx
import React, { useState, useEffect } from 'react';

const EventFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => { // Changed default to null for clarity
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    title: '',
    location: '',
    description: '',
    // Spread initialData safely. If initialData is null, it spreads nothing.
    // If it's an object, its properties will override the empty defaults.
    ...(initialData || {}),
  });

  useEffect(() => {
    // Update form data when initialData changes (for editing)
    // or reset for new event when modal opens
    if (isOpen) {
      setFormData({
        date: '',
        time: '',
        title: '',
        location: '',
        description: '',
        // Use initialData || {} to ensure we always spread an object
        // so default values for new events are properly applied
        ...(initialData || {}),
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gamepulse-yellow mb-6 border-b pb-2 border-gray-700">
          {/* Changed initialData.eventId to initialData?.id for safety and consistency */}
          {initialData?.id ? 'Edit Event' : 'Add New Event'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-gamepulse-blue bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-300 text-sm font-bold mb-2">
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-gamepulse-blue bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-gamepulse-blue bg-gray-700"
              placeholder="e.g., National League Match"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-300 text-sm font-bold mb-2">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-gamepulse-blue bg-gray-700"
              placeholder="e.g., Accra Sports Stadium"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">
              Description (Optional):
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-gamepulse-blue bg-gray-700"
              placeholder="Any additional details about the event."
            ></textarea>
          </div>
          <div className="flex items-center justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gamepulse-blue hover:bg-gamepulse-blue-darker text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              {initialData?.id ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;