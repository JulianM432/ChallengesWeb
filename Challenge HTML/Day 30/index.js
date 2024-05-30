// import JSConfetti from 'js-confetti';
const confettiButton = document.getElementById("confetti-btn");
confettiButton.addEventListener("click", () => {
    console.log("Hola");
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();
});
