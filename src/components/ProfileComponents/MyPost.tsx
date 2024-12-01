import NewPost from '../PostComponents/NewPost'
import PostList from '../PostComponents/PostList'

const MyPost = () => {

  const username = localStorage.getItem("username");

  return (
    <>
    <div className='mb-2'><NewPost/></div>
    <div><PostList isAllPost={false}/></div>
    
    </>
  )
}

export default MyPost