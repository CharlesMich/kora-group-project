// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { fetchAllFollows } from '../../../store/followsReducer';


// function AllFollows() {
//     const dispatch = useDispatch();
//     const history = useHistory();

// const sessionUser = useSelector((state) => state.session.user);
// const follows = useSelector((state)=> state.follows);

// const userId = sessionUser.id;

// useEffect(() => {
//     dispatch(fetchAllFollows(userId));
// }, [dispatch, userId]);

// if(!userId) return null;

// return (
//     follows.count
// )
// }
//  export default AllFollows