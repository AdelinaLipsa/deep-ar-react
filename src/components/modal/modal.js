import { useEffect, useState } from "react";
import { DeepAR } from 'deepar';
import deeparWasm from '../../deepar/deepar.wasm';
import segmentationModel from '../../deepar/segmentation-160x160-opt.bin';

const Modal = (props) => {
  let deepAR;
  const [fullScreen, setFullScreen] = useState(false);
  // product color variations
  const colors = props.product.Variations;
  // modal css interaction
  const overlay = document.querySelector(".overlay");

  // DeepAR API
  /*@TODO:change license key*/
  useEffect(() => {
    const canvas = document.getElementById('deepar-canvas');

    return () => {
      deepAR = new DeepAR({
        licenseKey: '6fda241c565744899d3ea574dc08a18ce3860d219aeb6de4b2d23437d7b6dcfcd79941dffe0e57f0',
        libPath: './lib',
        deeparWasmPath: deeparWasm,
        canvas: canvas,
        segmentationConfig: {
          modelPath: segmentationModel
        },
        callbacks: {
          onInitialize: () => {
            deepAR.startVideo(true);
          }
        }
      })

      deepAR.downloadFaceTrackingModel('../../deepar/models-68-extreme.bin');
    };
  }, []);

  const handleModal = () => {
    overlay.classList.remove("hidden");
    if (deepAR)
      deepAR.stopVideo();

    return props.hideModal();
  };

  // every time you click on a filter, it will call this function
  const handleFilterClick = (selectedFilter) => {
    let filter = selectedFilter.target.value.match(new RegExp("[^/]+(?=\\.[^/.]*$)"))[0];

    if (!filter) {
      return;
    }

    deepAR.switchEffect(0, 'slot', '/textures/' + filter);
  };

  const handleMouseEvent = (e) => {
    return e.preventDefault();
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
                <img src={props.product.images[0].image} alt={JSON.stringify(color.filterData[0])} className="w-10 h-10"
                     width={100} height={100}/>
              </label>
            </div>
          })}
        </div>
      </div>
    </section>
  );
};

export default Modal;