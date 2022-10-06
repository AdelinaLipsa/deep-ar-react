import { useEffect, useState } from "react";
import { DeepAR } from 'deepar';
import deeparWasm from 'deepar/wasm/deepar.wasm';

const Modal = (props) => {
  let deepAR;
  const [fullScreen, setFullScreen] = useState(false);
  // product color variations
  const colors = props.product.Variations;
  // modal css interaction
  const overlay = document.querySelector(".overlay");

  const handleModal = () => {
    // overlay.classList.remove("hidden");
    // deepAR.stopVideo();
    return props.hideModal;
  };

  // DeepAR API
  /*@TODO:change license key*/
  useEffect(() => {
    return () => {
      deepAR = new DeepAR({
        licenseKey: '6fda241c565744899d3ea574dc08a18ce3860d219aeb6de4b2d23437d7b6dcfcd79941dffe0e57f0',
        libPath: './lib',
        segmentationInfoZip: 'segmentation.zip',
        deeparWasmPath: deeparWasm,
        canvas: document.querySelector('#deepar-canvas'),
        numberOfFaces: 1, // how many faces we want to track min 1, max 4
        callbacks: {
          onInitialize: () => {
            deepAR.startVideo(true);
            deepAR.setCanvasSize(900, 600);
          }
        }
      })

      deepAR.downloadFaceTrackingModel('models/models-68-extreme.bin');
    };
  }, []);

  // every time you click on a filter, it will call this function
  const handleDeepAr = (filter) => {
    // start video immediately after the initalization, mirror = true
    deepAR.startVideo(true);
    deepAR.switchEffect(0, 'slot', '/models/' + filter);
    deepAR.setCanvasSize(900, 600);
  };

  // normal on context menu event prevent default refresh
  const handleMouseEvent = (e) => {
    return e.preventDefault();
  };

  // model can be found at JSON.stringify(color.filterData[0]['Filter Binary Path'])
  return (
    <section className={"modal"}>
      <div className={"btn-wrapper"}>
        <button className={"btn-close"} onClick={() => handleModal}>⨉</button>
      </div>
      <div>
        <h3>Incearca produsul selectand una din culori</h3>
        <br/>
        <div>
          <canvas className="deepar"
                  id="deepar-canvas"
                  onContextMenu={(e) => handleMouseEvent(e)}
                  style={fullScreen ? { width: '100%', height: '100%' } : { width: 600, height: 600 }}
          ></canvas>
          <button className={"fullscreen"} onClick={() => setFullScreen(true)}>
            <svg height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h48v48h-48z" fill="none"/>
              <path
                d="M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4h-10v10zm24 14h-6v4h10v-10h-4v6zm-6-24v4h6v6h4v-10h-10z"/>
            </svg>
          </button>
        </div>
        <div className={"colors-wrapper"}>
          {colors.map((color, index) => {
            return <div key={index} onClick={() => alert(index)} className={"colors"}>
              <img src={props.product.images[0].image} alt="description" width={100} height={100}/>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Modal;