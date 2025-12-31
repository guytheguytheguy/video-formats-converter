module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/website/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/website/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/website/lib/blog.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blogPosts",
    ()=>blogPosts,
    "getAllPosts",
    ()=>getAllPosts,
    "getPostBySlug",
    ()=>getPostBySlug
]);
const blogPosts = [
    {
        slug: 'how-to-convert-youtube-videos-for-tiktok',
        title: 'How to Convert YouTube Videos for TikTok',
        excerpt: 'Learn how to repurpose your YouTube content for TikTok by converting from 16:9 to 9:16 aspect ratio.',
        content: `
# How to Convert YouTube Videos for TikTok

If you're a content creator, you know that repurposing content across platforms is essential for maximizing reach. One of the most common conversions is taking your YouTube videos (16:9) and adapting them for TikTok (9:16).

## Why Aspect Ratio Matters

Different platforms have different optimal aspect ratios:

- **YouTube**: 16:9 (landscape/widescreen)
- **TikTok**: 9:16 (portrait/vertical)
- **Instagram Reels**: 9:16 (portrait)
- **Instagram Feed**: 1:1 (square) or 4:5 (portrait)

Posting a 16:9 video on TikTok means it will appear with large black bars, reducing visual impact and engagement.

## Step-by-Step Guide

### 1. Open VideoConvert

Launch the VideoConvert app and the web dashboard will open automatically.

### 2. Upload Your Video

Drag and drop your YouTube video file into the upload area.

### 3. Select 9:16 Aspect Ratio

Click on the 9:16 option to convert to TikTok's vertical format.

### 4. Choose Transform Mode

- **Fit**: Adds letterbox bars but preserves the entire video
- **Fill**: Crops the video to fill the frame (recommended for most content)
- **Stretch**: Distorts the video to fit (not recommended)

For most YouTube-to-TikTok conversions, **Fill** works best as it creates a full-screen vertical video.

### 5. Convert and Download

Click Convert and wait for processing. Your video is ready for TikTok!

## Pro Tips

1. **Plan for multiple formats**: When filming, keep the 9:16 safe zone in mind
2. **Use batch conversion**: VideoConvert Pro can convert multiple videos at once
3. **Maintain quality**: Use the High quality preset for final exports

## Conclusion

Converting your YouTube content for TikTok doesn't have to be complicated. With VideoConvert, you can repurpose your content in seconds, all without uploading to cloud services.
    `,
        date: '2024-01-15',
        category: 'tutorial',
        readTime: '5 min read',
        author: {
            name: 'VideoConvert Team',
            avatar: 'VC'
        }
    },
    {
        slug: 'understanding-video-aspect-ratios',
        title: 'Understanding Video Aspect Ratios: A Complete Guide',
        excerpt: 'Everything you need to know about video aspect ratios and when to use each one.',
        content: `
# Understanding Video Aspect Ratios: A Complete Guide

Aspect ratio is one of the most important concepts in video production. It determines how your video appears on different screens and platforms.

## What is Aspect Ratio?

Aspect ratio is the proportional relationship between a video's width and height. It's expressed as two numbers separated by a colon (e.g., 16:9).

## Common Aspect Ratios

### 16:9 (Widescreen)
The standard for:
- YouTube
- Television
- Desktop monitors
- Most digital cameras

### 9:16 (Vertical)
The standard for:
- TikTok
- Instagram Stories/Reels
- YouTube Shorts
- Snapchat

### 1:1 (Square)
Popular for:
- Instagram feed posts
- Facebook posts
- Twitter videos

### 4:5 (Portrait)
Used for:
- Instagram feed (optimized)
- Facebook feed

## Choosing the Right Aspect Ratio

Consider these factors:

1. **Platform requirements**: Each platform has optimal ratios
2. **Content type**: Landscapes work in 16:9, people in 9:16
3. **Viewing device**: Mobile viewers prefer vertical content

## Transform Modes Explained

When converting between aspect ratios, you have three options:

### Fit (Letterbox)
Preserves the entire video by adding bars. Best when you can't lose any content.

### Fill (Crop)
Crops the video to fill the new frame. Best for dynamic content with centered subjects.

### Stretch
Distorts the video to fit. Generally not recommended.

## Conclusion

Understanding aspect ratios helps you create content that looks great everywhere. Use VideoConvert to easily adapt your videos for any platform.
    `,
        date: '2024-01-10',
        category: 'tips',
        readTime: '7 min read',
        author: {
            name: 'VideoConvert Team',
            avatar: 'VC'
        }
    },
    {
        slug: 'why-local-video-processing-matters',
        title: 'Why Local Video Processing Matters for Privacy',
        excerpt: 'Learn why processing videos locally on your device is more secure than cloud-based alternatives.',
        content: `
# Why Local Video Processing Matters for Privacy

In an era of cloud services, it's easy to forget that uploading files means trusting third parties with your data. Here's why local video processing is the privacy-conscious choice.

## The Problem with Cloud Processing

When you upload a video to a cloud service:

1. **Your data leaves your control** - Files are stored on someone else's servers
2. **Processing happens remotely** - Your content is accessible to the service provider
3. **Terms of service** - Many services claim rights to use your content
4. **Data breaches** - Cloud services are prime targets for hackers
5. **Metadata collection** - Services often track usage patterns

## Benefits of Local Processing

### Complete Privacy
With VideoConvert, your videos never leave your device. Processing happens entirely on your computer using FFmpeg.

### No Upload Wait Times
Local processing is instant - no waiting for uploads and downloads.

### Works Offline
No internet connection required after installation.

### No File Size Limits
Process files of any size without upload restrictions.

### No Account Required
Use the app without creating an account or sharing personal information.

## How VideoConvert Protects Your Privacy

- **Zero cloud uploads**: All processing is local
- **No telemetry**: We don't track your usage
- **No account required**: Anonymous usage
- **Open architecture**: FFmpeg-based, verifiable processing
- **Offline capable**: Works without internet

## When Cloud Makes Sense

Cloud processing can be useful for:
- Collaboration with team members
- Access from multiple devices
- Mobile-only workflows

But for privacy-sensitive content, local processing is always the safer choice.

## Conclusion

Your videos contain personal and professional content that deserves protection. Local processing with VideoConvert ensures your content stays private.
    `,
        date: '2024-01-05',
        category: 'tips',
        readTime: '4 min read',
        author: {
            name: 'VideoConvert Team',
            avatar: 'VC'
        }
    }
];
function getPostBySlug(slug) {
    return blogPosts.find((post)=>post.slug === slug);
}
function getAllPosts() {
    return blogPosts.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
}
}),
"[project]/website/app/blog/[slug]/BlogPost.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlogPost",
    ()=>BlogPost
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const BlogPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call BlogPost() from the server but BlogPost is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/website/app/blog/[slug]/BlogPost.tsx <module evaluation>", "BlogPost");
}),
"[project]/website/app/blog/[slug]/BlogPost.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlogPost",
    ()=>BlogPost
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const BlogPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call BlogPost() from the server but BlogPost is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/website/app/blog/[slug]/BlogPost.tsx", "BlogPost");
}),
"[project]/website/app/blog/[slug]/BlogPost.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$blog$2f5b$slug$5d2f$BlogPost$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/website/app/blog/[slug]/BlogPost.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$blog$2f5b$slug$5d2f$BlogPost$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/website/app/blog/[slug]/BlogPost.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$blog$2f5b$slug$5d2f$BlogPost$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/website/app/blog/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogPostPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/website/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$blog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/lib/blog.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$blog$2f5b$slug$5d2f$BlogPost$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/website/app/blog/[slug]/BlogPost.tsx [app-rsc] (ecmascript)");
;
;
;
;
async function generateStaticParams() {
    const posts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$blog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllPosts"])();
    return posts.map((post)=>({
            slug: post.slug
        }));
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$blog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPostBySlug"])(slug);
    if (!post) {
        return {
            title: 'Post Not Found'
        };
    }
    return {
        title: post.title,
        description: post.excerpt
    };
}
async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$lib$2f$blog$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPostBySlug"])(slug);
    if (!post) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$website$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$website$2f$app$2f$blog$2f5b$slug$5d2f$BlogPost$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlogPost"], {
        post: post
    }, void 0, false, {
        fileName: "[project]/website/app/blog/[slug]/page.tsx",
        lineNumber: 41,
        columnNumber: 10
    }, this);
}
}),
"[project]/website/app/blog/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/website/app/blog/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00503bba._.js.map