import React, { useState } from 'react'
import { CommentData } from './CommentList'
import Joi from 'joi';

const EditComment = ({commentData, onEdit, commentId}:{commentData: CommentData, onEdit: any, commentId:number}) => {

  const [errors, setErrors] = useState<any>({});
  const [commentToEdit, setCommentToEdit] = useState<CommentData>(commentData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newComment = { ...commentToEdit, [name]: value }
    setCommentToEdit(newComment)
  };


  // Joi validation schema
  const validationSchema = Joi.object({
    content: Joi.string().required().label("Content"),
    postId: Joi.number().allow().label("postId"),
    userId: Joi.number().allow().label("userId"),
  });

  // Handle form submission
  const handleSubmit = async () => {
    const { error } = validationSchema.validate(commentToEdit, {
      abortEarly: false,
    });

    if (error) {
      const newErrors: any = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      if (commentToEdit.content) {
        onEdit(commentToEdit, commentId)
      }
    } catch (error) {
      setErrors({ general: "Error in editing" });
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <input
      type="text"
      name="content"
      value={commentToEdit.content}
      onChange={handleChange}
      className="p-2 h-20 w-full text-sm border border-gray-300 rounded-md mb-6 focus:ring-2 focus:ring-purple-800"
    />
    <div className="relative">
      <button
        onClick={() => handleSubmit()}
        className="absolute right-0 -mt-3 w-20 h-6 text-white bg-violet-500 rounded-xl"
      >
        Post
      </button>
    </div>
    </div >
  )
}

export default EditComment