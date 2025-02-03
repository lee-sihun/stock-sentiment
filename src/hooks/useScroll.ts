export const useScroll = () => {
  const smoothScroll = (
    element: HTMLDivElement | null,
    direction: 'left' | 'right'
  ) => {
    if (!element) return;

    const scrollAmount = 306;
    const duration = 300;
    const startScrollLeft = element.scrollLeft;
    const maxScroll = element.scrollWidth - element.clientWidth;

    // 스크롤 범위 체크
    if (
      (direction === 'left' && startScrollLeft <= 0) || 
      (direction === 'right' && startScrollLeft >= maxScroll)
    ) {
      return;
    }

    const startTime = performance.now();
    const targetScrollLeft = Math.max(
      0,
      Math.min(
        maxScroll,
        direction === 'left' 
          ? startScrollLeft - scrollAmount 
          : startScrollLeft + scrollAmount
      )
    );

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutCubic(progress);

      element.scrollLeft = startScrollLeft + (targetScrollLeft - startScrollLeft) * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return { smoothScroll };
};