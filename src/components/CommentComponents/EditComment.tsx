import React, { useState } from 'react'
import { CommentData } from './CommentList'
import Joi from 'joi';

const EditComment = ({commentData, onEdit, commentId, onClose}:{commentData: CommentData, onEdit: any, commentId:number, onClose:any}) => {

  const [errors, setErrors] = useState<any>({});
  const [commentToEdit, setCommentToEdit] = useState<CommentData>(commentData);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

    <div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <textarea
            id="content"
            name="content"
            className="w-full h-20 p-2 text-sm text-gray-900 bg-white border-1 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="What's on your mind?"
            value={commentToEdit.content}
            onChange={(event) => handleChange(event)}
          ></textarea>
      
        <div className="flex items-center justify-center mb-4 mt-2"></div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <div>
            <button
              onClick={onClose}
              type="submit"
              className="inline-flex items-center py-2 px-6 text-sm font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-600"
            >
              Close
            </button>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-flex items-center py-2 px-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-purple-900 hover:bg-purple-800"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditComment