export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  href: string;
  liveUrl?: string; // shows a second "Live Demo" link when set
  gradient: string; // tailwind gradient classes -- used as a fallback if image is unset
  image?: string; // real hero image, falls back to the gradient tile if omitted
  gallery?: { label: string; src: string }[]; // extra screenshots shown on the detail page
  roleHighlights?: { title: string; detail: string }[]; // structured "my role" breakdown
  codeSnippet: { language: string; code: string };
}

// Your real projects. Swap `href` to a live URL once one exists.
//
// NOTE on codeSnippet: these are short, illustrative snippets representative of the
// real approach/stack for each project (ONNX inference calls, ARCore hit-testing,
// MediaSession setup, etc.) -- written to be technically accurate to what's
// described, not pasted from the actual repo files. Send real snippets from your
// repos any time and I'll swap these for the genuine code.
export const projects: Project[] = [
  {
    slug: "clipgallery",
    title: "ClipGallery",
    category: "ON-DEVICE AI",
    description:
      "A native Android gallery app with fully on-device AI clustering using DINOv2 (ONNX INT8), semantic cluster naming via CLIP, and a 30-day recycle bin.",
    longDescription:
      "ClipGallery runs semantic photo clustering entirely on-device using a quantized DINOv2 model exported to ONNX INT8, so photos are grouped by visual similarity without any of the image data ever leaving the phone. Clusters get human-readable names via CLIP-based zero-shot classification against a label set, and the app includes a 30-day recycle bin so deletions are never immediately destructive.",
    tags: ["Kotlin", "ONNX", "DINOv2", "CLIP"],
    href: "https://github.com/saadUmmati/clip_gallery",
    gradient: "from-violet-600 via-fuchsia-500 to-sky-500",
    image: "/images/projects/clipgallery-hero.jpg",
    codeSnippet: {
      language: "kotlin",
      code: `// On-device embedding extraction via ONNX Runtime, used for clustering.
fun extractEmbedding(bitmap: Bitmap): FloatArray {
    val input = preprocessToTensor(bitmap, size = 224)
    val output = ortSession.run(mapOf("pixel_values" to input))
    return normalizeL2(output[0] as FloatArray)
}`,
    },
  },
  {
    slug: "e-wardrobe",
    title: "E-Wardrobe (Virtual Try-On)",
    category: "COMPUTER VISION",
    description:
      "A web-based virtual try-on system for fashion e-commerce (built for Shopify) that overlays garments onto a user's own photo using CatVTON, a diffusion-based model -- no AR glasses or live camera needed.",
    longDescription:
      "E-Wardrobe is a web-based Virtual Try-On (VTON) system for fashion e-commerce platforms, particularly Shopify. Instead of AR glasses or a live camera feed, it overlays a selected garment onto a pre-uploaded user photo using CatVTON, a diffusion-based model that spatially concatenates the garment and person images rather than relying on pose parsing or text conditioning. The stack is MERN (MongoDB, Express, React, Node) end to end, with the CatVTON pipeline exposed as its own service the backend calls.\n\nThe diffusion U-Net + VAE backbone runs at roughly 899M total parameters but only about 49.6M of those (the self-attention layers) were actually fine-tuned for the try-on task -- everything else stays frozen. That keeps training cost down and inference simple: no pose estimation, no parsing step, no text encoder, just the concatenated image inputs, running on 1024x768 images in under about 8GB of VRAM.",
    tags: ["MERN", "Computer Vision", "Diffusion Models"],
    href: "https://github.com/saadUmmati/E-wardrobe-fyp",
    gradient: "from-sky-500 via-cyan-400 to-emerald-400",
    image: "/images/projects/vton.jfif",
    roleHighlights: [
      {
        title: "AI Model Integration",
        detail:
          "Implemented the CatVTON U-Net + VAE using HuggingFace Diffusers, with custom self-attention tuning for the try-on task.",
      },
      {
        title: "DevOps & Deployment",
        detail:
          "Deployed a Gradio interface (app.py) and assembled a ComfyUI node; containerized the environment for Shopify integration.",
      },
      {
        title: "Evaluation & Metrics",
        detail:
          "Ran eval.py for quantitative results (FID, LPIPS), benchmarked CatVTON against baseline methods, and documented the performance gains.",
      },
      {
        title: "Full-Stack Orchestration",
        detail:
          "Connected the UI to the API to the AI pipeline to Shopify, logged metadata in MongoDB, and coordinated team tasks and code reviews.",
      },
    ],
    codeSnippet: {
      language: "python",
      code: `# CatVTON inference -- garment and person images are concatenated
# spatially, no pose parsing or text conditioning needed.
def generate_tryon(person_img: Image, garment_img: Image) -> Image:
    with torch.no_grad():
        result = catvton_pipeline(
            person=preprocess(person_img),
            garment=preprocess(garment_img),
        )
    return postprocess(result.images[0])`,
    },
  },
  {
    slug: "yolov8-helmet-detection",
    title: "YOLOv8 Helmet Detection",
    category: "COMPUTER VISION",
    description:
      "A custom-trained YOLOv8 model for real-time helmet detection, built for workplace safety monitoring use cases.",
    longDescription:
      "Trained a YOLOv8 object detection model on a custom-labeled dataset to identify workers wearing (or not wearing) safety helmets in real time. Built for workplace safety monitoring — the model runs on video feed frames and flags non-compliant frames for review, sized to run at real-time speed on standard hardware rather than requiring a GPU cluster.",
    tags: ["YOLOv8", "Python", "Computer Vision"],
    href: "https://github.com/saadUmmati/Helmet-Detection-in-CV",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    image: "/images/projects/helmet-detection-hero.jpg",
    codeSnippet: {
      language: "python",
      code: `model = YOLO("helmet_detection_best.pt")

def detect_helmets(frame):
    results = model.predict(frame, conf=0.5)[0]
    return [
        {"label": model.names[int(b.cls)], "confidence": float(b.conf)}
        for b in results.boxes
    ]`,
    },
  },
  {
    slug: "ar-measurement-app",
    title: "AR Measurement App",
    category: "ON-DEVICE AI",
    description:
      "Researched and planned a hybrid ARCore + Depth Anything V2 (ONNX) measurement app for Android — an iPhone Measure-app equivalent.",
    longDescription:
      "Researched and architected a hybrid measurement approach combining ARCore's plane-tracking and hit-testing with a quantized Depth Anything V2 model (exported to ONNX) for monocular depth estimation where ARCore's own depth data isn't available or reliable enough. The goal: an Android equivalent to iPhone's Measure app, usable on devices without a dedicated depth sensor.",
    tags: ["ARCore", "Depth Anything V2", "Android"],
    href: "https://github.com/saadummati",
    gradient: "from-indigo-600 via-violet-500 to-purple-500",
    image: "/images/projects/ar-measurement-hero.jpg",
    codeSnippet: {
      language: "kotlin",
      code: `// Hit-test a tapped point against detected AR planes to anchor it.
fun placeAnchorAt(x: Float, y: Float, frame: Frame): Anchor? {
    val hit = frame.hitTest(x, y).firstOrNull {
        it.trackable is Plane && (it.trackable as Plane).isPoseInPolygon(it.hitPose)
    }
    return hit?.let { session.createAnchor(it.hitPose) }
}`,
    },
  },
  {
    slug: "taskeen-music-player",
    title: "Taskeen Music Player",
    category: "MOBILE APP",
    description:
      "A complete Kotlin/XML music player with MediaSession, a foreground service, notification seekbar, and Glide-powered album art.",
    longDescription:
      "A full-featured Android music player built in Kotlin with a traditional XML view system. Playback runs through a foreground Service tied to a MediaSession, so controls stay available from the lock screen and notification shade with a live seekbar. Album art loads asynchronously via Glide, with graceful fallbacks for tracks missing embedded artwork.",
    tags: ["Kotlin", "XML", "MediaSession"],
    href: "https://github.com/saadUmmati/TaskeenMusicPlayer",
    gradient: "from-pink-500 via-rose-500 to-amber-400",
    image: "/images/projects/melodix-hero.jpg",
    gallery: [
      { label: "Now playing screen", src: "/images/projects/melodix-hero.jpg" },
      { label: "Player controls & seekbar", src: "/images/gallery/melodix-player-screen.jpg" },
    ],
    codeSnippet: {
      language: "kotlin",
      code: `// MediaSession callbacks so lock-screen controls drive the player.
private val callback = object : MediaSessionCompat.Callback() {
    override fun onPlay() {
        player.play()
        startForeground(NOTIFICATION_ID, buildNotification())
    }
    override fun onPause() = player.pause()
    override fun onSeekTo(pos: Long) = player.seekTo(pos)
}`,
    },
  },
  {
    slug: "ruhea-fragrances",
    title: "RUHEA Fragrances",
    category: "WEB & BACKEND",
    description:
      "A full-stack luxury fragrance e-commerce platform on Next.js 16 — MongoDB/Mongoose backend, NextAuth v5, Cloudinary image uploads, an admin panel with order/product management, and Three.js 3D product visuals.",
    longDescription:
      "A premium e-commerce platform for a luxury fragrance brand, built on Next.js 16's App Router with Server Components handling product catalog rendering for fast first paint. MongoDB via Mongoose backs the data layer, NextAuth v5 handles authentication (including OAuth), and an admin panel supports full product/order management. Three.js and React Three Fiber render 3D product visuals for select bottles.",
    tags: ["Next.js", "MongoDB", "Three.js", "NextAuth"],
    href: "https://github.com/saadUmmati/Ruhea_Scents_and_Fragrances_final",
    liveUrl: "https://ruheafragrances.vercel.app",
    gradient: "from-amber-300 via-yellow-200 to-orange-300",
    image: "/images/projects/ruhea-hero.jpg",
    codeSnippet: {
      language: "typescript",
      code: `const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  images: [{ url: String, publicId: String }], // Cloudinary refs
});

export const getProductBySlug = (slug: string) =>
  Product.findOne({ slug }).lean();`,
    },
  },
  {
    slug: "omnihub-android-app",
    title: "OmniHub",
    category: "MOBILE APP",
    description:
      "A multi-utility Android app with real-time weather, tech news, and contact management, built with Kotlin, MVVM, and a custom 'Spectral Intelligence' UI theme.",
    longDescription:
      "A multi-utility Android app combining real-time weather (OpenWeather API, with dynamic icons per condition), tech news headlines (NewsAPI) in a card layout, and on-device contact management, wrapped in an Obsidian Black & Electric Violet theme with edge-to-edge display and fluid ViewPager2 transitions.",
    tags: ["Kotlin", "MVVM", "Retrofit"],
    href: "https://github.com/saadUmmati/OmniHub-Android-App",
    gradient: "from-slate-700 via-violet-600 to-indigo-500",
    image: "/images/projects/omniHubApp2.jfif",
    codeSnippet: {
      language: "kotlin",
      code: `class WeatherViewModel(private val repo: WeatherRepository) : ViewModel() {
    private val _weather = MutableLiveData<WeatherUiState>()
    val weather: LiveData<WeatherUiState> = _weather

    fun loadWeather(lat: Double, lon: Double) = viewModelScope.launch {
        _weather.value = runCatching { repo.getCurrentWeather(lat, lon) }
            .fold(WeatherUiState::Success, WeatherUiState::Error)
    }
}`,
    },
  },
  {
    slug: "original-ars",
    title: "Arab Relocation Services",
    category: "WEB",
    description:
      "A marketing website for a UAE-based moving and relocation company -- built from scratch with vanilla HTML, CSS, and JavaScript.",
    longDescription:
      "A full marketing site for Arab Relocation Services, a Dubai-based moving company. Built with vanilla HTML, CSS, and JavaScript (no framework) -- a responsive hero section, an about section, a services grid covering residential, corporate, and specialty relocation, an instant-quote/estimation section, a project showcase, a blog section, and a newsletter signup, with a mobile nav drawer and WhatsApp click-to-call built in. No live demo is currently hosted for this one -- it's a client site delivered as source, not deployed under this repo.",
    tags: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/saadUmmati/Original-ARS",
    image: "/images/projects/Arab_Relocation_Services.jfif",
    gradient: "from-neutral-500 via-stone-500 to-neutral-400",
    codeSnippet: {
      language: "javascript",
      code: `// Mobile nav drawer toggle, shared by the open/close/overlay buttons.
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
navTogglers.forEach((btn) =>
  btn.addEventListener("click", () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  })
);`,
    },
  },
];
