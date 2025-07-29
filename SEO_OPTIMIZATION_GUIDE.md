# SEO Optimization Guide for Sabraman.ru

## Target Keywords
- **Primary**: "sabraman", "danya yudin", "даня юдин", "картон"
- **Secondary**: "creative designer", "developer", "telegram bot developer", "UI/UX designer"

## Implemented SEO Optimizations

### 1. Technical SEO
- ✅ **robots.txt** - Created with proper directives for Google, Yandex, and Bing
- ✅ **sitemap.xml** - Comprehensive sitemap with all pages and proper priorities
- ✅ **Web App Manifest** - PWA support for better mobile SEO
- ✅ **Structured Data** - JSON-LD schema markup for Person and Website
- ✅ **Meta Tags** - Comprehensive Open Graph, Twitter Cards, and meta descriptions

### 2. Content Optimization
- ✅ **Target Keywords Integration** - Naturally integrated into content
- ✅ **Multilingual Support** - Russian and English keywords
- ✅ **Hidden SEO Content** - Screen reader accessible content for search engines
- ✅ **Page-Specific Metadata** - Unique titles and descriptions for each page

### 3. Performance Optimizations
- ✅ **Next.js Config** - Image optimization and performance headers
- ✅ **Security Headers** - XSS protection and content type options
- ✅ **Redirects** - SEO-friendly URL structure

### 4. Yandex-Specific Optimizations
Based on [Yandex SEO research](https://www.linguana.io/blog/search-engine-optimization-yandex), we've implemented:

- ✅ **Yandex-specific robots.txt directives** - Crawl delay for YandexBot
- ✅ **Russian language content** - "даня юдин" and "картон" keywords
- ✅ **Local targeting** - Saint Petersburg, Russia location data
- ✅ **Mobile optimization** - Responsive design and PWA support

## Next Steps for Maximum SEO Impact

### 1. Search Console Setup
```bash
# Add these verification codes to layout.tsx metadata.verification
google: "your-google-verification-code"
yandex: "your-yandex-verification-code"
```

### 2. Favicon & OG Image Generation

#### Favicon Generation
The favicons have been generated from your logo.svg using the favicons library:

```bash
# Generate favicons from logo.svg
pnpm generate-favicons
```

This creates all necessary favicon files including:
- Multiple favicon sizes (16x16, 32x32, 48x48)
- Apple touch icons for all iOS devices
- Android chrome icons
- Windows tile icons
- Yandex browser icons
- Startup images for iOS devices

The favicon generation script is located at `scripts/generate-favicons.mjs` and can be run anytime you update your logo.

#### Dynamic OG Images with Vercel/OG
Dynamic Open Graph images are generated using Vercel/OG at `/api/og`:

- **URL**: `https://sabraman.ru/api/og`
- **With parameters**: `https://sabraman.ru/api/og?title=Custom Title&subtitle=Custom Subtitle`
- **Default**: Shows "Danya Yudin (Даня Юдин) - Sabraman" with "Creative Designer & Early-Stage Developer"

Features:
- Uses your logo SVG embedded in the image
- Custom Montserrat font loading
- Dynamic title and subtitle parameters
- Professional dark theme with accent colors
- Responsive design for social media platforms

### 3. Content Strategy
- **Blog Posts**: Create content about design, development, and Telegram bots
- **Case Studies**: Detailed project write-ups for Vaparshop and Horny Place
- **Local SEO**: Add more Saint Petersburg and Russia-specific content

### 4. Link Building
- Submit to design and development directories
- Guest post on relevant blogs
- Share projects on platforms like Dribbble, Behance, GitHub

### 5. Monitoring
- Set up Google Search Console
- Set up Yandex Webmaster Tools
- Monitor keyword rankings for target terms

## Yandex-Specific Tips

According to the research, Yandex considers:
- **User signals** (19% of ranking weight)
- **Content quality** (6% of ranking weight)
- **Backlinks** (6% of ranking weight)
- **Advertising activity** as a positive signal (unlike Google)

### Yandex.Metrica Integration
Consider adding Yandex.Metrica for better analytics:
```html
<!-- Yandex.Metrica code -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(YOUR_COUNTER_ID, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});
</script>
```

## Expected Results

With these optimizations, you should see:
1. **Improved rankings** for "sabraman", "danya yudin", "даня юдин", "картон"
2. **Better visibility** in both Google and Yandex
3. **Increased organic traffic** from Russian-speaking regions
4. **Enhanced mobile experience** with PWA capabilities

## Maintenance

- Update sitemap.xml monthly
- Monitor search console for issues
- Add new content regularly
- Keep structured data up to date
- Test page speed regularly

## Tools for Monitoring

1. **Google Search Console** - Track rankings and performance
2. **Yandex Webmaster Tools** - Monitor Yandex-specific metrics
3. **PageSpeed Insights** - Optimize performance
4. **Schema.org Validator** - Verify structured data
5. **Rich Results Test** - Check rich snippet eligibility 