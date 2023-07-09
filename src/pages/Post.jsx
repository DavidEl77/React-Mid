import PropTypes from "prop-types";

const Post = ({ post }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        border: "2px solid purple",
        padding: "10px",
        gap: "10px",
        width: "40vh",
      }}
    >
      <strong style={{ textDecoration: "blue underline" }}>Title:</strong>{" "}
      {post.title}.
      <strong style={{ textDecoration: "blue underline" }}>Body:</strong>
      {post.body}.
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
