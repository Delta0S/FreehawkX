const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const randomChar = () => chars[Math.floor(Math.random() * chars.length)];
const randomString = length => Array.from({ length }, () => randomChar()).join("");

const card = document.querySelector(".card");
const letters = card.querySelector(".card-letters");

const handleOnMove = e => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  letters.style.setProperty("--x", `${x}px`);
  letters.style.setProperty("--y", `${y}px`);

  letters.innerText = randomString(1500);    
};

card.addEventListener("mousemove", handleOnMove);
card.addEventListener("touchmove", e => handleOnMove(e.touches[0]));
