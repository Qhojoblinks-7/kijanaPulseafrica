import React, { useEffect } from 'react';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  twitterHandle,
  facebookAppId,
  canonical,
  noindex = false,
  nofollow = false,
  children
}) => {
  const siteName = 'KijanaPulse Africa';
  const siteUrl = 'https://kijanapulseafrica.com';
  const defaultImage = '/og-image.jpg';
  const defaultDescription = 'Connect with Africa\'s brightest sports talents. Discover athletes, track performances, and build your sports career with KijanaPulse Africa.';
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;
  
  const robots = [];
  if (noindex) robots.push('noindex');
  if (nofollow) robots.push('nofollow');
  if (robots.length === 0) robots.push('index', 'follow');
  
  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || defaultDescription;
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }
    
    // Update Open Graph tags
    const updateMetaTag = (property, content) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };
    
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', description || defaultDescription);
    updateMetaTag('og:url', fullUrl);
    updateMetaTag('og:image', fullImage);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', siteName);
    
    // Update Twitter tags
    const updateTwitterTag = (name, content) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };
    
    updateTwitterTag('twitter:title', fullTitle);
    updateTwitterTag('twitter:description', description || defaultDescription);
    updateTwitterTag('twitter:image', fullImage);
    updateTwitterTag('twitter:card', 'summary_large_image');
    
    if (twitterHandle) {
      updateTwitterTag('twitter:site', twitterHandle);
      updateTwitterTag('twitter:creator', twitterHandle);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }
    
    // Update robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = robots.join(', ');
    
  }, [fullTitle, description, defaultDescription, keywords, fullUrl, fullImage, type, siteName, twitterHandle, canonical, robots]);
  
  return null; // This component doesn't render anything
};

// Predefined SEO configurations for common pages
export const SEOConfigs = {
  home: {
    title: 'Discover African Sports Talent',
    description: 'Connect with Africa\'s brightest sports talents. Discover athletes, track performances, and build your sports career with KijanaPulse Africa.',
    keywords: 'African sports, talent discovery, athlete profiles, sports management, football, basketball, athletics',
    url: '/'
  },
  about: {
    title: 'About Us',
    description: 'Learn about KijanaPulse Africa\'s mission to connect African sports talent with opportunities worldwide.',
    keywords: 'about KijanaPulse, African sports platform, talent discovery mission',
    url: '/about-us'
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with the KijanaPulse Africa team. We\'re here to help you succeed in your sports career.',
    keywords: 'contact KijanaPulse, sports support, athlete assistance',
    url: '/contact-us'
  },
  discover: {
    title: 'Discover Talent',
    description: 'Browse and discover talented African athletes across various sports disciplines.',
    keywords: 'discover athletes, African talent, sports profiles, athlete search',
    url: '/discover-talent'
  },
  profile: (athleteName) => ({
    title: `${athleteName} - Athlete Profile`,
    description: `View ${athleteName}'s complete athlete profile, statistics, and achievements on KijanaPulse Africa.`,
    keywords: `${athleteName}, athlete profile, sports statistics, African athlete`,
    url: `/athlete/${athleteName.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'profile'
  })
};

export default SEO;