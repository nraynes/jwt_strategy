import PostsPage from '../views/posts/PostsPage';

const protectedRoutes = [
    { path: '/posts', element: <PostsPage/> }
];

export default protectedRoutes;