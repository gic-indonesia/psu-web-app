import { useEffect, useRef, useState } from "react";

const MarqueeText = (props: { text: string, containerRef: React.RefObject<HTMLDivElement>, className?: string }) => {
  const { text, containerRef, className } = props;
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        // console.log('containerwidth', containerRef.current.clientWidth);
        // console.log('textwidth', textRef.current.clientWidth);
        // console.log('isoverflow', textRef.current.scrollWidth > containerRef.current.clientWidth);
        const isOverflow = textRef.current.scrollWidth > containerRef.current.clientWidth;
        setIsOverflowing(isOverflow);
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  })

  return (
    <p ref={textRef} className={` marquee-text ${className} ${isOverflowing ? 'marquee-animate' : ''}`}>{text}</p>
  )
}

export default MarqueeText;