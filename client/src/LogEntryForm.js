import React from "react";
import { useForm } from "react-hook-form";
import { createLog } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      data.latitude = location.latitude;
      data.longtitude = location.longitude;
      const created = await createLog(data);
      console.log(created);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" ref={register} required />
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" rows={3} ref={register}></textarea>
        <label htmlFor="description">Description</label>
        <textarea name="description" rows={3} ref={register}></textarea>
        <label htmlFor="image">Image</label>
        <input type="text" name="image" ref={register} />
        <label htmlFor="visitedAt">Visit Date</label>
        <input type="date" name="visitedAt" ref={register} required />
        <button>Create Entry</button>
      </form>
    </div>
  );
};

export default LogEntryForm;
