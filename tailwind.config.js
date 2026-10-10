/** @type {import('tailwindcss').Config} */
import colors from "./src/tailwind/variables/colors";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      fw: "100%",
    },
    extend: {
      colors: {
        // Light mode theme colors - Clean, professional, high contrast
        light: {
          primary: colors["primary-light"] || "#4A5FBF", // Calm royal blue
          secondary: colors["primary-light-400"] || "#818CF8", // Lighter variant
          text: colors["grey-light-900"] || "#0F172A", // Deep slate for readability
          background: colors["light-background"] || colors["F6F2EE"] || "#F6F2EE", // Warm off-white page background
          "background-alt": colors["light-background-alt"] || "#FBF8F4", // Alternating section background
          surface: colors["grey-light-100"] || "#F1F5F9", // Subtle surface color
          elevated: colors["light-surface-raised"] || "#FFFFFF", // Cards on warm background
          border: colors["grey-light-200"] || "#E2E8F0", // Minimal borders
          muted: colors["grey-light-400"] || "#94A3B8", // Muted text
        },
        // Dark mode theme colors - Technical, sophisticated, accessible
        dark: {
          primary: colors["primary-dark"] || "#6366F1", // Brighter indigo for dark mode
          secondary: colors["primary-dark-600"] || "#818CF8", // Lighter secondary
          text: colors["grey-dark-900"] || "#F8FAFC", // High contrast text
          background: colors["dark-background"] || colors["grey-dark-50"] || "#0F172A", // Deep slate background
          "background-alt": colors["dark-background-alt"] || "#151F33", // Alternating section background
          surface: colors["grey-dark-100"] || "#1E293B", // Elevated surfaces
          border: colors["grey-dark-200"] || "#334155", // Subtle borders
          muted: colors["grey-dark-500"] || "#94A3B8", // Muted text
        },
        // Brand colors - Ansu's signature palette
        royal: {
          primary: colors["royal-primary"] || "#4A5FBF", // Primary brand color
          dark: colors["royal-darker"] || "#3949A1", // Hover/active state
          light: colors["royal-100"] || "#E0E7FF", // Backgrounds
        },
        navy: {
          primary: colors["navy-primary"] || "#2563EB", // Technical blue
          hover: colors["navy-hover"] || "#1D4ED8", // Interactive state
          light: colors["navy-100"] || "#DBEAFE", // Backgrounds
        },
        // Neutral system - Balanced, minimal
        grey: {
          primary: colors["grey-primary"] || "#64748B", // Text/borders
          dividers: colors["grey-dividers"] || "#E2E8F0", // Dividers
          hover: colors["grey-primary-hover"] || "#475569", // Hover states
        },
        // Background utilities
        bg: {
          dark: colors["bg-grey-dark"] || "#F1F5F9", // Light mode surface
          light: colors["light-background"] || colors["F6F2EE"] || "#F6F2EE",
          alternate: colors["light-background-alt"] || "#FBF8F4",
        },
        // Semantic colors - Clear, purposeful
        success: colors["green-primary"] || "#0EA47C", // Success states
        warning: colors["orange-primary"] || "#F97316", // Warnings
        error: colors["red-primary"] || "#E74C3C", // Errors
        info: colors["cyan-primary"] || "#0891B2", // Informational
        // Foundation
        black: colors["black-primary"] || "#0F172A",
        mauve: colors["mauve-primary"] || "#8B5CF6",
        // Full color palette
        ...colors,
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "fade-in-left": "fadeInLeft 0.5s ease-out",
        "fade-in-right": "fadeInRight 0.5s ease-out",
        "grow-width": "growWidth 1s ease-out forwards",
        'gradient-x': 'gradient-x 15s ease infinite',
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        "slide-in-right": "slideInRight 1s ease-out forwards",
        "slide-in-left": "slideInLeft 1s ease-out forwards",
        "reveal": "reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-up": "revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-down": "revealDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-left": "revealLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-right": "revealRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "parallax-slow": "parallaxSlow 20s linear infinite",
        "parallax-medium": "parallaxMedium 15s linear infinite",
        "parallax-fast": "parallaxFast 10s linear infinite",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "elegant-reveal": "elegantReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "elegant-fade-up": "elegantFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "elegant-fade-down": "elegantFadeDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "elegant-fade-left": "elegantFadeLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "elegant-fade-right": "elegantFadeRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "smooth-float": "smoothFloat 8s ease-in-out infinite",
        "smooth-float-delayed": "smoothFloat 8s ease-in-out infinite 4s",
        "morphing-gradient": "morphingGradient 12s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "subtle-pulse": "subtlePulse 6s ease-in-out infinite",
        "gentle-sway": "gentleSway 10s ease-in-out infinite",
        "breathing": "breathing 4s ease-in-out infinite",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",
        "elastic-scale": "elasticScale 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "slide-reveal": "slideReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "stagger-reveal": "staggerReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "micro-scale": "microScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "subtle-lift": "subtleLift 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "gentle-rotate": "gentleRotate 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "soft-glow": "softGlow 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "refined-fade": "refinedFade 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth-slide": "smoothSlide 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        "elegant-bounce": "elegantBounce 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "sophisticated-blur": "sophisticatedBlur 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        "gpu-fade": "gpuFade 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "hardware-slide": "hardwareSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "transform3d-lift": "transform3dLift 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "spring-in": "springIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "drift-up": "driftUp 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "drift-down": "driftDown 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "drift-left": "driftLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "drift-right": "driftRight 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "cascade-fade": "cascadeFade 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "depth-reveal": "depthReveal 1.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth-emerge": "smoothEmerge 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        "organic-float": "organicFloat 12s ease-in-out infinite",
        "particle-drift": "particleDrift 15s linear infinite",
        "aurora-flow": "auroraFlow 20s ease-in-out infinite",
        "magnetic-pull": "magneticPull 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "ripple-expand": "rippleExpand 2s ease-out infinite",
        "whisper-fade": "whisperFade 2.5s ease-in-out infinite alternate",
        "liquid-morph": "liquidMorph 8s ease-in-out infinite",
        "crystalline-shimmer": "crystallineShimmer 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        growWidth: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        slideInRight: {
          '0%': {
            transform: 'translateX(100px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        slideIn: {
          '0%': {
            transform: 'translateX(50px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        reveal: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        revealUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        revealDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-40px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        revealLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(40px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        revealRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-40px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '25%': {
            transform: 'translateY(-10px) rotate(0.5deg)',
          },
          '50%': {
            transform: 'translateY(-20px) rotate(0deg)',
          },
          '75%': {
            transform: 'translateY(-10px) rotate(-0.5deg)',
          },
        },
        parallaxSlow: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        parallaxMedium: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        parallaxFast: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
          },
        },
        elegantReveal: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px) scale(0.95) rotateX(10deg)',
            filter: 'blur(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1) rotateX(0deg)',
            filter: 'blur(0px)',
          },
        },
        elegantFadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px) scale(0.96)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        elegantFadeDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-40px) scale(0.96)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        elegantFadeLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(40px) scale(0.96)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        elegantFadeRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-40px) scale(0.96)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        smoothFloat: {
          '0%, 100%': {
            transform: 'translate3d(0, 0px, 0) rotate(0deg)',
          },
          '25%': {
            transform: 'translate3d(-5px, -15px, 0) rotate(1deg)',
          },
          '50%': {
            transform: 'translate3d(0px, -25px, 0) rotate(0deg)',
          },
          '75%': {
            transform: 'translate3d(5px, -15px, 0) rotate(-1deg)',
          },
        },
        morphingGradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '25%': {
            'background-position': '100% 50%'
          },
          '50%': {
            'background-position': '100% 100%'
          },
          '75%': {
            'background-position': '0% 100%'
          },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        subtlePulse: {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        gentleSway: {
          '0%, 100%': {
            transform: 'rotate(-1deg) translateX(0px)',
          },
          '25%': {
            transform: 'rotate(0.5deg) translateX(2px)',
          },
          '50%': {
            transform: 'rotate(1deg) translateX(0px)',
          },
          '75%': {
            transform: 'rotate(-0.5deg) translateX(-2px)',
          },
        },
        breathing: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'scale(1.02)',
            opacity: '1',
          },
        },
        textShimmer: {
          '0%': {
            'background-position': '-200% center',
          },
          '100%': {
            'background-position': '200% center',
          },
        },
        elasticScale: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
          '70%': {
            opacity: '1',
            transform: 'scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        slideReveal: {
          '0%': {
            transform: 'translateX(-100%) skewX(10deg)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0) skewX(0deg)',
            opacity: '1',
          },
        },
        staggerReveal: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) rotateX(20deg)',
            filter: 'blur(2px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) rotateX(0deg)',
            filter: 'blur(0px)',
          },
        },
        springIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.6) rotate(-5deg)',
          },
          '60%': {
            opacity: '0.8',
            transform: 'scale(1.05) rotate(2deg)',
          },
          '80%': {
            opacity: '1',
            transform: 'scale(0.98) rotate(-1deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) rotate(0deg)',
          },
        },
        driftUp: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 50px, -10px) rotateX(15deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) rotateX(0deg)',
          },
        },
        driftDown: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -50px, -10px) rotateX(-15deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) rotateX(0deg)',
          },
        },
        driftLeft: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(50px, 0, -10px) rotateY(-15deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) rotateY(0deg)',
          },
        },
        driftRight: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(-50px, 0, -10px) rotateY(15deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) rotateY(0deg)',
          },
        },
        cascadeFade: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)',
          },
          '40%': {
            opacity: '0.3',
            transform: 'translateY(10px) scale(0.98)',
          },
          '70%': {
            opacity: '0.7',
            transform: 'translateY(2px) scale(1.01)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        depthReveal: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 30px, -50px) scale(0.8)',
            filter: 'blur(15px)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'translate3d(0, 15px, -25px) scale(0.9)',
            filter: 'blur(8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) scale(1)',
            filter: 'blur(0px)',
          },
        },
        smoothEmerge: {
          '0%': {
            opacity: '0',
            transform: 'translateY(25px) scale(0.94) rotateX(5deg)',
          },
          '60%': {
            opacity: '0.8',
            transform: 'translateY(5px) scale(1.02) rotateX(1deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1) rotateX(0deg)',
          },
        },
        particleDrift: {
          '0%': {
            transform: 'translate3d(0, 0, 0) rotate(0deg)',
            opacity: '0.3',
          },
          '25%': {
            transform: 'translate3d(50px, -100px, 0) rotate(90deg)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translate3d(100px, -50px, 0) rotate(180deg)',
            opacity: '0.4',
          },
          '75%': {
            transform: 'translate3d(150px, -150px, 0) rotate(270deg)',
            opacity: '0.2',
          },
          '100%': {
            transform: 'translate3d(200px, -200px, 0) rotate(360deg)',
            opacity: '0',
          },
        },
        auroraFlow: {
          '0%, 100%': {
            transform: 'translateX(-50%) translateY(-50%) rotate(0deg) scale(1)',
            opacity: '0.3',
          },
          '25%': {
            transform: 'translateX(-40%) translateY(-60%) rotate(90deg) scale(1.1)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'translateX(-60%) translateY(-40%) rotate(180deg) scale(0.9)',
            opacity: '0.7',
          },
          '75%': {
            transform: 'translateX(-45%) translateY(-55%) rotate(270deg) scale(1.2)',
            opacity: '0.4',
          },
        },
        magneticPull: {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
          },
          '50%': {
            transform: 'scale(1.02) rotate(1deg)',
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',
          },
        },
        rippleExpand: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        whisperFade: {
          '0%': {
            opacity: '0.2',
            transform: 'scale(0.98)',
          },
          '100%': {
            opacity: '0.6',
            transform: 'scale(1.02)',
          },
        },
        liquidMorph: {
          '0%, 100%': {
            'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(0deg) scale(1)',
          },
          '25%': {
            'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'rotate(90deg) scale(1.05)',
          },
          '50%': {
            'border-radius': '50% 60% 30% 60% / 30% 60% 70% 40%',
            transform: 'rotate(180deg) scale(0.95)',
          },
          '75%': {
            'border-radius': '60% 40% 60% 40% / 70% 30% 60% 70%',
            transform: 'rotate(270deg) scale(1.02)',
          },
        },
        crystallineShimmer: {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'translateX(-100%) skewX(-15deg)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'translateX(100%) skewX(-15deg)',
          },
        },
        microScale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        subtleLift: {
          '0%': {
            transform: 'translateY(0) scale(1)',
            'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.12)',
          },
          '100%': {
            transform: 'translateY(-2px) scale(1.01)',
            'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        gentleRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(2deg)' },
        },
        softGlow: {
          '0%': {
            'box-shadow': '0 0 0 rgba(59, 130, 246, 0)',
          },
          '100%': {
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.3)',
          },
        },
        refinedFade: {
          '0%': {
            opacity: '0',
            transform: 'translateY(15px) scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        smoothSlide: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        elegantBounce: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3) translateY(30px)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05) translateY(-5px)',
          },
          '70%': {
            opacity: '1',
            transform: 'scale(0.98) translateY(2px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        sophisticatedBlur: {
          '0%': {
            opacity: '0',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          },
          '100%': {
            opacity: '1',
            filter: 'blur(0px)',
            transform: 'scale(1)',
          },
        },
        gpuFade: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 20px, 0) scale3d(0.95, 0.95, 1)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
          },
        },
        hardwareSlide: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(-30px, 0, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
        transform3dLift: {
          '0%': {
            transform: 'translate3d(0, 20px, -10px) rotateX(5deg)',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0) rotateX(0deg)',
          },
        },
      },
      opacity: {
        0: "0",
        15: "0.15",
        25: "0.25",
        50: "0.5",
        75: "0.75",
        100: "1",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "2rem",
        xl: "4rem",
        "2xl": "6rem",
        "3xl": "8rem",
        "4xl": "12rem",
      },
      padding: (theme) => ({
        ...theme("spacing"),
      }),
      margin: (theme) => ({
        ...theme("spacing"),
      }),
      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.75rem"],
        "2xl": ["1.5rem", "2rem"],
        "3xl": ["1.875rem", "2.25rem"],
        "4xl": ["2.25rem", "2.5rem"],
        "5xl": ["3rem", "1"],
        "6xl": ["3.75rem", "1"],
      },
      letterSpacing: {
        "tracking-tighter": "-0.0125rem",
        "tracking-tight": "-0.00625rem",
        "tracking-normal": "0rem",
        "tracking-wide": "0.0125rem",
        "tracking-wider": "0.03125rem",
        "tracking-widest": "0.0625rem",
      },
      fontWeight: {
        "font-normal": "400",
        "font-semi-bold": "600",
        "font-bold": "700",
      },
      outlineOffset: {
        "-1": "-1px",
        "-2": "-2px",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
        },
        screens: {
          xs: "100%",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
          fw: "100%",
        },
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
      },
      gridTemplateColumns: {
        "masonry-2": "repeat(2, minmax(0, 1fr))",
        "masonry-3": "repeat(3, minmax(0, 1fr))",
      },
      backgroundImage: {
        // Career highlight cards — light / dark pairs (Ansu palette from `colors`)
        "career-highlight-0": `linear-gradient(165deg, ${colors["royal-50"]} 0%, ${colors["royal-100"]}99 26%, ${colors["grey-light-50"]} 58%, ${colors.white} 100%)`,
        "career-highlight-0-dark": `linear-gradient(165deg, ${colors["grey-dark-100"]} 0%, ${colors["royal-900"]}4d 38%, ${colors["grey-dark-50"]} 100%)`,
        "career-highlight-1": `linear-gradient(165deg, ${colors["navy-50"]} 0%, ${colors["navy-100"]}b3 30%, ${colors["grey-light-50"]} 65%, ${colors.white} 100%)`,
        "career-highlight-1-dark": `linear-gradient(165deg, ${colors["grey-dark-100"]} 0%, ${colors["navy-900"]}52 40%, ${colors["grey-dark-50"]} 100%)`,
        "career-highlight-2": `linear-gradient(165deg, ${colors.violet[50]} 0%, ${colors.violet[100]}b3 28%, ${colors["grey-light-50"]} 62%, ${colors.white} 100%)`,
        "career-highlight-2-dark": `linear-gradient(165deg, ${colors["grey-dark-100"]} 0%, ${colors.violet[950]}66 36%, ${colors["grey-dark-50"]} 100%)`,
        "career-highlight-3": `linear-gradient(165deg, ${colors["mint-light-50"]} 0%, ${colors["mint-light-100"]}a6 32%, ${colors["grey-light-50"]} 64%, ${colors.white} 100%)`,
        "career-highlight-3-dark": `linear-gradient(165deg, ${colors["grey-dark-100"]} 0%, ${colors["mint-dark-500"]}38 42%, ${colors["grey-dark-50"]} 100%)`,
        "career-highlight-4": `linear-gradient(165deg, ${colors["orange-50"]} 0%, ${colors["orange-100"]}b3 30%, ${colors["grey-light-50"]} 63%, ${colors.white} 100%)`,
        "career-highlight-4-dark": `linear-gradient(165deg, ${colors["grey-dark-100"]} 0%, ${colors["orange-900"]}59 38%, ${colors["grey-dark-50"]} 100%)`,
        "career-highlight-5": `linear-gradient(165deg, ${colors["grey-light-100"]} 0%, ${colors["grey-light-50"]} 48%, ${colors.white} 100%)`,
        "career-highlight-5-dark": `linear-gradient(165deg, ${colors["grey-dark-200"]}33 0%, ${colors["grey-dark-100"]} 45%, ${colors["grey-dark-50"]} 100%)`,
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".masonry-cols-2": {
          "column-count": "2",
          "column-gap": "1.5rem",
          "column-fill": "balance",
        },
        ".masonry-cols-3": {
          "column-count": "3",
          "column-gap": "2rem",
          "column-fill": "balance",
        },
        ".break-inside-avoid": {
          "break-inside": "avoid",
        },
        ".masonry-gap-x-sm": {
          "column-gap": "1rem",
        },
        ".masonry-gap-x-md": {
          "column-gap": "1.5rem",
        },
        ".masonry-gap-x-lg": {
          "column-gap": "2rem",
        },
        ".masonry-gap-y-sm": {
          "margin-bottom": "1rem",
        },
        ".masonry-gap-y-md": {
          "margin-bottom": "1.5rem",
        },
        ".masonry-gap-y-lg": {
          "margin-bottom": "2rem",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities, {
        variants: ["responsive"],
      });
    },
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen md": {
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "1024px",
          },
          "@screen xl": {
            maxWidth: "1280px",
          },
          "@screen 2xl": {
            maxWidth: "1536px",
          },
        },
      });
    },
  ],
};
