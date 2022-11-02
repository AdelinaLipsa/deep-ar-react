import { useEffect, useState, useRef } from "react";
import { DeepAR } from 'deepar';
import deeparWasm from 'deepar/wasm/deepar.wasm';
import segmentationModel from 'deepar/models/segmentation/segmentation-160x160-opt.bin';
import models from 'deepar/models/face/models-68-extreme.bin';

const Modal = (props) => {
  const [deepAR, setDeepAR] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  // product color variations
  const colors = props.product.Variations;
  const overlay = useRef(document.querySelector(".overlay"));

  // DeepAR API
  /*@TODO:change license key, this is the free one*/
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
            // let filterName = colors[0].filterData[0]['Filter Binary Path'].match(new RegExp("[^/]+(?=\\.[^/.]*$)"))[0];
            setDeepAR(initializedDeepAR);
            initializedDeepAR.startVideo(true);
            // initializedDeepAR.switchEffect(0, 'slot', `https://staging1.farmec.ro/media/deepArFilters/${filterName}.bin`);
          }
        }
      })

      /*@TODO: replace paths with server local path*/
      initializedDeepAR.downloadFaceTrackingModel(models);
    };
  }, []);

  const handleModal = () => {
    overlay.current.display = "block";
    deepAR.stopVideo();

    return props.hideModal();
  };

  // every time you click on a filter, it will call this function to switch the effect
  const handleFilterClick = (selectedFilter) => {
    let filter = selectedFilter.target.value;

    let filterName = filter.match(new RegExp("[^/]+(?=\\.[^/.]*$)"))[0];

    return deepAR.switchEffect(0, 'slot', `https://staging1.farmec.ro/media/deepArFilters/${filterName}.bin`);
  };

  return (
    <section className={"modal"}>
      <div>
        <div className={"modal-content-wrapper"}>
          <div className={"canvas-wrapper"}>
            <div className={"btn-wrapper"}>
              <button className={"btn-close"} onClick={handleModal}>⨉</button>
            </div>
            <canvas className="deepar"
                    id="deepar-canvas"
                    width={fullScreen ? window.innerWidth + 'px' : '800px'}
                    height={fullScreen ? window.innerHeight + 'px' : '500px'}
            ></canvas>
          </div>
          <div className={"buttons"}>
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
                      cursor: "pointer",
                      borderRadius: "100%"
                    }}/>
                  </label>
                </div>
              })}
            </div>
            <button className={"fullscreen"} onClick={() => fullScreen ? setFullScreen(false) : setFullScreen(true)}>
              <svg height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h48v48h-48z" fill="none"/>
                <path
                  d="M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4h-10v10zm24 14h-6v4h10v-10h-4v6zm-6-24v4h6v6h4v-10h-10z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;