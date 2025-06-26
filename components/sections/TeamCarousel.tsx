import { AnimatedTeamMembers } from "../ui/animated-testimonials";

export function TeamCarousel() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Muhammad tayyab",
      designation: "Co-Founder at Devskrew",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      socials: [
  { icon: "linkedin", url: "https://linkedin.com/in/sarahchen" },
  { icon: "twitter", url: "https://twitter.com/sarahchen" },
],

    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Usman Bin Muaz",
      designation: "CEO at Devskrew",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      socials: [
  { icon: "linkedin", url: "https://linkedin.com/in/sarahchen" },
  { icon: "twitter", url: "https://twitter.com/sarahchen" },
],

    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Muhammad Sheraz Akram",
      designation: "Operations Director at Devskrew",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      socials: [
  { icon: "linkedin", url: "https://linkedin.com/in/sarahchen" },
  { icon: "twitter", url: "https://twitter.com/sarahchen" },
],

    },
  ];
  return <AnimatedTeamMembers testimonials={testimonials} />;
}
