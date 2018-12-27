import { hasErrored, addFavorite } from '../actions';

export const postFavorites = (movie, userId) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/users/favorites/new',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...movie,
            user_id: userId
          })
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const result = await response.json();
      console.log(result)
      dispatch(addFavorite(result.id));
    } catch (err) {
      dispatch(hasErrored(err.message));
    }
  };
};
