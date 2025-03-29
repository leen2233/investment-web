import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function RippleButton({ children, className, onClick }) {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const id = Date.now();
      setRipples([...ripples, { x, y, id }]);

      setTimeout(() => {
        setRipples((ripples) => ripples.filter((ripple) => ripple.id !== id));
      }, 600);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/20"
          initial={{
            width: 0,
            height: 0,
            x: ripple.x,
            y: ripple.y,
            opacity: 0.5,
          }}
          animate={{
            width: 500,
            height: 500,
            x: ripple.x - 250,
            y: ripple.y - 250,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      {children}
    </Button>
  );
}
