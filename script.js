const container = document.querySelector(".container");

window.addEventListener("keyup", function (e) {
  let key = e.key === " " ? "␣" : e.key; // Space visible symbol

  let card = document.createElement("div");
  card.classList.add("card");
  card.textContent = key.toUpperCase();

  container.appendChild(card);

  // GSAP entry animation
  gsap.fromTo(
    card,
    { opacity: 0, scale: 0, rotationY: 90, y: 100 },
    {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    }
  );

  // Floating effect
  gsap.to(card, {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "sine.inOut",
  });

  // Glow effect when typing
  gsap.fromTo(
    card,
    { boxShadow: "0 0 0px #FFD600" },
    { boxShadow: "0 0 30px #FFD600", duration: 0.5, yoyo: true, repeat: 1 }
  );

  // 3D tilt effect on mouse move
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // tilt max 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotationX: -rotateX,
      rotationY: rotateY,
      duration: 0.3,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});
