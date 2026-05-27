# 🎮 Neo Tokyo Gaming Theme - Quick Reference

## 🎨 Essential CSS Classes

### Neon Text Effects
```css
.neon-blue      /* Cyan neon with flicker */
.neon-cyan      /* Bright cyan glow */
.neon-purple    /* Magenta neon glow */
.neon-pink      /* Hot pink neon */
.neon-pulse     /* Pulsing neon animation */
.holo-text      /* Holographic gradient text */
```

### Cards & Containers
```css
.holo-card          /* Holographic card with animated border */
.gaming-card        /* Gaming-style hover effect */
.anime-shine        /* Anime-style shine sweep */
.city-lights        /* Neon city lights effect */
```

### Buttons
```css
.glow-button        /* Glowing button with hover effect */
.button-press       /* Press feedback animation */
.gaming-hover       /* Gaming-style hover lift */
```

### Inputs
```css
.cyber-input        /* Neo Tokyo styled input */
```

### Borders & Effects
```css
.cyber-border           /* Animated gradient border */
.anime-border           /* Anime-style border */
.neon-border-animated   /* Flowing neon border */
```

### Backgrounds
```css
.tech-grid          /* Animated tech grid */
.scanlines          /* CRT scanline effect */
```

### Badges & Icons
```css
.anime-badge        /* Pulsing glow badge */
.icon-glow          /* Icon with drop shadow glow */
```

### Animations
```css
.pulse-glow         /* Pulsing glow effect */
.float-animation    /* Floating motion */
.level-up           /* Level up scale effect */
.score-pop          /* Score counter pop */
.glitch             /* Glitch effect on hover */
```

### Utilities
```css
.neo-tokyo-shadow   /* Multi-color shadow */
.gaming-progress    /* Gaming progress bar */
.health-bar         /* Gaming health bar */
```

---

## 🎨 Color Palette

### Primary Colors
```css
Neon Cyan:    #00ffff
Neon Magenta: #ff00ff
Deep Pink:    #ff1493
Purple:       #8a2be2
```

### Backgrounds
```css
Deep Space:   #0a0015
Midnight:     #1a0a2e
Shadow:       #0f0520
```

### Text
```css
Primary:      #e2e8f0
Secondary:    #cbd5e1
Accent:       #00ffff
```

---

## 🎬 Key Animations

### Duration Guide
- **Fast**: 0.2s - 0.6s (interactions)
- **Medium**: 1s - 3s (effects)
- **Slow**: 4s - 20s (backgrounds)

### Most Used
```css
neo-tokyo-spin      /* 1s - Spinner */
neon-flicker        /* 3s - Text flicker */
holo-shine          /* 3s - Card shine */
border-glow         /* 3s - Border flow */
pulse-glow          /* 2s - Pulsing glow */
```

---

## 💡 Quick Tips

### Creating Neon Text
```html
<h1 class="neon-blue">Your Text</h1>
```

### Gaming Card
```html
<div class="holo-card gaming-card p-6 rounded-lg">
  Content
</div>
```

### Glowing Button
```html
<button class="glow-button button-press bg-cyan-600 px-6 py-3 rounded-lg">
  Click Me
</button>
```

### Animated Badge
```html
<span class="anime-badge">NEW</span>
```

### Holographic Text
```html
<h2 class="holo-text text-3xl font-bold">
  Holographic
</h2>
```

---

## 🎯 Common Combinations

### Hero Section
```html
<div class="tech-grid scanlines p-12">
  <h1 class="neon-blue text-5xl mb-4">Welcome</h1>
  <p class="text-gray-300">Description</p>
</div>
```

### Feature Card
```html
<div class="holo-card gaming-card anime-shine p-6 rounded-xl">
  <h3 class="holo-text text-xl mb-2">Title</h3>
  <span class="anime-badge">Featured</span>
</div>
```

### Action Button
```html
<button class="glow-button button-press bg-gradient-to-r from-cyan-600 to-purple-600 px-8 py-3 rounded-lg">
  <span class="icon-glow">🎮</span> Start
</button>
```

### Input Field
```html
<input 
  type="text" 
  class="cyber-input w-full px-4 py-3 rounded-lg"
  placeholder="Enter text..."
/>
```

---

## 🚀 Performance

### Optimized Elements
- ✅ Hardware-accelerated transforms
- ✅ GPU-powered animations
- ✅ Efficient gradients
- ✅ Selective backdrop-filter

### Best Practices
- Use `transform` over `position`
- Limit `backdrop-filter` usage
- Optimize gradient color stops
- Reduce mobile animations

---

## 📱 Responsive Classes

### Mobile First
```css
/* Base styles for mobile */
.gaming-card { ... }

/* Tablet and up */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

---

## 🎨 Customization

### Adjust Glow Intensity
```css
/* Light */
box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);

/* Medium */
box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);

/* Intense */
box-shadow: 0 0 40px rgba(0, 255, 255, 0.8);
```

### Change Animation Speed
```css
/* Slow */
animation-duration: 4s;

/* Normal */
animation-duration: 2s;

/* Fast */
animation-duration: 1s;
```

---

## 🎮 Gaming Elements

### Health Bar
```html
<div class="health-bar">
  <div class="health-bar-fill" style="width: 75%"></div>
</div>
```

### Progress Bar
```html
<div class="gaming-progress"></div>
```

### Achievement
```html
<div class="achievement-popup holo-card p-4">
  <span class="anime-badge">Achievement Unlocked!</span>
</div>
```

---

## 🌟 Special Effects

### Particle Effect
```html
<div class="particle"></div>
```

### Scanlines
```html
<div class="scanlines">
  Content with scanline overlay
</div>
```

### Glitch Text
```html
<h1 class="glitch neon-cyan" data-text="Glitch">
  Glitch
</h1>
```

---

## 📝 Cheat Sheet

| Effect | Class | Duration |
|--------|-------|----------|
| Neon Glow | `.neon-blue` | - |
| Card Hover | `.gaming-card` | 0.3s |
| Button Glow | `.glow-button` | 0.3s |
| Pulse | `.pulse-glow` | 2s |
| Flicker | `.neon-blue` | 3s |
| Shine | `.anime-shine` | 3s |
| Border Flow | `.cyber-border` | 3s |
| Grid Move | `.tech-grid` | 20s |

---

## 🎯 Quick Start

1. **Add neon text**: Use `.neon-blue` or `.neon-purple`
2. **Create card**: Use `.holo-card .gaming-card`
3. **Style button**: Use `.glow-button .button-press`
4. **Add input**: Use `.cyber-input`
5. **Create badge**: Use `.anime-badge`

---

## 🔗 Related Files

- **Full Documentation**: `NEO_TOKYO_GAMING_THEME.md`
- **CSS File**: `frontend/src/index.css`
- **Theme Summary**: `THEME_UPDATE_SUMMARY.md`

---

**Last Updated**: Neo Tokyo Gaming Theme Implementation
**Version**: 2.0 - Gaming Edition
