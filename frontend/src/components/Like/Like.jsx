import React, { useState } from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

function Like() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  }

  function handleDislike() {
    setDislikes(dislikes + 1);
  }

  return (
    <div>
      <h2>Contenu</h2>
      <p>Ceci est le contenu que tu souhaites afficher.</p>
      <button onClick={handleLike} disabled={isLiked}>
        <FaThumbsUp />
        Like
      </button>
      <button onClick={handleDislike}>
        <FaThumbsDown />
        Dislike
      </button>
      <p>Likes: {likes}</p>
      <p>Dislikes: {dislikes}</p>
    </div>
  );
}

export default Like;
