import { useEffect, useState } from "react";
import { DeepAR } from 'deepar';
import deeparWasm from 'deepar/wasm/deepar.wasm';
import segmentationModel from 'deepar/models/segmentation/segmentation-160x160-opt.bin';
import models from 'deepar/models/face/models-68-extreme.bin';
import example from '../../deepar/textures/2569.bin';
import example2 from '../../deepar/textures/2570.bin';
import example3 from '../../deepar/textures/2568.bin';

const Modal = (props) => {
  const [deepAR, setDeepAR] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  // product color variations
  const colors = props.product.Variations;
  const overlay = document.querySelector(".overlay");

  // DeepAR API
  /*@TODO:change license key*/
  useEffect(() => {
    const canvas = document.getElementById('deepar-canvas');

    return () => {
      let initializedDeepAR = new DeepAR({
        licenseKey: '6fda241c565744899d3ea574dc08a18ce3860d219aeb6de4b2d23437d7b6dcfcd79941dffe0e57f0',
        libPath: DeepAR,
        deeparWasmPath: deeparWasm,
        canvas: canvas,
        segmentationConfig: {
          modelPath: segmentationModel
        },
        callbacks: {
          onInitialize: () => {
            setDeepAR(initializedDeepAR);
            initializedDeepAR.startVideo(true);
          }
        }
      })

      /*@TODO: replace paths with server local path*/
      initializedDeepAR.downloadFaceTrackingModel(models);
    };
  }, []);

  const handleModal = () => {
    overlay.classList.remove("hidden");
    deepAR.stopVideo();

    return props.hideModal();
  };

  const handleMouseEvent = (e) => {
    return e.preventDefault();
  };

  // every time you click on a filter, it will call this function
  const handleFilterClick = (selectedFilter) => {
    let filter = selectedFilter.target.value;

    let filterName = filter.match(new RegExp("[^/]+(?=\\.[^/.]*$)"))[0];

    return deepAR.switchEffect(0, 'slot', `https://staging1.farmec.ro/media/deepArFilters/${filterName}.bin`);
  };

  return (
    <section className={"modal"}>
      <div className={"btn-wrapper"}>
        <button className={"btn-close"} onClick={handleModal}>⨉</button>
      </div>
      <div>
        <h3>Incearca produsul selectand una din culori</h3>
        <br/>
        <div className={"canvas-wrapper"}>
          <canvas className="deepar"
                  id="deepar-canvas"
                  onContextMenu={(e) => handleMouseEvent(e)}
                  width={fullScreen ? window.innerWidth + 'px' : '900px'}
                  height={fullScreen ? window.innerHeight + 'px' : '600px'}
          ></canvas>
          <button className={"fullscreen"} onClick={() => fullScreen ? setFullScreen(false) : setFullScreen(true)}>
            <svg height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h48v48h-48z" fill="none"/>
              <path
                d="M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4h-10v10zm24 14h-6v4h10v-10h-4v6zm-6-24v4h6v6h4v-10h-10z"/>
            </svg>
          </button>
        </div>
        <div className={"colors-wrapper"}>
          {colors.map((color, index) => {
            return <div key={index} className={"colors"}>
              <label
                className="radio-button-label">
                <input type="radio" name="color-choice"
                       value={JSON.stringify(color.filterData[0]['Filter Binary Path'])} className="sr-only"
                       onChange={handleFilterClick}/>
                <div style={{
                  backgroundColor: color.filterData[0]['Hex Color'],
                  width: '50px',
                  height: '50px',
                  cursor: "pointer"
                }}/>
              </label>
            </div>
          })}
        </div>
      </div>
    </section>
  );
};

export default Modal;