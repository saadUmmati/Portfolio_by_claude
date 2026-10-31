# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\baseline.spec.ts >> baseline /projects
- Location: tests\baseline.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://saadai.vercel.app/projects", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic: X 0.0000 · Y 0.0000
  - banner [ref=e7]:
    - generic [ref=e8]:
      - button "Muhammad Saad Ahmed menu" [ref=e9]:
        - generic:
          - img "Muhammad Saad Ahmed"
        - text: menu
      - generic [ref=e10]:
        - button "Toggle theme" [ref=e12]
        - link "Schedule a Call" [ref=e19]:
          - /url: /schedule
  - main [ref=e25]:
    - generic [ref=e26]:
      - heading "Projects" [level=1] [ref=e27]
      - paragraph [ref=e28]: 8 real projects spanning on-device AI, computer vision, mobile development, and full-stack web — each with a real code snippet and an AI walkthrough of how it works.
      - generic [ref=e29]:
        - link "Screenshot of ClipGallery, a on-device ai project ON-DEVICE AI ClipGallery A native Android gallery app with fully on-device AI clustering using DINOv2 (ONNX INT8), semantic cluster naming via CLIP, and a 30-day recycle bin. Kotlin ONNX DINOv2 View Project" [ref=e31]:
          - /url: /projects/clipgallery
          - img "Screenshot of ClipGallery, a on-device ai project" [ref=e33]
          - generic [ref=e34]:
            - generic [ref=e35]: ON-DEVICE AI
            - heading "ClipGallery" [level=3] [ref=e36]
            - paragraph [ref=e37]: A native Android gallery app with fully on-device AI clustering using DINOv2 (ONNX INT8), semantic cluster naming via CLIP, and a 30-day recycle bin.
            - generic [ref=e38]:
              - generic [ref=e39]: Kotlin
              - generic [ref=e40]: ONNX
              - generic [ref=e41]: DINOv2
            - generic [ref=e42]: View Project
        - link "Screenshot of E-Wardrobe (Virtual Try-On), a computer vision project COMPUTER VISION E-Wardrobe (Virtual Try-On) A web-based virtual try-on system for fashion e-commerce (built for Shopify) that overlays garments onto a user's own photo using CatVTON, a diffusion-based model -- no AR glasses or live camera needed. MERN Computer Vision Diffusion Models View Project" [ref=e47]:
          - /url: /projects/e-wardrobe
          - img "Screenshot of E-Wardrobe (Virtual Try-On), a computer vision project" [ref=e49]
          - generic [ref=e50]:
            - generic [ref=e51]: COMPUTER VISION
            - heading "E-Wardrobe (Virtual Try-On)" [level=3] [ref=e52]
            - paragraph [ref=e53]: A web-based virtual try-on system for fashion e-commerce (built for Shopify) that overlays garments onto a user's own photo using CatVTON, a diffusion-based model -- no AR glasses or live camera needed.
            - generic [ref=e54]:
              - generic [ref=e55]: MERN
              - generic [ref=e56]: Computer Vision
              - generic [ref=e57]: Diffusion Models
            - generic [ref=e58]: View Project
        - link "Screenshot of YOLOv8 Helmet Detection, a computer vision project COMPUTER VISION YOLOv8 Helmet Detection A custom-trained YOLOv8 model for real-time helmet detection, built for workplace safety monitoring use cases. YOLOv8 Python Computer Vision View Project" [ref=e63]:
          - /url: /projects/yolov8-helmet-detection
          - img "Screenshot of YOLOv8 Helmet Detection, a computer vision project" [ref=e65]
          - generic [ref=e66]:
            - generic [ref=e67]: COMPUTER VISION
            - heading "YOLOv8 Helmet Detection" [level=3] [ref=e68]
            - paragraph [ref=e69]: A custom-trained YOLOv8 model for real-time helmet detection, built for workplace safety monitoring use cases.
            - generic [ref=e70]:
              - generic [ref=e71]: YOLOv8
              - generic [ref=e72]: Python
              - generic [ref=e73]: Computer Vision
            - generic [ref=e74]: View Project
        - link "Screenshot of AR Measurement App, a on-device ai project ON-DEVICE AI AR Measurement App Researched and planned a hybrid ARCore + Depth Anything V2 (ONNX) measurement app for Android — an iPhone Measure-app equivalent. ARCore Depth Anything V2 Android View Project" [ref=e79]:
          - /url: /projects/ar-measurement-app
          - img "Screenshot of AR Measurement App, a on-device ai project" [ref=e81]
          - generic [ref=e82]:
            - generic [ref=e83]: ON-DEVICE AI
            - heading "AR Measurement App" [level=3] [ref=e84]
            - paragraph [ref=e85]: Researched and planned a hybrid ARCore + Depth Anything V2 (ONNX) measurement app for Android — an iPhone Measure-app equivalent.
            - generic [ref=e86]:
              - generic [ref=e87]: ARCore
              - generic [ref=e88]: Depth Anything V2
              - generic [ref=e89]: Android
            - generic [ref=e90]: View Project
        - link "Screenshot of Taskeen Music Player, a mobile app project MOBILE APP Taskeen Music Player A complete Kotlin/XML music player with MediaSession, a foreground service, notification seekbar, and Glide-powered album art. Kotlin XML MediaSession View Project" [ref=e95]:
          - /url: /projects/taskeen-music-player
          - img "Screenshot of Taskeen Music Player, a mobile app project" [ref=e97]
          - generic [ref=e98]:
            - generic [ref=e99]: MOBILE APP
            - heading "Taskeen Music Player" [level=3] [ref=e100]
            - paragraph [ref=e101]: A complete Kotlin/XML music player with MediaSession, a foreground service, notification seekbar, and Glide-powered album art.
            - generic [ref=e102]:
              - generic [ref=e103]: Kotlin
              - generic [ref=e104]: XML
              - generic [ref=e105]: MediaSession
            - generic [ref=e106]: View Project
        - link "Screenshot of RUHEA Fragrances, a web & backend project WEB & BACKEND RUHEA Fragrances A full-stack luxury fragrance e-commerce platform on Next.js 16 — MongoDB/Mongoose backend, NextAuth v5, Cloudinary image uploads, an admin panel with order/product management, and Three.js 3D product visuals. Next.js MongoDB Three.js View Project" [ref=e111]:
          - /url: /projects/ruhea-fragrances
          - img "Screenshot of RUHEA Fragrances, a web & backend project" [ref=e113]
          - generic [ref=e114]:
            - generic [ref=e115]: WEB & BACKEND
            - heading "RUHEA Fragrances" [level=3] [ref=e116]
            - paragraph [ref=e117]: A full-stack luxury fragrance e-commerce platform on Next.js 16 — MongoDB/Mongoose backend, NextAuth v5, Cloudinary image uploads, an admin panel with order/product management, and Three.js 3D product visuals.
            - generic [ref=e118]:
              - generic [ref=e119]: Next.js
              - generic [ref=e120]: MongoDB
              - generic [ref=e121]: Three.js
            - generic [ref=e122]: View Project
        - link "Screenshot of OmniHub, a mobile app project MOBILE APP OmniHub A multi-utility Android app with real-time weather, tech news, and contact management, built with Kotlin, MVVM, and a custom 'Spectral Intelligence' UI theme. Kotlin MVVM Retrofit View Project" [ref=e127]:
          - /url: /projects/omnihub-android-app
          - img "Screenshot of OmniHub, a mobile app project" [ref=e129]
          - generic [ref=e130]:
            - generic [ref=e131]: MOBILE APP
            - heading "OmniHub" [level=3] [ref=e132]
            - paragraph [ref=e133]: A multi-utility Android app with real-time weather, tech news, and contact management, built with Kotlin, MVVM, and a custom 'Spectral Intelligence' UI theme.
            - generic [ref=e134]:
              - generic [ref=e135]: Kotlin
              - generic [ref=e136]: MVVM
              - generic [ref=e137]: Retrofit
            - generic [ref=e138]: View Project
        - link "Screenshot of Arab Relocation Services, a web project WEB Arab Relocation Services A marketing website for a UAE-based moving and relocation company -- built from scratch with vanilla HTML, CSS, and JavaScript. HTML CSS JavaScript View Project" [ref=e143]:
          - /url: /projects/original-ars
          - img "Screenshot of Arab Relocation Services, a web project" [ref=e145]
          - generic [ref=e146]:
            - generic [ref=e147]: WEB
            - heading "Arab Relocation Services" [level=3] [ref=e148]
            - paragraph [ref=e149]: A marketing website for a UAE-based moving and relocation company -- built from scratch with vanilla HTML, CSS, and JavaScript.
            - generic [ref=e150]:
              - generic [ref=e151]: HTML
              - generic [ref=e152]: CSS
              - generic [ref=e153]: JavaScript
            - generic [ref=e154]: View Project
      - generic [ref=e158]:
        - paragraph [ref=e159]: More projects and experiments live on GitHub.
        - link "github.com/saadummati" [ref=e160]:
          - /url: https://github.com/saadummati
  - contentinfo [ref=e164]:
    - generic [aria-hidden]: SAAD AHMED
    - generic [ref=e167]:
      - generic [ref=e169]:
        - generic [ref=e170]:
          - paragraph [ref=e171]: Stay in the loop
          - heading "Get updates on AI, on-device engineering & freelancing" [level=3] [ref=e175]
          - paragraph [ref=e176]: Follow along on LinkedIn — no spam, just real work and lessons learned.
        - link "Follow on LinkedIn" [ref=e177]:
          - /url: https://www.linkedin.com/company/saad-tech-works
      - generic [ref=e183]:
        - generic [ref=e184]:
          - generic [ref=e185]:
            - img "Muhammad Saad Ahmed" [ref=e187]
            - generic [ref=e188]: Muhammad Saad Ahmed
          - paragraph [ref=e189]: I build on-device AI, LLM-powered agents, and automation systems — from Android apps with real-time ML clustering to AI-powered products shipped end to end.
          - generic [ref=e190]:
            - link [ref=e191]:
              - /url: mailto:msaadisiddiqui@gmail.com
            - paragraph [ref=e196]: Wah Cantt, Pakistan
        - generic [ref=e201]:
          - heading "Explore" [level=3] [ref=e202]
          - list [ref=e203]:
            - listitem [ref=e204]:
              - link "Home" [ref=e205]:
                - /url: /
            - listitem [ref=e206]:
              - link "About Me" [ref=e207]:
                - /url: /#about
            - listitem [ref=e208]:
              - link "Services" [ref=e209]:
                - /url: /services
            - listitem [ref=e210]:
              - link "Projects" [ref=e211]:
                - /url: /projects
            - listitem [ref=e212]:
              - link "Experience" [ref=e213]:
                - /url: /#experience
            - listitem [ref=e214]:
              - link "Blog" [ref=e215]:
                - /url: /blog
        - generic [ref=e216]:
          - heading "More" [level=3] [ref=e217]
          - list [ref=e218]:
            - listitem [ref=e219]:
              - link "Testimonials" [ref=e220]:
                - /url: /testimonials
            - listitem [ref=e221]:
              - link "Schedule a Call" [ref=e222]:
                - /url: /schedule
            - listitem [ref=e223]:
              - link "FAQ" [ref=e224]:
                - /url: /#faq
            - listitem [ref=e225]:
              - link "All Links" [ref=e226]:
                - /url: /links
        - generic [ref=e227]:
          - heading "Contact" [level=3] [ref=e228]
          - list [ref=e229]:
            - listitem [ref=e230]:
              - link "Email" [ref=e231]:
                - /url: mailto:msaadisiddiqui@gmail.com
            - listitem [ref=e232]:
              - link "WhatsApp" [ref=e233]:
                - /url: https://wa.me/923125696938
            - listitem [ref=e234]:
              - link "LinkedIn" [ref=e235]:
                - /url: https://www.linkedin.com/in/muhammadsaadahmed/
            - listitem [ref=e236]:
              - link "GitHub" [ref=e237]:
                - /url: https://github.com/saadummati
      - generic [ref=e239]:
        - generic [ref=e240]:
          - generic [ref=e241]: "Follow me:"
          - link "LinkedIn" [ref=e242]:
            - /url: https://www.linkedin.com/in/muhammadsaadahmed/
          - link "GitHub" [ref=e245]:
            - /url: https://github.com/saadummati
        - paragraph [ref=e248]: © 2026 Muhammad Saad Ahmed. All rights reserved.
        - link "Back to top" [ref=e249]:
          - /url: "#top"
  - button "Contact options" [ref=e253]
  - alert [ref=e256]
```

# Test source

```ts
  1 | import { test } from "@playwright/test";
  2 | const routes = ["/", "/services", "/projects", "/blog", "/testimonials", "/schedule", "/chat", "/links"];
  3 | for (const r of routes) {
  4 |   test(`baseline ${r}`, async ({ page }) => {
  5 |     await page.setViewportSize({ width: 1440, height: 900 });
> 6 |     await page.goto("https://saadai.vercel.app" + r, { waitUntil: "networkidle" });
    |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  7 |     await page.screenshot({ path: `docs/baseline/${r === "/" ? "home" : r.slice(1)}.png`, fullPage: true });
  8 |   });
  9 | }
```