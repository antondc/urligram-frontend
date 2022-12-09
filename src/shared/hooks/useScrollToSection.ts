export const useScrollToSection = (): {
  scrollToSection: (hash: string) => void;
} => {
  const scrollToSection = (hash: string) => {
    const element = document.getElementById(hash);

    if (!element) return;

    const yOffset = -90;
    const yDistance = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: yDistance, behavior: 'smooth' });
  };

  return { scrollToSection };
};
