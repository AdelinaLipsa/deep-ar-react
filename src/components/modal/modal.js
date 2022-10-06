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
    overlay.classList.remove("hidden");
    return props.hideModal();
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
        callbacks: {
          onInitialize: () => {
            deepAR.startVideo(true);
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
  };

  // normal on context menu event prevent default refresh
  const handleMouseEvent = (e) => {
    return e.preventDefault();
  };

  const handleFilterClick = (selectedFilter) => {
    console.log(selectedFilter.target.value);
  }

  // model can be found at JSON.stringify(color.filterData[0]['Filter Binary Path'])
  return (
    <section className={"modal"}>
      <div className={"btn-wrapper"}>
        <button className={"btn-close"} onClick={handleModal}>⨉</button>
      </div>
      <div>
        <h3>Incearca produsul selectand una din culori</h3>
        <br/>
        <div>
          <canvas className="deepar"
                  id="deepar-canvas"
                  onContextMenu={(e) => handleMouseEvent(e)}
                  style={ fullScreen
                    ? { width: window.innerWidth, height: window.innerHeight }
                    : { width: '900px', height: '600px'
                  }}
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
                className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-red-700">
                <input type="radio" name="color-choice" value={JSON.stringify(color.filterData[0]['Filter Binary Path'])} className="sr-only"
                       onChange={handleFilterClick}/>
                <img src={props.product.images[0].image} alt={JSON.stringify(color.filterData[0])} className="w-10 h-10" width={100} height={100}/>
              </label>
            </div>
          })}
        </div>
      </div>
    </section>
  );
};

export default Modal;