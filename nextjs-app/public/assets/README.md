# Asset Directory Structure

This directory contains all static assets for the Next.js application.

## Directory Structure

```
public/assets/
├── images/
│   ├── icons/          # Icons and small graphics
│   │   └── placeholder-icon.svg
│   ├── backgrounds/    # Background images and patterns
│   │   └── placeholder-bg.svg
│   └── placeholder-logo.svg
├── videos/
│   └── promos/         # Promotional videos
└── README.md
```

## Usage in Next.js

### Images
```tsx
import Image from 'next/image'

// Logo
<Image 
  src="/assets/images/placeholder-logo.svg"
  alt="Logo"
  width={200}
  height={200}
/>

// Background
<Image 
  src="/assets/images/backgrounds/placeholder-bg.svg"
  alt="Background"
  width={800}
  height={400}
/>

// Icon
<Image 
  src="/assets/images/icons/placeholder-icon.svg"
  alt="Icon"
  width={32}
  height={32}
/>
```

### Videos
```tsx
// Promotional video
<video 
  src="/assets/videos/promos/example.mp4"
  controls
  className="w-full"
/>
```

## Best Practices

1. Use SVG for logos, icons, and simple graphics
2. Use WebP or optimized JPG/PNG for photographs
3. Keep video files compressed and in MP4 format
4. Use descriptive filenames
5. Maintain consistent dimensions for similar assets
6. Update this README when adding new asset types or directories 