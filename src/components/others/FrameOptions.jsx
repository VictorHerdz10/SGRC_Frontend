import { useEffect } from 'react';

export default function FrameOptions() {
    useEffect(() => {
      const metaTag = document.createElement('meta');
      metaTag.name = 'frame-ancestors';
      metaTag.content = import.meta.env.VITE_FRAME_OPTIONS || 'sameorigin';
      document.head.appendChild(metaTag);
  
      return () => {
        document.head.removeChild(metaTag);
      };
    }, []);
    
    return null;
  }
