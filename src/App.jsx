import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Services from './components/Services'
import Gallery from './components/Gallery'
import VideoGallery from './components/VideoGallery'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Services />
        <Gallery />
        <VideoGallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default App
