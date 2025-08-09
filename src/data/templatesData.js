// a simple array of template objects
import basic1 from '../assets/Basic-Template-min.png';
import multi1 from '../assets/multi-template.png';
import smb1 from '../assets/smb-1.png';

export const templatesData = [
  {
    id: 'basic',
    name: 'Basic Single-Page',
    description: 'Simple single page React application, mobile responsive, perfect for event or photo sites. This is the easiest way to get your site up and out there. Includes an About, Event Grid, Photo Grid, and Subscribe section. **Brand colors (primary and accent) can be made in one location for the entire site',
    thumbnail: basic1,
    detailUrl: '/basictemplate',
    price: '$49',
  },
  {
    id: 'blog',
    name: 'Simple Multi-Page',
    description: 'Slightly more robust version of the basic template - with multi-page functionality (including About, Contact, Solutions, Blog), and components for photo grid, product cards, testimonials and more. **Brand colors (primary and accent) can be made in one location for the entire site',
    thumbnail: multi1,
    detailUrl: '/simpletemplate',
    price: '$69',
  },
  {
    id: 'agency',
    name: 'Small Business Site',
    description: 'Perfect starter template for a small business to establish their prescence quickly and easily. Includes standard pages (About, Services, Contact, Portfolio) as well as components to add product cards, pricing details, gallery, blog posts and more.',
    thumbnail: smb1,
    detailUrl: '/smallbusinesstemplate',
    price: '$99',
  },
  // …add more templates as needed…
];
