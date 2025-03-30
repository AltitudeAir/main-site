// export default function animateOnScroll(
//   elementQuerySelector,
//   observerQuerySelector,
//   animationClass,
//   replay = false
// ) {
//   const elements = document.querySelectorAll(elementQuerySelector);
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         for (let i = 0; i < elements.length; i++) {
//           elements[i].classList.add(animationClass);
//           elements[i].style.visibility = "visible";

//           // Must have for animation
//           elements[i].classList.add("animate__animated");
//         }

//         return;
//       }

//       if (replay) {
//         for (let i = 0; i < elements.length; i++) {
//           elements[i].classList.remove(animationClass);
//         }
//       }
//     });
//   });
//   observer.observe(document.querySelector(observerQuerySelector));
// }
