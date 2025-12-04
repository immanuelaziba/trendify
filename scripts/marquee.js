// global-marquee.js

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".marquee-track");
  if (!track) return;

  // Duplicate the marquee groups if needed (safety)
  const group = track.querySelector(".marquee-group");
  if (group && track.children.length < 2) {
    const clone = group.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  }

  // Force dynamic width to allow smooth animation
  const totalWidth = [...track.children].reduce(
    (sum, el) => sum + el.offsetWidth,
    0
  );
  
  track.style.width = totalWidth + "px";
});
