import { useState } from 'react';
import YouTube from 'react-youtube';
import './StarknetEs.css';

interface Resource {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

const StarknetEs = () => {
  const videoIds = ['4D11ejpK0iQ', 'istF-lBqiXk', 'L0dX2vohHq0', 'dBPYL6SY4jk', 'T-h41OMx2xo', '9Ku3rI0stYM', 'dXRH0XNmnKQ', 'iQkoyzPtrTk', 'n8jMybcp-Mg', 'm-oqwRtip7c', 'YynOvpIHv08', 'dAfpkcYzDyE', 'Gm84xwNN640'];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const onReady = () => {};

  const onPlay = () => {};

  const onPause = () => {};

  const opts = {
    width: '525',
    height: '295',
    playerVars: {
      autoplay: 0,
    },
  };

  const goToPreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videoIds.length - 1 : prevIndex - 1));
  };

  const goToNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === videoIds.length - 1 ? 0 : prevIndex + 1));
  };

  const resources: Resource[] = [
    {
      id: "1",
      image: "../StarknetBook.png",
      title: "Starknet Book",
      description: "El libro de todo el ecosistema de Starknet, una documentación exhaustiva de arquitectura, y Starknet general, Starknet Book",
      link: "https://book.starknet.io/",
    },
    {
      id: "2",
      image: "../CairoBook.png",
      title: "Cairo Book",
      description: "Descubre el libro de Aprendizaje sobre el Lenguaje de Programación Cairo y domina su sintaxis.",
      link: "https://cairo-book.github.io/",
    },
    {
      id: "3",
      image: "../StarknetDoc.png",
      title: "Starknet Doc",
      description: "Documentos oficiales en General de Starknet",
      link: "https://docs.starknet.io/documentation/",
    },


    {
      id: "4",
      image: "../CairoDoc.png",
      title: "Cairo Doc",
      description: "Documentos oficiales en General de Cairo",
      link: "https://www.cairo-lang.org/docs/",
    },
  ];
  
  const openResourceDetails = (resource: Resource) => {
    setSelectedResource(resource);
  };

  return (
    <div className="starknet-es-container">
      <div className="starknet-es-title text-4xl shadowed mb-5"> 📺 Starknet en Español</div>
      <div className="starknet-es-video-grid">
        <div className="starknet-es-video-item">
          <YouTube videoId={videoIds[currentVideoIndex]} opts={opts} onReady={onReady} onPlay={onPlay} onPause={onPause} />
        </div>
        <div className="starknet-es-video-item">
          <YouTube videoId={videoIds[(currentVideoIndex + 1) % videoIds.length]} opts={opts} onReady={onReady} onPlay={onPlay} onPause={onPause} />
        </div>
      </div>
      <div className="starknet-es-navigation">
        <button className="starknet-es-button starknet-es-previous-button" onClick={goToPreviousVideo}>
          Anterior
        </button>
        <button className="starknet-es-button starknet-es-next-button" onClick={goToNextVideo}>
          Siguiente
        </button>
      </div>
   
      <div className="starknet-es-resource-container">
        <div className="starknet-es-resource-title text-4xl shadowed mb-5">📖 Recursos Starknet</div>
        <div className="starknet-es-resource-grid">
          {resources.map((resource) => (
            <div className="starknet-es-resource-card" key={resource.id} onClick={() => openResourceDetails(resource)}>
              <img src={resource.image} alt={resource.title} className="starknet-es-resource-image" />
              <div className={`starknet-es-resource-details ${selectedResource === resource ? 'starknet-es-resource-card-selected' : ''}`}>
                <div className="starknet-es-resource-title">{resource.title}</div>
                <div className="starknet-es-resource-description">{resource.description}</div>
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="starknet-es-resource-link">
                  Ver más
                </a>
              </div>
            </div>
          ))}
        </div>
        {selectedResource && (
          <div className="starknet-es-resource-details-overlay" onClick={() => setSelectedResource(null)}>
            <div className="starknet-es-resource-details-container">
              <div className="starknet-es-resource-details-title">{selectedResource.title}</div>
              <div className="starknet-es-resource-details-description">{selectedResource.description}</div>
              <a href={selectedResource.link} target="_blank" rel="noopener noreferrer" className="starknet-es-resource-details-link">
                Ver más
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarknetEs;
