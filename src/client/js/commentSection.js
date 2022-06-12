const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".video__comment__deleteBtn");

const handleDelete = async (event) => {
  const li = event.target.parentElement;
  const {
    dataset: { id: commentId },
  } = li;
  li.remove();
  await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
};

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const spanForComment = document.createElement("span");
  spanForComment.innerText = ` ${text}`;
  const spanForDeleteBtn = document.createElement("span");
  spanForDeleteBtn.innerText = "❌";
  spanForDeleteBtn.className = "video__comment__deleteBtn";
  newComment.appendChild(icon);
  newComment.appendChild(spanForComment);
  newComment.appendChild(spanForDeleteBtn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteBtns) {
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", handleDelete);
  });
}
