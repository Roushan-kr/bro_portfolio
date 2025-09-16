import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Film,
  Palette,
  Share2,
  Linkedin,
  Instagram,
  Phone
} from 'lucide-react';
import CloudCard from './utils/ui/CloudCard';

function App() {
  const [cloudCardsData, setCloudCardsData] = useState({
    generalPics: [],
    reelsFiles: [],
    videoFiles: []
  });

  useEffect(() => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Fetch Cloudinary results from public folder
    fetch('/uploadResults.json')
      .then(res => res.json())
      .then(data => setCloudCardsData(data))
      .catch(() => setCloudCardsData({ generalPics: [], reelsFiles: [], videoFiles: [] }));
  }, []);

  // Helper to render a section
  const renderCloudSection = (title, arr) => (
    arr.length > 0 && (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-sky-400 mb-6">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {arr.map(item => (
            <CloudCard
              key={item?.public_id}
              url={item?.secure_url}
              type={item?.resource_type}
              public_id={item?.public_id}
              format={item?.format}
              width={item?.width}
              height={item?.height}
              created_at={item?.created_at}
              original_filename={item?.original_filename}
            />
          ))}
        </div>
      </div>
    )
  );

  return (
    <>
      {/* Header & Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold gradient-text">Mustak.</a>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-300 hover:text-sky-400 transition-colors">About</a>
            <a href="#skills" className="text-gray-300 hover:text-sky-400 transition-colors">Skills</a>
            <a href="#portfolio" className="text-gray-300 hover:text-sky-400 transition-colors">Portfolio</a>
            <a href="#experience" className="text-gray-300 hover:text-sky-400 transition-colors">Experience</a>
            <a href="#contact" className="text-gray-300 hover:text-sky-400 transition-colors">Contact</a>
          </nav>
          <a href="mailto:mdmustak01@icloud.com" className="hidden md:inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Get In Touch
          </a>
        </div>
      </header>

      <main className="pt-24 font-inter">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center bg-cover bg-center" style={{
          backgroundImage: "linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 1)), url('https://placehold.co/1920x1080/111827/334155?text=Visual+Background')"
        }}>
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Md Mustak Alam
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-light gradient-text">
              Video Editor, Photographer & Poster Designer
            </p>
            <p className="mt-6 max-w-3xl mx-auto text-gray-300">
              Creative and detail-oriented visual storyteller with a passion for producing engaging, high-quality content. Let's create something amazing together.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <a href="#portfolio" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
                View My Work
              </a>
              <a href="#contact" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
                Contact Me
              </a>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 section-title">About Me</h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3">
                <img src="https://placehold.co/600x600/1F2937/E5E7EB?text=Mustak" alt="Md Mustak Alam" className="rounded-full shadow-lg border-4 border-sky-500" />
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-gray-300 mb-4">
                  I am a creative and detail-oriented Video Editor and Poster Designer with extensive experience in professional editing tools and social media content creation. My background in Computer Science Engineering gives me a unique blend of technical knowledge and creative skill, allowing me to produce visually compelling and high-quality content.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  I thrive on bringing ideas to life, whether it's through cinematic video edits, engaging social media reels, or eye-catching poster designs. With experience managing media for brands like GeeksforGeeks and a portfolio of over 100+ freelance projects, I am adept at understanding a client's vision and delivering polished, impactful results.
                </p>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-8 h-8" />
                  <p>Jalandhar, Punjab</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 section-title">My Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Video Editing Card */}
              <div className="skill-card p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <Film className="text-sky-400 w-10 h-10" />
                  <h3 className="ml-4 text-2xl font-semibold text-white">Video Editing</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Final Cut Pro</li>
                  <li>DaVinci Resolve</li>
                  <li>Adobe Premiere Pro</li>
                  <li>CapCut, VN Editor, KineMaster</li>
                  <li>Color Grading & Sound Design</li>
                  <li>Cinematic Storytelling</li>
                </ul>
              </div>
              {/* Design & Posters Card */}
              <div className="skill-card p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <Palette className="text-sky-400 w-10 h-10" />
                  <h3 className="ml-4 text-2xl font-semibold text-white">Design & Posters</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Canva</li>
                  <li>Adobe Photoshop (Basic)</li>
                  <li>Social Media Posters</li>
                  <li>Thumbnails & Creatives</li>
                  <li>Brand Guideline Adherence</li>
                </ul>
              </div>
              {/* Content & Media Card */}
              <div className="skill-card p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <Share2 className="text-sky-400 w-10 h-10" />
                  <h3 className="ml-4 text-2xl font-semibold text-white">Content & Media</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Reels/Shorts Creation</li>
                  <li>Content Strategy & Scheduling</li>
                  <li>Engagement Analytics</li>
                  <li>Client Communication</li>
                  <li>Freelancing Workflows</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 section-title">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <div className="project-card rounded-lg overflow-hidden group">
                <img src="https://placehold.co/600x400/111827/38bdf8?text=Cinematic+Edit" alt="Cinematic Video Edit" className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Cinematic Video Edits</h3>
                  <p className="text-gray-400">Short films featuring advanced transitions, professional color grading, and immersive sound design to create a cinematic look and feel.</p>
                </div>
              </div>
              {/* Project 2 */}
              <div className="project-card rounded-lg overflow-hidden group">
                <img src="https://placehold.co/600x400/111827/38bdf8?text=Event+Poster" alt="Event Poster" className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Event Posters & Creatives</h3>
                  <p className="text-gray-400">Designed a variety of posters and promotional graphics for college events and campaigns for GeeksforGeeks, following brand guidelines.</p>
                </div>
              </div>
              {/* Project 3 */}
              <div className="project-card rounded-lg overflow-hidden group">
                <img src="https://placehold.co/600x400/111827/38bdf8?text=Social+Campaign" alt="Social Media Campaign" className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Social Media Campaigns</h3>
                  <p className="text-gray-400">Created complete content bundles including videos, posters, and thumbnails that significantly increased engagement and reach on social platforms.</p>
                </div>
              </div>
              {/* Project 4 */}
              <div className="project-card rounded-lg overflow-hidden group">
                <img src="https://placehold.co/600x400/111827/818cf8?text=Portrait+Photo" alt="Portrait Photography" className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Portrait Photography</h3>
                  <p className="text-gray-400">Capturing compelling portraits that highlight the subject's personality and character through expert lighting and composition.</p>
                </div>
              </div>
              {/* Project 5 */}
              <div className="project-card rounded-lg overflow-hidden group">
                <img src="https://placehold.co/600x400/111827/818cf8?text=Event+Photo" alt="Event Photography" className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Event Photography</h3>
                  <p className="text-gray-400">Documenting live events, from corporate functions to personal celebrations, preserving key moments with a dynamic, candid style.</p>
                </div>
              </div>
              {/* Project 6 */}
              <div className="project-card rounded-lg overflow-hidden group">
                <img src="https://placehold.co/600x400/111827/818cf8?text=Product+Photo" alt="Product Photography" className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Product Photography</h3>
                  <p className="text-gray-400">Creating clean, crisp, and appealing product shots for e-commerce and advertising that drive sales and build brand image.</p>
                </div>
              </div>
              {/* Cloudinary sections */}
              {renderCloudSection('General Pictures', cloudCardsData.generalPics)}
              {renderCloudSection('Reels Files', cloudCardsData.reelsFiles)}
              {renderCloudSection('Video Files', cloudCardsData.videoFiles)}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 section-title">Experience</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Experience 1 */}
              <div className="experience-card p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-sky-400">Media Manager</h3>
                    <p className="text-white">GeeksforGeeks</p>
                  </div>
                  <span className="text-gray-400 text-sm">March 2025 - Present</span>
                </div>
                <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
                  <li>Created and managed video and poster content for social platforms.</li>
                  <li>Designed promotional posters, event creatives, and campaign visuals.</li>
                  <li>Improved engagement through better storytelling and consistent posting.</li>
                </ul>
              </div>
              {/* Experience 2 */}
              <div className="experience-card p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-sky-400">Video Editor & Designer</h3>
                    <p className="text-white">Freelance & Personal Projects</p>
                  </div>
                  <span className="text-gray-400 text-sm">2021 - Present</span>
                </div>
                <ul className="mt-4 list-disc list-inside text-gray-300 space-y-2">
                  <li>Edited 100+ videos (shorts, reels, and long-form) on MacBook.</li>
                  <li>Designed posters and social media assets for various clients.</li>
                  <li>Managed end-to-end project delivery from brief to final asset.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4 section-title">Let's Connect</h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
              I'm currently available for freelance projects and new opportunities. If you have a project in mind or just want to say hello, feel free to reach out!
            </p>
            <a href="mailto:mdmustak01@icloud.com" className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg py-3 px-8 rounded-lg transition-transform transform hover:scale-105 mb-10">
              mdmustak01@icloud.com
            </a>
            <div className="flex justify-center space-x-6">
              <a href="https://linkedin.com/in/md-mustak-alam-b3129129a" target="_blank" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Linkedin className="w-8 h-8" />
              </a>
              <a href="https://instagram.com/iammushtaq_07" target="_blank" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Instagram className="w-8 h-8" />
              </a>
              <a href="tel:7484962276" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Phone className="w-8 h-8" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-6 py-6 text-center text-gray-400">
          <p>&copy; 2025 Md Mustak Alam. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
