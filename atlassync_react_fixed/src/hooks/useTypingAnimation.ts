import { useState, useEffect, useCallback } from 'react';

interface UseTypingAnimationOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypingAnimation({
  text,
  speed = 50,
  delay = 500,
  onComplete,
}: UseTypingAnimationOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setDisplayedText('');
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isTyping, text, speed, delay, onComplete]);

  return { displayedText, isTyping, isComplete, startTyping };
}

export function useTypewriter(
  texts: string[],
  options: { typingSpeed?: number; deletingSpeed?: number; pauseDuration?: number } = {}
) {
  const { typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000 } = options;
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText === text) {
        setIsPaused(true);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return { currentText, isDeleting, isPaused };
}
